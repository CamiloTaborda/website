import { useState, Suspense, lazy } from 'react';
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Layout from "../../Components/Layout";
import AnimatedText from "../../Animations/AnimatedText";
import Button from "../../Components/Button";
import ScrollArrow from '../../Components/ScrollArrow';
import SafeVisual from '../../Components/SafeVisual';
import AnimatedSection from '../../Animations/AnimatedSection';

// Los dos componentes pesados de la home (three.js ~600 KB y model-viewer)
// se cargan en paralelo despues del primer pintado: el titulo y los botones
// aparecen sin esperarlos. Ambos son decorativos, no bloquean nada.
const LiquidEther = lazy(() => import('../../Components/LiquidEther'));
const MyModel = lazy(() => import('../../Components/Viewer'));

// Fuera del componente: un array literal inline creaba una referencia nueva en
// cada render y hacía que LiquidEther destruyera y reconstruyera toda la escena
// WebGL cada vez que se abría o cerraba el menú del CV.
const LIQUID_COLORS = ['#0066FF', '#3300FF', '#6B46C1'];

const Home = () => {
  const t = useCustomTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useSeo({
    title: t('seo_home_title'),
    description: t('seo_home_description'),
    path: '/',
  });

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <Layout>
      {/* Primera sección: contenido principal centrado con LiquidEther background */}
      <div className="flex flex-col justify-center items-center w-full text-white min-h-screen h-screen relative overflow-hidden">
        
        {/* Fondo oscuro base */}
        <div className="absolute inset-0 bg-black z-0"></div>

        {/* LiquidEther Background - capa absoluta detrás de todo */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
          <SafeVisual>
          <Suspense fallback={null}>
          <LiquidEther
            colors={LIQUID_COLORS}
            mouseForce={30}
            cursorSize={150}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
          </Suspense>
          </SafeVisual>
        </div>
        
        {/* Contenido principal centrado */}
        <div className="flex flex-col justify-center items-center w-full h-full gap-10 z-20 px-4">
          
          {/* Título y descripción */}
          <div className="flex flex-col justify-center items-center text-center mb-8">
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-snug text-gray-300 bg-gray-800 bg-opacity-75 border border-gray-500 border-b-4 px-6 py-4 rounded-md shadow-lg mb-10">
              {t('hello')}
            </h1>
            <AnimatedText text={t('description')} />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center items-center gap-6 md:gap-10">
            
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
                <div className="absolute left-0 top-full mt-0 w-48 font-bold text-gray-300 bg-gray-800 rounded-lg shadow-md z-30">
                  <a 
                    href="/CV/cv-camilo-taborda-es.pdf"
                    download
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-t-lg hover:bg-[#191919]"
                  >
                    {t('download_cv_spanish')}
                  </a>
                  <a 
                    href="/CV/cv-camilo-taborda.pdf" 
                    download
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-b-lg hover:bg-[#191919]"
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

        <ScrollArrow />
      </div>

      {/* Segunda sección: modelo 3D + texto */}
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          <SafeVisual>
            <Suspense fallback={null}>
              <MyModel />
            </Suspense>
          </SafeVisual>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 bg-black/50">
          <AnimatedSection>
            <h2 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 leading-snug">
              {t('view_3d_model')}
            </h2>
            <p className="text-white text-base md:text-lg xl:text-xl 2xl:text-2xl max-w-lg leading-relaxed mx-auto mb-10">
              {t('3d_description')}
            </p>
            <Button href="/portfolio" className="hover:scale-105 transition-transform duration-300">
              {t('view_projects')}
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Home;