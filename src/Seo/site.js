// Datos del sitio que comparten el prerender (scripts/prerender.js) y el
// cliente (useSeo). Una sola fuente: si una ruta o un perfil cambia aquí,
// cambia a la vez en el HTML estático, en el sitemap, en llms.txt y en los
// meta tags que se actualizan al navegar.

export const SITE_URL = 'https://camilotaborda.dev';
export const SITE_NAME = 'Camilo Taborda';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PERSON = {
  name: 'Camilo Taborda',
  email: 'camilotaborda2010@gmail.com',
  telephone: '+573052737622',
  whatsapp: 'https://wa.me/573052737622',
  photo: `${SITE_URL}/Icons/img1.webp`,
  city: 'Medellín',
  region: 'Antioquia',
  country: 'CO',
  sameAs: [
    'https://www.linkedin.com/in/camilo-taborda-20724917a/',
    'https://github.com/CamiloTaborda',
    'https://x.com/CamiloT08701893',
    'https://www.instagram.com/camilo.tl/',
  ],
  knowsAbout: [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Supabase', 'REST APIs',
    'Python', 'Django', 'Vercel', 'DigitalOcean', 'AWS', 'Three.js',
    'React Three Fiber', 'WebGL', 'model-viewer',
    'Augmented Reality', '3D product configurators', 'Tailwind CSS',
    'Technical SEO', 'Web performance',
  ],
  employer: { name: 'Ardata Tech', url: 'https://ardatatech.co/' },
};

export const CV = {
  es: '/CV/cv-camilo-taborda-es.pdf',
  en: '/CV/cv-camilo-taborda.pdf',
};

// navKey es la clave de traducción del enlace en el menú: sirve de nombre en
// las migas de pan. type es el tipo schema.org de la página.
export const ROUTES = [
  { path: '/',          seo: 'home',      navKey: 'home',      type: 'WebPage',        priority: '1.0' },
  { path: '/servicios', seo: 'services',  navKey: 'services',  type: 'WebPage',        priority: '0.9' },
  { path: '/portfolio', seo: 'portfolio', navKey: 'portfolio', type: 'CollectionPage', priority: '0.8' },
  { path: '/sobre-mi',  seo: 'about',     navKey: 'about',     type: 'ProfilePage',    priority: '0.7' },
  { path: '/contacto',  seo: 'contact',   navKey: 'contact',   type: 'ContactPage',    priority: '0.6' },
];

export const NOT_FOUND = { path: '/404', seo: 'notfound', noindex: true };

export const findRoute = (path) => ROUTES.find((r) => r.path === path) ?? NOT_FOUND;

export const absoluteUrl = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
