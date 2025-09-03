import { useState, useEffect } from 'react';
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Layout from "../../Components/Layout";
import AnimatedText from "../../Animations/AnimatedText";
import Button from "../../Components/Button";
import MyModel from "../../Components/Viewer";
import ScrollArrow from '../../Components/ScrollArrow';
import AnimatedSection from '../../Animations/AnimatedSection';

const Home = () => {
  const t = useCustomTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Precargar imagen
  useEffect(() => {
    const imageUrl = isMobile ? '/Icons/img2.jpeg' : '/Icons/foto-camilo.jpeg';
    const img = new Image();
    
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);
    };
    
    // Reset estado cuando cambia el dispositivo
    setImageLoaded(false);
    setImageError(false);
    
    img.src = imageUrl;
  }, [isMobile]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const getBackgroundStyle = () => {
    if (imageError) {
      // Si hay error, usar gradiente de respaldo
      return {
        background: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
      };
    }

    // Imagen cargada correctamente
    const imageUrl = isMobile ? '/Icons/img2.jpeg' : '/Icons/foto-camilo.jpeg';
    return {
      backgroundImage: 
        `linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%),
         linear-gradient(to right, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%),
         url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <Layout>
      {/* Primera sección: contenido principal */}
      <div 
        className="flex flex-col md:flex-row justify-center items-center w-full text-white min-h-screen h-screen relative"
      >
        {/* Overlay de pantalla oscura - siempre presente */}
        <div className="absolute inset-0 bg-slate-900 z-0"></div>

        {/* Overlay con imagen de fondo que aparece suavemente */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-10 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={getBackgroundStyle()}
        ></div>

        <div className="order-2 md:order-1 flex flex-col justify-end items-center w-full h-full gap-10 mb-10 md:mb-0 z-20">
          <div className={`flex justify-center items-center w-full gap-10 mb-10 relative transition-all duration-700 ${
            imageLoaded ? 'animate-slide-in-up opacity-100' : 'opacity-0 translate-y-4'
          }`}>
            
            {/* Botón de descarga con menú desplegable */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <Button>
                {t('download_cv')}
              </Button>

              {/* Menú desplegable */}
              {isMenuOpen && (
                <div className="absolute left-0 w-48 font-bold text-gray-300 bg-gray-800 rounded-lg shadow-md">
                  <a 
                    href="/CV/cv-camilo-taborda-español.pdf" 
                    download
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-lg hover:bg-[#191919]"
                  >
                    {t('download_cv_spanish')}
                  </a>
                  <a 
                    href="/CV/cv-camilo-taborda.pdf" 
                    download
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-lg hover:bg-[#191919]"
                  >
                    {t('download_cv_english')}
                  </a>
                </div>
              )}
            </div>

            <Button href="https://wa.me/+573052737622">
              {t('contact_me')}
            </Button>

          </div>
        </div>

        <div className={`order-1 md:order-2 flex flex-col justify-center items-center w-full h-full mb-10 md:mb-0 mt-44 md:mt-0 z-20 transition-opacity duration-1200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-snug text-gray-300 bg-gray-800 bg-opacity-75 border border-gray-500 border-b-4 px-6 py-4 rounded-md relative overflow-hidden shadow-lg mb-10">
            {t('hello')}
          </h1>
          <AnimatedText text={t('description')} />
        </div>

        <ScrollArrow />
      </div>

      {/* Segunda sección: modelo 3D + texto */}
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          <MyModel />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 bg-black/50">
          <AnimatedSection>
            <h2 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 leading-snug">
              {t('view_3d_model')}
            </h2>
            <p className="text-white text-base md:text-lg xl:text-xl 2xl:text-2xl max-w-lg leading-relaxed mx-auto mb-10">
              {t('3d_description')}
            </p>
            <Button href="/portfolio" className="bg-white text-black hover:scale-105 transition-transform duration-300">
              {t('view_projects')}
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Home;