import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeStyle = 'underline underline-offset-8 decoration-2';

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'es' ? 'en' : 'es'; 
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-medium top-0 transition-all duration-300 ${
        isScrolled ? 'bg-black' : 'bg-transparent'
      } text-white`}
    >
      <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center">
        <ul className="flex items-center">
          <li className="font-extrabold text-2xl">
            <NavLink to="/">CamiloT</NavLink>
          </li>
        </ul>

        {/* Botón de menú hamburguesa */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <div
            className={`w-8 h-0.5 bg-white mb-1 rounded-lg transition-transform ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <div
            className={`w-8 h-0.5 bg-white mb-1 rounded-lg ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <div
            className={`w-8 h-0.5 bg-white mt-1 rounded-lg transition-transform ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>

        {/* Menú para pantallas grandes */}
        <ul className="hidden md:flex items-center gap-10">
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
            className="text-white flex justify-center items-center gap-2 cursor-pointer"
            onClick={toggleLanguage}
          >
            <p>{i18n.language === 'es' ? 'ES' : 'EN'}</p>
            <img
              className="w-4"
              src={i18n.language === 'es' ? '/Icons/colombia.png' : '/Icons/estados-unidos.png'}
              alt={i18n.language === 'es' ? 'icon.colombia' : 'icon.usa'}
            />
          </li>
        </ul>
      </div>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-20">
          <ul className="flex flex-col items-center">
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('home')}
              </NavLink>
            </li>
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to="/sobre-mi" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('about')}
              </NavLink>
            </li>
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to="/portfolio" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('portfolio')}
              </NavLink>
            </li>
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to="/contacto" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                {t('contact')}
              </NavLink>
            </li>
            <li className="text-white cursor-pointer flex-col"
            onClick={() => {
              toggleLanguage(); 
              toggleMenu(); 
            }}>
              <p>{i18n.language === 'es' ? 'ES' : 'EN'}</p>
              <img
                className="w-4"
                src={i18n.language === 'es' ? '/Icons/colombia.png' : '/Icons/estados-unidos.png'}
                alt={i18n.language === 'es' ? 'icon.colombia' : 'icon.usa'}
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
