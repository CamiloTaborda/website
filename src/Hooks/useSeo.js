import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const SITE_URL = 'https://www.camilotaborda.dev';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Actualiza title y meta tags por ruta. La app es client-side, asi que sin
 * esto las cinco rutas comparten el mismo <title> y la misma descripcion:
 * Google indexa /servicios con el titulo de la home y los enlaces compartidos
 * por WhatsApp o LinkedIn salen sin preview.
 */
const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const useSeo = ({ title, description, path = '/', image = DEFAULT_IMAGE }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'es';
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    if (title) document.title = title;

    // El contenido cambia de idioma en caliente: el atributo lang debe seguirlo.
    document.documentElement.setAttribute('lang', lang);

    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'Camilo Taborda');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:locale', lang === 'es' ? 'es_CO' : 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
  }, [title, description, url, image, lang]);
};

export default useSeo;
