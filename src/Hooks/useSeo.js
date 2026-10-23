import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { buildHead } from '../Seo/head';

/**
 * Mantiene la cabecera al día al navegar dentro de la SPA. La primera carga
 * ya llega con todo resuelto desde el HTML prerenderizado; esto cubre los
 * cambios de ruta y de idioma, que ocurren sin recargar la página.
 */
const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const upsertSchema = (schema) => {
  let el = document.head.querySelector('script[data-seo]');
  if (!schema) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
};

const useSeo = (path) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] === 'en' ? 'en' : 'es';

  useEffect(() => {
    const head = buildHead(path, t, lang);

    document.title = head.title;
    // El contenido cambia de idioma en caliente: el atributo lang debe seguirlo.
    document.documentElement.setAttribute('lang', lang);

    head.meta.forEach(([attr, key, content]) => upsertMeta(attr, key, content));
    upsertCanonical(head.canonical);
    upsertSchema(head.schema);
  }, [path, t, lang]);
};

export default useSeo;
