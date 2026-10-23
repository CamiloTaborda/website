/**
 * Genera el HTML estático de cada ruta a partir del build de Vite.
 *
 * Sin esto, todas las URLs devolvían el mismo index.html con un <div id="root">
 * vacío: Google tenía que ejecutar JavaScript para ver el contenido, y los
 * rastreadores de los motores de IA (GPTBot, ClaudeBot, PerplexityBot), que no
 * lo ejecutan, no veían nada en absoluto.
 *
 * Se ejecuta después de `vite build` y `vite build --ssr` (ver package.json).
 * Escribe en dist/:
 *   - una página HTML por ruta, con su contenido, cabecera y JSON-LD
 *   - 404.html, que Vercel sirve con estado 404 real para rutas inexistentes
 *   - sitemap.xml y llms.txt, generados desde los mismos datos que la app
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const server = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const { render, ROUTES, NOT_FOUND, SITE_URL, PERSON, CV, absoluteUrl, projects, faqItems, SERVICE_COUNT, t, tEn, LANG } = server;

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const HEAD_BLOCK = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;
if (!HEAD_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html no tiene los marcadores que espera el prerender');
}

// '/' -> index.html, '/servicios' -> servicios.html. Con cleanUrls en
// vercel.json, Vercel sirve servicios.html en /servicios, sin la extensión.
const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

const writePage = async (route, file) => {
  const { html, head } = await render(route);
  const page = template
    .replace('<html lang="es">', `<html lang="${LANG}">`)
    .replace(HEAD_BLOCK, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  await writeFile(path.join(dist, file), page);
  console.log(`  ${route.padEnd(12)} -> dist/${file}`);
};

console.log('Prerender:');
for (const { path: route } of ROUTES) {
  await writePage(route, fileFor(route));
}
await writePage(NOT_FOUND.path, '404.html');

// ─── sitemap.xml ───
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('  sitemap.xml');

// ─── llms.txt ───
// Formato propuesto en llmstxt.org: un resumen en Markdown pensado para que
// un modelo de lenguaje entienda el sitio sin tener que interpretar el HTML.
const CATEGORY = { '3d_config': '3d_configurators', '360_viewers': '360_viewers', websites: 'websites' };
const services = Array.from({ length: SERVICE_COUNT }, (_, i) => i + 1);

const llms = `# ${PERSON.name}

> ${t('seo_home_description')}

${t('am_intro_1')}

${t('am_intro_2')}

- Rol actual: ${t('am_exp_1_role')} en ${t('am_exp_1_company')} (${t('am_exp_1_period')})
- Antes: ${t('am_exp_2_role')} en ${t('am_exp_2_company')} (${t('am_exp_2_period')})
- Idiomas: ${t('am_lang_es')}; ${t('am_lang_en')}
- Zona horaria: ${t('ct_timezone')}
- ${t('am_cta_text')}

## Páginas

${ROUTES.map((r) => `- [${t(r.navKey)}](${absoluteUrl(r.path)}): ${t(`seo_${r.seo}_description`)}`).join('\n')}

## Servicios

${services.map((n) => `- **${t(`sv_${n}_title`)}**: ${t(`sv_${n}_text`)} Para: ${t(`sv_${n}_for`)}`).join('\n')}

## Proyectos en producción

${projects.map((p) => `- [${p.caption}](${p.link}): ${t(CATEGORY[p.category])}. ${p.tools.join(', ')}.`).join('\n')}

## Preguntas frecuentes

${faqItems(t).map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n')}

## Contacto

- WhatsApp: ${PERSON.whatsapp}
- Email: ${PERSON.email}
- Formulario: ${SITE_URL}/contacto
${PERSON.sameAs.map((u) => `- ${new URL(u).hostname.replace('www.', '')}: ${u}`).join('\n')}

## Optional

- [CV en español (PDF)](${SITE_URL}${CV.es})
- [CV in English (PDF)](${SITE_URL}${CV.en})
- In English: ${tEn('seo_home_description')} ${tEn('seo_services_description')}
`;
await writeFile(path.join(dist, 'llms.txt'), llms);
console.log('  llms.txt');

await rm(ssrDir, { recursive: true, force: true });
