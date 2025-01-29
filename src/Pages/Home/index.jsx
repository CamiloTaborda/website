import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from "../../Components/Layout";
import AnimatedText from "../../Animations/AnimatedText";
import Button from "../../Components/Button";
import MyModel from "../../Components/Viewer";
import ScrollArrow from '../../Components/ScrollArrow';
import AnimatedSection from '../../Animations/AnimatedSection';

const Home = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      {/* Primera sección: contenido principal */}
      <div 
        className="flex flex-col md:flex-row justify-center items-center w-full text-white min-h-screen h-screen"
        style={{
          backgroundImage: 
            `linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%),
             linear-gradient(to right, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%),
             url('${isMobile ? '/Icons/foto-camilo-1.jpeg' : '/Icons/foto-camilo.jpeg'}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="order-2 md:order-1 flex flex-col justify-end items-center w-full h-full gap-10 mb-10 md:mb-0">
          <div className="flex justify-center items-center w-full gap-10 mb-10 animate-slide-in-up">
            <Button href="/CV/cv-camilo-taborda.pdf" download>
              {t('download_cv')}
            </Button>
            <Button href="https://wa.me/+573052737622">
              {t('contact_me')}
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2 flex flex-col justify-center items-center w-full h-full mb-10 md:mb-0 animate-slide-in-right mt-44 md:mt-0">
          <h1 className="font-extrabold text-6xl text-gray-300 bg-gray-800 bg-opacity-75 border border-gray-500 border-b-4 px-6 py-4 rounded-md relative overflow-hidden shadow-lg mb-10">
            {t('hello')}
          </h1>
          <AnimatedText
            text={t('description')} 
          />
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              {t('view_3d_model')}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mb-6">
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