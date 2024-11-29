import { useState, useEffect } from 'react';
import Layout from "../../Components/Layout";
import AnimatedText from "../../Animations/AnimatedText";
import Button from "../../Components/Button";
import MyModel from "../../Components/Viewer";
import ScrollArrow from '../../Components/ScrollArrow';
import AnimatedSection from '../../Animations/AnimatedSection';

const Home = () => {
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
              Descarga mi CV
            </Button>
            <Button href="https://wa.me/+573052737622">
              Contáctame
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2 flex flex-col justify-center items-center w-full h-full mb-10 md:mb-0 animate-slide-in-right mt-44 md:mt-0">
          <h1 className="font-extrabold text-6xl text-gray-300 bg-gray-800 bg-opacity-75 border border-gray-500 border-b-4 px-6 py-4 rounded-md relative overflow-hidden shadow-lg mb-10">
            ¡Hola!
          </h1>
          <AnimatedText
            text="Soy Camilo Taborda, desarrollador de software apasionado y mi misión es crear aplicaciones que te hagan la vida más fácil. Me esfuerzo por ofrecerte la mejor experiencia posible, con soluciones simples y efectivas que realmente funcionen para ti."
          />
        </div>

        {/* Icono de flecha para indicar scroll */}
        <ScrollArrow />
      </div>

      {/* Segunda sección: modelo 3D + texto */}
      <div className="flex justify-center items-center w-full bg-white px-0 md:px-6 lg:px-12 py-10">
        <AnimatedSection>
          <div className="flex w-full flex-col md:flex-row justify-between max-w-[1500px]">
            {/* Texto arriba en pantallas pequeñas */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-black p-10">
              <h2 className="text-4xl font-bold mb-4">¡Mira este modelo en 3D!</h2>
              <p className="text-lg text-black font-medium mb-4">
                Esta es una bicicleta en 3D que puedes rotar, acercar y explorar desde cualquier ángulo. Dale una vuelta y descubre cómo interactúa con el entorno.
              </p>
              <Button href="/portfolio">Ver proyectos</Button>
            </div>

            {/* Modelo 3D debajo en pantallas pequeñas */}
            <div className="w-full md:w-1/2 h-80">
              <MyModel />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Home;
