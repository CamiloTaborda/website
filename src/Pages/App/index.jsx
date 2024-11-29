import { useEffect, useState } from 'react';
import { useRoutes, BrowserRouter, useLocation } from 'react-router-dom';
import Home from '../Home';
import SobreMi from '../SobreMi';
import Portfolio from '../Portfolio';
import Contacto from '../Contacto';
import NotFound from '../NotFound';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Spinner from '../../Components/Spinner';
import '../../Styles/styles.css';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/sobre-mi', element: <SobreMi /> },
    { path: '/portfolio', element: <Portfolio /> },
    { path: '/contacto', element: <Contacto /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <div className="flex-grow">
            <AppRoutes />
          </div>
          <Footer /> 
        </>
      )}
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;