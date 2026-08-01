import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

const FOCUSABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LINKS = [
  { to: '/',          key: 'home'      },
  { to: '/servicios', key: 'services'  },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/sobre-mi',  key: 'about'     },
  { to: '/contacto',  key: 'contact'   },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // El idioma detectado puede venir como 'es-CO': nos quedamos con la base.
  const lang = i18n.language?.split('-')[0] === 'en' ? 'en' : 'es';
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;
  const panelRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Con el menú móvil abierto bloqueamos el scroll del fondo.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape cierra el menú y el foco vuelve al botón que lo abrió: si no, el
  // tabulador continuaría desde el principio del documento.
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    // Al abrir, llevamos el foco dentro del panel.
    const items = () => [...panel.querySelectorAll(FOCUSABLES)];
    items()[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab') return;

      // Ciclo cerrado: el tabulador no sale del menú mientras esté abierto.
      const list = items();
      if (list.length === 0) return;
      const primero = list[0];
      const ultimo = list[list.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  const toggleLanguage = () => i18n.changeLanguage(lang === 'es' ? 'en' : 'es');

  const linkClass = ({ isActive }) =>
    `text-[0.8125rem] transition-colors duration-400 ease-smooth ${
      isActive ? 'text-white' : 'text-ink-300 hover:text-white'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-600 ease-smooth ${
          // Opacidad alta a propósito: con menos, el texto blanco se vuelve
          // ilegible cuando la barra pasa sobre las secciones de fondo claro.
          scrolled || menuOpen
            ? 'bg-ink/85 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="container-page flex items-center justify-between h-12 sm:h-14">
          <NavLink
            to="/"
            className="text-[0.9375rem] font-semibold tracking-tight text-white"
            onClick={() => setMenuOpen(false)}
          >
            Camilo Taborda
          </NavLink>

          {/* Escritorio */}
          <ul className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={linkClass}>
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-[0.8125rem] text-ink-300 hover:text-white transition-colors duration-400"
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a
              href="https://wa.me/573052737622"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-4 py-1.5 text-[0.8125rem] font-medium text-ink-700
                         hover:bg-ink-100 transition-colors duration-400 ease-smooth"
            >
              {t('contact_me')}
            </a>
          </div>

          {/* Botón hamburguesa: <button> real, accesible por teclado */}
          <button
            ref={burgerRef}
            type="button"
            className="md:hidden -mr-2 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Menú</span>
            <div className="flex flex-col justify-center w-5 h-5 gap-[5px]">
              <span className={`block h-px w-full bg-white transition-all duration-400 ease-smooth ${
                menuOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block h-px w-full bg-white transition-all duration-400 ease-smooth ${
                menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Móvil */}
      <div
        id="mobile-menu"
        ref={panelRef}
        // inert saca todo el panel del orden de tabulación cuando está cerrado;
        // sin esto, el foco entraba en enlaces invisibles.
        inert={menuOpen ? undefined : ''}
        aria-hidden={!menuOpen}
        className={`md:hidden fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl transition-all duration-500 ease-smooth ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container-page flex flex-col justify-center min-h-screen gap-1 pb-16">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 text-display-sm transition-all duration-500 ease-smooth ${
                  isActive ? 'text-white' : 'text-ink-400'
                } ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`
              }
              style={{ transitionDelay: menuOpen ? `${i * 45 + 80}ms` : '0ms' }}
            >
              {t(l.key)}
            </NavLink>
          ))}

          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://wa.me/573052737622"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
            >
              {t('contact_me')}
            </a>
            <button type="button" onClick={toggleLanguage} className="btn-ghost-light">
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
