import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeStyle = 'underline underline-offset-8 decoration-2';

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-medium top-0 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'} text-white`}>
      <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center">
        <ul className="flex items-center">
          <li className="font-extrabold text-2xl">
            <NavLink to='/'>CamiloT</NavLink>
          </li>
        </ul>

        {/* Botón de menú hamburguesa */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <div className={`w-8 h-0.5 bg-white mb-1 rounded-lg transition-transform ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-8 h-0.5 bg-white mb-1 rounded-lg ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
          <div className={`w-8 h-0.5 bg-white mt-1 rounded-lg transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>

        {/* Menú para pantallas grandes */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <NavLink to='/' className={({ isActive }) => isActive ? activeStyle : undefined}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to='/sobre-mi' className={({ isActive }) => isActive ? activeStyle : undefined}>
              Sobre mí
            </NavLink>
          </li>
          <li>
            <NavLink to='/portfolio' className={({ isActive }) => isActive ? activeStyle : undefined}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to='/contacto' className={({ isActive }) => isActive ? activeStyle : undefined}>
              Contacto
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-20">
          <ul className="flex flex-col items-center">
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to='/' className={({ isActive }) => isActive ? activeStyle : undefined}>
                Inicio
              </NavLink>
            </li>
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to='/sobre-mi' className={({ isActive }) => isActive ? activeStyle : undefined}>
                Sobre mí
              </NavLink>
            </li>
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to='/portfolio' className={({ isActive }) => isActive ? activeStyle : undefined}>
                Portfolio
              </NavLink>
            </li>
            <li className="text-white text-2xl mb-5" onClick={toggleMenu}>
              <NavLink to='/contacto' className={({ isActive }) => isActive ? activeStyle : undefined}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
