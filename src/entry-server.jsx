import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Writable } from 'node:stream';
import i18n from './i18n';
import { App } from './Pages/App';
import { buildHead, serializeHead } from './Seo/head';

// Lo consume scripts/prerender.js para generar sitemap.xml y llms.txt con los
// mismos datos que la app.
export { ROUTES, NOT_FOUND, SITE_URL, PERSON, CV, absoluteUrl } from './Seo/site';
export { projects } from './Data/projectsData';
export { faqItems, SERVICE_COUNT } from './Seo/schema';

// El HTML estático va siempre en español: es el idioma por defecto del sitio.
// Node 21+ expone navigator.language, así que sin forzarlo el detector podía
// elegir el idioma de la máquina que hace el build.
export const LANG = 'es';
export const t = i18n.getFixedT(LANG);
export const tEn = i18n.getFixedT('en');

/**
 * Renderiza una ruta a HTML. renderToPipeableStream con onAllReady espera a
 * que los chunks lazy de las páginas se resuelvan; renderToString pintaría el
 * fallback del Suspense en su lugar.
 */
export const render = async (url) => {
  await i18n.changeLanguage(LANG);

  const html = await new Promise((resolve, reject) => {
    // Se acumulan bytes y se decodifican al final: un carácter de varios bytes
    // (ó, ñ, —) puede quedar partido entre dos chunks y corromperse si cada
    // chunk se convierte a texto por separado.
    const chunks = [];
    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
      final(cb) {
        // Bug de React 18 (corregido en 19): si un carácter multibyte no cabe
        // al final de su búfer interno de 2 KB, envía el búfer con el último
        // byte vacío y escribe el carácter entero en el siguiente. Ese byte
        // nulo es relleno, nunca contenido válido en HTML.
        resolve(Buffer.concat(chunks).toString('utf8').replace(/\0/g, ''));
        cb();
      },
    });

    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: reject,
      }
    );
  });

  return { html, head: serializeHead(buildHead(url, t, LANG)) };
};
