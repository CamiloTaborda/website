import { SITE_NAME, DEFAULT_IMAGE, findRoute, absoluteUrl } from './site';
import { buildSchema } from './schema';

const INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/**
 * Describe la cabecera de una ruta como datos. El prerender la serializa a
 * HTML y useSeo la aplica sobre el DOM al navegar, así que ambos producen
 * exactamente las mismas etiquetas.
 */
export const buildHead = (path, t, lang) => {
  const route = findRoute(path);
  const title = t(`seo_${route.seo}_title`);
  const description = t(`seo_${route.seo}_description`);
  const url = route.noindex ? null : absoluteUrl(route.path);
  const locale = lang === 'en' ? 'en_US' : 'es_CO';
  const altLocale = lang === 'en' ? 'es_CO' : 'en_US';

  const meta = [
    ['name', 'description', description],
    ['name', 'robots', route.noindex ? 'noindex, follow' : INDEX],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', SITE_NAME],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', DEFAULT_IMAGE],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', title],
    ['property', 'og:locale', locale],
    ['property', 'og:locale:alternate', altLocale],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', DEFAULT_IMAGE],
  ].filter(([, , content]) => content);

  return {
    title,
    lang,
    canonical: url,
    meta,
    schema: route.noindex ? null : buildSchema(route.path, t, lang),
  };
};

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// "</script>" dentro del JSON cerraría la etiqueta antes de tiempo.
const escapeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

export const serializeHead = ({ title, canonical, meta, schema }) =>
  [
    `<title>${escapeAttr(title)}</title>`,
    ...meta.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`),
    canonical && `<link rel="canonical" href="${canonical}" />`,
    schema && `<script type="application/ld+json" data-seo>${escapeJson(schema)}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
