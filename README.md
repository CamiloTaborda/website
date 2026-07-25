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
npm run build      # build de producción en dist/
npm run preview    # sirve dist/ localmente
npm run lint       # ESLint (debe salir en 0)
```

## Estructura

```
public/            assets servidos desde la raíz (/Icons/..., /Video/...)
src/
  Animations/      wrappers de framer-motion (SlideUp, SlideLeft, ...)
  Components/      componentes reutilizables
  Data/            datos de proyectos y categorías
  DiplomasData/    listado de certificados
  Hooks/           useCustomTranslation, useSeo
  Locales/         traducciones es / en (van al bundle)
  Pages/           una carpeta por ruta
  Utils/           helpers (detección de WebGL)
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

**SEO.** Cada página llama a `useSeo({ title, description, path })`. Al añadir una
ruta nueva hay que sumarla también a `public/sitemap.xml`.

## Despliegue

`vercel.json` cubre Vercel; `public/_redirects` cubre Netlify y Cloudflare Pages.
Ambos redirigen todas las rutas a `index.html` — sin eso, recargar `/servicios`
devuelve 404.
