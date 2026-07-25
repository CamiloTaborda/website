import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // En refs, no en estado: antes lastScrollY estaba en las dependencias del
  // efecto, asi que el listener se desuscribia y volvia a suscribirse en cada
  // evento de scroll.
  const lastScrollY = useRef(0);
  const isMenuOpenRef = useRef(isMenuOpen);
  isMenuOpenRef.current = isMenuOpen;

  const activeStyle = 'underline underline-offset-8 decoration-2';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Con el menú móvil abierto no ocultamos la barra
      if (isMenuOpenRef.current) return;

      setIsScrolled(currentScrollY > 20);

      // Ocultar al bajar, mostrar al subir
      setIsVisible(!(currentScrollY > lastScrollY.current && currentScrollY > 100));

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center fixed z-50 w-full py-5 px-8 text-md font-bold top-0 transition-all duration-500 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } text-white`}
    >
      <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <ul className="flex items-center">
          <li className="font-extrabold text-4xl">
            <NavLink to="/">CamiloT</NavLink>
          </li>
        </ul>

        {/* Botón de menú hamburguesa */}
        <div className="lg:hidden cursor-pointer z-[60]" onClick={toggleMenu}>
          <div className={`w-8 h-0.5 bg-white mb-2 rounded-lg transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <div className={`w-8 h-0.5 bg-white mb-2 rounded-lg transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-8 h-0.5 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </div>

        {/* Menú Escritorio */}
        <div className="hidden lg:flex items-center gap-10">
          {/* Menú central - Portfolio personal */}
          <ul className="flex items-center gap-10">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('home')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre-mi" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('about')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('portfolio')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('contact')}
              </NavLink>
            </li>
            <li
              className="text-white flex justify-center items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleLanguage}
            >
              <p>{i18n.language === 'es' ? 'ES' : 'EN'}</p>
              <img
                className="w-5 h-auto"
                src={i18n.language === 'es' ? '/Icons/colombia.webp' : '/Icons/estados-unidos.webp'}
                alt="lang"
              />
            </li>
          </ul>

          {/* Separador visual */}
          <div className="h-8 w-px bg-white/30"></div>

          {/* Botón Servicios - Área comercial */}
          <Button onClick={() => navigate('/servicios')}>
            {t('services')}
          </Button>
        </div>
      </div>

      {/* Menú móvil optimizado */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-[55] w-full h-screen left-0 top-0">
          <ul className="flex flex-col items-center gap-8 w-full">
            <li className="text-white text-3xl" onClick={toggleMenu}>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('home')}
              </NavLink>
            </li>
            <li className="text-white text-3xl" onClick={toggleMenu}>
              <NavLink to="/sobre-mi" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('about')}
              </NavLink>
            </li>
            <li className="text-white text-3xl" onClick={toggleMenu}>
              <NavLink to="/portfolio" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('portfolio')}
              </NavLink>
            </li>
            <li className="text-white text-3xl" onClick={toggleMenu}>
              <NavLink to="/contacto" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('contact')}
              </NavLink>
            </li>

            {/* Separador en móvil */}
            <div className="w-32 h-px bg-white/30 my-2"></div>

            {/* Botón Servicios destacado en móvil */}
            <li onClick={toggleMenu}>
              <Button onClick={() => navigate('/servicios')}>
                {t('services')}
              </Button>
            </li>

            <li 
              className="text-white cursor-pointer flex flex-col items-center gap-3 pt-4"
              onClick={() => {
                toggleLanguage();
                toggleMenu();
              }}
            >
              <div className="flex items-center gap-2">
                <p className="text-2xl">{i18n.language === 'es' ? 'ES' : 'EN'}</p>
                <img
                  className="w-8"
                  src={i18n.language === 'es' ? '/Icons/colombia.webp' : '/Icons/estados-unidos.webp'}
                  alt="flag"
                />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;