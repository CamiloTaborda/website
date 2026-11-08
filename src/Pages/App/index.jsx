import { Suspense, lazy, useEffect } from 'react';
import { useRoutes, BrowserRouter, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Home from '../Home';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Spinner from '../../Components/Spinner';
import '../../Styles/styles.css';
import './App.css';

// Home va eager porque es la landing: queremos pintarla sin esperar un chunk.
// El resto se descarga solo cuando el visitante entra a esa ruta.
const SobreMi = lazy(() => import('../SobreMi'));
const Portfolio = lazy(() => import('../Portfolio'));
const Contacto = lazy(() => import('../Contacto'));
const Servicios = lazy(() => import('../Servicios'));
const NotFound = lazy(() => import('../NotFound'));

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/sobre-mi', element: <SobreMi /> },
    { path: '/portfolio', element: <Portfolio /> },
    { path: '/contacto', element: <Contacto /> },
    { path: '/servicios', element: <Servicios /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Exportado aparte para que el prerender lo envuelva en un StaticRouter.
// MotionConfig con reducedMotion="user": si el sistema pide reducir el
// movimiento, framer-motion deja los fundidos y quita los desplazamientos.
// La regla CSS de App.css no alcanzaba a estas animaciones.
export const App = () => (
  <MotionConfig reducedMotion="user">
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div className="flex-grow">
        {/* El Spinner solo aparece mientras se descarga el chunk de la ruta,
            no como retardo fijo en cada carga. */}
        <Suspense fallback={<Spinner />}>
          <AppRoutes />
        </Suspense>
      </div>
      <Footer />
    </div>
  </MotionConfig>
);

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
