import { useState, useEffect, useMemo, useCallback } from 'react';
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout";
import ScrollArrow from "../../Components/ScrollArrow";
import Spinner from '../../Components/Spinner';
import AnimatedSection from "../../Animations/AnimatedSection";
import ProjectCard from '../../Components/ProjectCard';
import FilterCarousel from '../../Components/FilterCarousel';
import { projects } from '../../Data/projectsData';
import { getCategories } from '../../Data/categoriesData';

const Portfolio = () => {
  const t = useCustomTranslation();
  const [isPageReady, setIsPageReady] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // ── Carga de imagen de fondo ──
  useEffect(() => {
    const img = new Image();
    const safetyTimer = setTimeout(() => setIsPageReady(true), 3500);

    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
      setTimeout(() => setIsPageReady(true), 500);
    };

    img.onerror = () => {
      setImageError(true);
      setIsPageReady(true);
    };

    img.src = '/Icons/foto-codigo.jpg';
    return () => clearTimeout(safetyTimer);
  }, []);

  const backgroundStyle = useMemo(() => (
    imageError
      ? { background: 'linear-gradient(135deg, #374151 0%, #111827 100%)' }
      : {
          backgroundImage: `url('/Icons/foto-codigo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
  ), [imageError]);

  const categories = useMemo(() => getCategories(t), [t]);

  const filteredProjects = useMemo(() =>
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter),
    [activeFilter]
  );

  const handleFilterChange = useCallback((id) => setActiveFilter(id), []);

  return (
    <>
      {/* Loader */}
      {!isPageReady && (
        <div className="fixed inset-0 z-[100] bg-black flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {/* Contenido principal */}
      <div className={`transition-opacity duration-1000 ease-in-out ${isPageReady ? 'opacity-100' : 'opacity-0'}`}>
        <Layout background={{ backgroundColor: "black" }}>
          <div className="flex flex-col justify-center items-center w-full text-white h-auto overflow-auto bg-black">

            {/* ── Hero ── */}
            <div className="relative flex flex-col justify-center items-center w-full min-h-screen p-4 text-center text-white">
              <div className="absolute inset-0 bg-black z-0" />
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-10 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={backgroundStyle}
              />
              <div className="absolute inset-0 bg-black/60 z-20" />

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

            {/* ── Proyectos ── */}
            <div className="flex flex-col items-center w-full py-24 bg-white text-black">
              <FilterCarousel
                categories={categories}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1500px] w-full px-8 2xl:px-0">
                {filteredProjects.map((item, index) => (
                  <ProjectCard key={`${item.caption}-${index}`} item={item} t={t} />
                ))}
              </div>
            </div>

            {/* ── Sección final ── */}
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