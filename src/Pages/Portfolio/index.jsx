import { useState, useEffect, useMemo } from 'react';
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout";
import Video from "../../Components/Video";
import ScrollArrow from "../../Components/ScrollArrow";
import Spinner from '../../Components/Spinner';
import AnimatedSection from "../../Animations/AnimatedSection";

const Portfolio = () => {
  const t = useCustomTranslation();
  const [isPageReady, setIsPageReady] = useState(false); // Estado para controlar la visibilidad total
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // --- Lógica de Control de Carga ---
  useEffect(() => {
    const imageUrl = '/Icons/foto-codigo.jpg';
    const img = new Image();
    
    img.onload = () => { 
      setImageLoaded(true); 
      setImageError(false); 
      // Damos un pequeño respiro de 500ms para que el navegador procese el render
      setTimeout(() => setIsPageReady(true), 500); 
    };
    
    img.onerror = () => { 
      setImageError(true); 
      setIsPageReady(true); // Mostramos la web aunque la imagen de fondo falle
    };
    
    img.src = imageUrl;

    // Timer de seguridad: si a los 3.5 segundos no ha cargado, forzamos la entrada
    const safetyTimer = setTimeout(() => {
      setIsPageReady(true);
    }, 3500);

    return () => clearTimeout(safetyTimer);
  }, []);

  const getBackgroundStyle = () => {
    if (imageError) return { background: 'linear-gradient(135deg, #374151 0%, #111827 100%)' };
    return {
      backgroundImage: `url('/Icons/foto-codigo.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  const projects = useMemo(() => [
    {
      src: "/Video/video3.mp4",
      img: "/Icons/foto-1.png",
      caption: "Modular Configurator",
      link: "https://static.ardatatech.co/full-modular-2/",
      category: "3d_config",
      tools: ["React", "Three.js", "WebGL", "GSAP", "Tailwind.CSS"]
    },
    {
      src: "/Video/video6.mp4",
      img: "/Icons/foto-3.png",
      caption: "Product Animation",
      link: "https://static.ardatatech.co/web-components/ardata-animation-product/",
      category: "3d_config",
      tools: ["React.js", "Model-Viewer (Three.js)", "GSAP", "Tailwind.CSS"]
    },
    {
      src: "/Video/video4.mp4",
      img: "/Icons/foto-4.png",
      caption: "Product Tour",
      link: "https://static.ardatatech.co/ARData/product-tour/",
      category: "3d_config",
      tools: ["React.js", "Model-Viewer (Three.js)", "GSAP", "Tailwind.CSS"]
    },
    {
      src: "/Video/video10.mp4",
      img: "/Icons/foto-10.png",
      caption: "Product Configurator",
      link: "https://static.ardatatech.co/web-components/ardata-configurator/",
      category: "3d_config",
      tools: ["React.js", "Model-Viewer (Three.js)", "GSAP", "Tailwind.CSS"]
    },
    {
      src: "/Video/video5.mp4",
      img: "/Icons/foto-2.png",
      caption: "Viewer360",
      link: "https://static.ardatatech.co/ardata-viewer-full/",
      category: "360_viewers",
      tools: ["React.js", "Model-Viewer (Three.js)", "Tailwind.CSS", "GSAP", "Framer Motion"]
    },
    {
      src: "/Video/video7.mp4",
      img: "/Icons/foto-8.png",
      caption: "Product Scene",
      link: "https://static.ardatatech.co/web-components/ardata-product-scene/",
      category: "360_viewers",
      tools: ["React.js", "Tailwind.CSS", "GSAP", "Framer Motion"]
    },
    {
      src: "/Video/video8.mp4",
      img: "/Icons/foto-7.png",
      caption: "Product Photo Studio",
      link: "https://static.ardatatech.co/web-components/ardata-photo-studio/",
      category: "360_viewers",
      tools: ["React.js", "Tailwind.CSS", "GSAP", "Framer Motion"]
    },
    {
      src: "/Video/video2.mp4",
      img: "/Icons/foto-5.png",
      caption: "Website 77 Render Studio",
      link: "https://www.77renderstudio.com/",
      category: "websites",
      tools: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"]
    },
    {
      src: "/Video/video1.mp4",
      img: "/Icons/foto-6.png",
      caption: "Website Ardata Tech",
      link: "https://ardatatech.co/",
      category: "websites",
      tools: ["React.js", "Tailwind CSS", "Framer Motion", "SEO"]
    },
    {
      src: "/Video/video9.mp4",
      img: "/Icons/foto-9.png",
      caption: "Website AC Tributaria",
      link: "https://www.actributaria.com/",
      category: "websites",
      tools: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO", "Vercel" ]
    }
  ], []);

  const categories = [
    { id: 'all', label: t("all_projects") || "Todos" },
    { id: '3d_config', label: t("3d_configurators") || "Configuradores 3D" },
    { id: '360_viewers', label: t("360_viewers") || "Visores 360" },
    { id: 'websites', label: t("websites") || "Sitios Web" },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* 1. PANTALLA DE CARGA (LOADER) */}
      {!isPageReady && (
        <div className="fixed inset-0 z-[100] bg-black flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {/* 2. CONTENIDO PRINCIPAL (Con transición de opacidad) */}
      <div className={`transition-opacity duration-1000 ease-in-out ${isPageReady ? 'opacity-100' : 'opacity-0'}`}>
        <Layout background={{ backgroundColor: "black" }}>
          <div className="flex flex-col justify-center items-center w-full text-white h-auto overflow-auto bg-black">
            
            {/* HERO SECTION */}
            <div className="relative flex flex-col justify-center items-center w-full min-h-screen p-4 text-center text-white">
              <div className="absolute inset-0 bg-black z-0"></div>
              <div 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-10 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={getBackgroundStyle()}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-60 z-20"></div>

              <div className="relative flex flex-col items-center z-30">
                <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 leading-snug">
                  {t("my_portfolio")}
                </h1>
                <p className="font-medium max-w-3xl leading-relaxed text-center text-base md:text-md xl:text-lg 2xl:text-xl mb-10 text-gray-200">
                  {t("portfolio_description")}
                </p>
                <Button href="https://wa.me/+573052737622">{t("contact_me_porfolio")}</Button>
              </div>
              <ScrollArrow />
            </div>

            {/* SECCIÓN DE PROYECTOS */}
            <div className="flex flex-col items-center w-full py-24 bg-white text-black">
              
              {/* Filtros */}
              <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border-2 ${
                      activeFilter === cat.id 
                      ? 'bg-black text-white border-black scale-105' 
                      : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Grid de Proyectos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1500px] w-full px-8 2xl:px-0">
                {filteredProjects.map((item, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-xl shadow-xl bg-black transform transition-all duration-500 hover:-translate-y-2"
                  >
                    <Video
                      src={item.src}
                      caption={item.caption}
                      link={item.link}
                      poster={item.img}
                    />

                    {/* Overlay de Herramientas */}
                    <div className="absolute inset-0 bg-black/85 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6 text-center">
                      <h4 className="text-white text-xl font-bold mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        {item.caption}
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {item.tools.map((tool, i) => (
                          <span key={i} className="bg-white/10 text-white text-[10px] uppercase tracking-tighter px-2 py-1 rounded border border-white/20">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-white text-black text-sm font-bold rounded hover:bg-gray-200 transition-colors"
                      >
                        {t("view_project") || "VIEW PROJECT"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN FINAL */}
            <div className="flex flex-col justify-center items-center w-full py-24 bg-black">
              <AnimatedSection>
                <p className="font-medium max-w-3xl leading-relaxed text-center text-lg md:text-2xl text-white mb-8 px-6">
                  {t("portfolio_description_1")}
                </p>
                <div className="flex justify-center w-full">
                  <Button href="https://wa.me/+573052737622">{t("contact_me")}</Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Portfolio;