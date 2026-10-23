import { projects } from '../Data/projectsData';
import { SITE_URL, SITE_NAME, PERSON, ROUTES, absoluteUrl, findRoute } from './site';

/**
 * Datos estructurados (JSON-LD) por ruta. Es lo que leen Google para los
 * resultados enriquecidos y los motores de respuesta (ChatGPT, Perplexity,
 * Gemini, Claude) para entender quién es Camilo, qué ofrece y qué ha hecho.
 *
 * Todo va en un único @graph con @id estables: la persona se declara una vez
 * y el resto de nodos la referencian, en lugar de repetirla en cada página.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Clave de traducción de cada categoría de proyecto (ver categoriesData).
const CATEGORY_LABEL = {
  '3d_config': '3d_configurators',
  '360_viewers': '360_viewers',
  websites: 'websites',
};

export const FAQ_COUNT = 6;
export const SERVICE_COUNT = 4;

const person = (t, lang) => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON.name,
  url: `${SITE_URL}/`,
  image: PERSON.photo,
  jobTitle: t('am_role'),
  description: t('footer_tagline'),
  email: `mailto:${PERSON.email}`,
  telephone: PERSON.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: PERSON.city,
    addressRegion: PERSON.region,
    addressCountry: PERSON.country,
  },
  worksFor: { '@type': 'Organization', name: PERSON.employer.name, url: PERSON.employer.url },
  knowsAbout: PERSON.knowsAbout,
  knowsLanguage: ['es', 'en'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: lang === 'en' ? 'sales' : 'ventas',
    email: PERSON.email,
    telephone: PERSON.telephone,
    url: PERSON.whatsapp,
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: PERSON.sameAs,
});

const website = (lang) => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: lang,
  publisher: { '@id': PERSON_ID },
});

const breadcrumb = (route, t) => ({
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(route.path)}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: t('home'), item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: t(route.navKey), item: absoluteUrl(route.path) },
  ],
});

const services = (t) =>
  Array.from({ length: SERVICE_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      '@type': 'Service',
      '@id': `${SITE_URL}/servicios#service-${n}`,
      name: t(`sv_${n}_title`),
      serviceType: t(`sv_${n}_title`),
      description: t(`sv_${n}_text`),
      audience: { '@type': 'Audience', audienceType: t(`sv_${n}_for`) },
      provider: { '@id': PERSON_ID },
      areaServed: ['Colombia', 'Latin America', 'United States', 'Europe'],
      url: `${SITE_URL}/servicios`,
    };
  });

export const faqItems = (t) =>
  Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`sv_faq_${i + 1}_q`),
    a: t(`sv_faq_${i + 1}_a`),
  }));

const faq = (t) => ({
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/servicios#faq`,
  mainEntity: faqItems(t).map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const projectList = (t) => ({
  '@type': 'ItemList',
  '@id': `${SITE_URL}/portfolio#projects`,
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: p.caption,
      url: p.link,
      image: `${SITE_URL}${p.img}`,
      genre: t(CATEGORY_LABEL[p.category]),
      keywords: p.tools.join(', '),
      creator: { '@id': PERSON_ID },
    },
  })),
});

export const buildSchema = (path, t, lang) => {
  const route = findRoute(path);
  const url = absoluteUrl(route.path);
  const isHome = route.path === '/';

  const page = {
    '@type': route.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: t(`seo_${route.seo}_title`),
    description: t(`seo_${route.seo}_description`),
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
  };

  const graph = [website(lang), person(t, lang), page];

  if (!isHome && ROUTES.includes(route)) {
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push(breadcrumb(route, t));
  }

  if (route.type === 'ProfilePage' || route.type === 'ContactPage') {
    page.mainEntity = { '@id': PERSON_ID };
  }

  if (route.path === '/servicios') {
    graph.push(...services(t), faq(t));
  }

  if (route.path === '/portfolio') {
    page.mainEntity = { '@id': `${SITE_URL}/portfolio#projects` };
    graph.push(projectList(t));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};
