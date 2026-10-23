# camilotaborda.dev

Portfolio personal y sitio de servicios de Camilo Taborda — desarrollador frontend
especializado en React, Three.js y configuradores 3D.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **React Router 6** (SPA con rewrite en el host)
- **i18next** — español / inglés, traducciones empaquetadas en el bundle
- **three.js** (efecto LiquidEther) · **ogl** (Ribbons) · **@google/model-viewer** (visor 3D)
- **framer-motion** para las animaciones de entrada

## Comandos

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción + prerender de cada ruta en dist/
npx serve dist     # sirve dist/ como Vercel (URLs limpias y 404 real)
npm run lint       # ESLint (debe salir en 0)
```

## Estructura

```
public/            assets servidos desde la raíz (/Icons/..., /Video/...)
src/
  Animations/      Reveal: entrada al hacer scroll con framer-motion
  Components/      componentes reutilizables
  Data/            datos de proyectos y categorías
  DiplomasData/    listado de certificados
  Hooks/           useCustomTranslation, useSeo
  Locales/         traducciones es / en (van al bundle)
  Pages/           una carpeta por ruta
  Seo/             rutas, cabeceras y JSON-LD (fuente única para prerender y cliente)
  Utils/           helpers (detección de WebGL)
  entry-server.jsx render de una ruta a HTML, lo usa el prerender
scripts/
  prerender.js     HTML de cada ruta, 404.html, sitemap.xml y llms.txt
```

## Notas de mantenimiento

**Assets.** Todo lo de `public/` se sirve desde la raíz: la ruta es `/Icons/foo.webp`,
nunca `/public/Icons/foo.webp`. Los nombres deben ir en minúsculas y sin acentos —
Windows no distingue mayúsculas pero el servidor de producción (Linux) sí, y un
`Video1.mp4` referenciado como `video1.mp4` da 404 solo en producción.

**Videos.** Se sirven a 720p sin pista de audio (siempre se reproducen en silencio)
y con el átomo `moov` al inicio para que empiecen sin descargar el archivo entero.
Para añadir uno nuevo:

```bash
ffmpeg -i entrada.mp4 -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -profile:v main -preset slow -crf 28 \
  -pix_fmt yuv420p -movflags +faststart -an public/Video/videoN.mp4
```

Las tarjetas solo adjuntan el `src` cuando entran al viewport: no cambies
`preload="none"` en `Components/Video` sin medir el impacto.

**Imágenes.** En WebP con calidad 82. La excepción es `public/og-image.jpg`, que va
en JPEG porque WhatsApp no renderiza WebP en los previews al compartir.

**WebGL.** Los efectos decorativos van envueltos en `SafeVisual` y comprueban
`isWebGLAvailable()` antes de montarse. Sin esa protección, un equipo sin
aceleración por hardware veía la página completamente en blanco.

**SEO, GEO y AEO.** Cada ruta se prerenderiza a HTML estático durante el build:
`vite build` genera el cliente, `vite build --ssr` compila `src/entry-server.jsx` y
`scripts/prerender.js` escribe `dist/<ruta>.html` con el contenido, la cabecera
(title, description, canonical, Open Graph) y el JSON-LD de esa ruta. Los
rastreadores de los motores de IA no ejecutan JavaScript: sin esto solo veían un
`<div>` vacío.

- El HTML estático va en español. En el navegador, React hidrata ese HTML si el
  visitante usa español y renderiza desde cero si usa inglés.
- Los efectos WebGL no se prerenderizan: `SafeVisual` los monta después de
  hidratar. Un componente que toque `window` o `document` durante el render (no
  dentro de un efecto) rompe el build.
- **Ruta nueva:** añadirla a `ROUTES` en `src/Seo/site.js`, crear las claves
  `seo_<nombre>_title` y `seo_<nombre>_description` en las traducciones y llamar a
  `useSeo('/ruta')` en la página. El sitemap y `llms.txt` se generan solos.
- **Proyecto nuevo:** basta con añadirlo a `src/Data/projectsData.js`; el JSON-LD
  del portfolio y `llms.txt` lo recogen en el siguiente build.
- Las preguntas frecuentes de Servicios (`sv_faq_*`) se muestran en la página y se
  publican como `FAQPage` desde las mismas claves.

## Despliegue

Vercel. `cleanUrls` sirve `servicios.html` en `/servicios`, y una ruta que no
existe recibe `404.html` con estado 404 real. Ya no hay un rewrite general a
`index.html`, que respondía 200 a cualquier URL inventada.

Los PDF de `public/CV/` se sirven con `Content-Disposition: attachment` para que
se descarguen siempre, también en navegadores que ignoran el atributo `download`.
