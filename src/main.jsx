import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import i18n from './i18n';
import Root from './Pages/App';

// Safari en iOS no aplica :active al tocar a menos que la página escuche
// touchstart. Sin esto, el "press" de botones y tarjetas no existía en iPhone.
document.addEventListener('touchstart', () => {}, { passive: true });

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <Root />
  </StrictMode>
);

// En producción cada ruta llega prerenderizada en español (scripts/prerender.js)
// y React se engancha a ese HTML en lugar de volver a pintarlo. Si el visitante
// tiene el sitio en inglés, el HTML no coincide con lo que React va a pintar:
// hidratarlo solo produciría errores de discrepancia, así que se renderiza de
// cero. En desarrollo el contenedor viene vacío.
const prerendered = container.hasChildNodes();
const lang = i18n.language?.split('-')[0];

if (prerendered && lang === 'es') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
