import Button from "../../Components/Button";
import Layout from "../../Components/Layout";
import Video from "../../Components/Video";
import ScrollArrow from "../../Components/ScrollArrow";
import AnimatedSection from "../../Animations/AnimatedSection";

const Portfolio = () => {
  const videos = [
    { src: '/public/Video/Video1.mp4', caption: 'Website Ardata Tech', link: 'https://ardatatech.co/' },
    { src: '/public/Video/Video2.mp4', caption: 'Website 77 Render Studio', link: 'https://www.77renderstudio.com/' },
    { src: '/public/Video/Video3.mp4', caption: 'Configurador Modular', link: 'https://static.ardatatech.co/ARData/modular/' },
    { src: '/public/Video/Video4.mp4', caption: 'Tour de productos', link: 'https://static.ardatatech.co/ARData/product-tour/' },
    { src: '/public/Video/Video5.mp4', caption: 'Visor 360', link: 'https://static.ardatatech.co/ARData/360-3d-visor-copia/' },
    { src: '/public/Video/Video6.mp4', caption: 'Animacion de producto', link: 'https://static.ardatatech.co/ARData/product-animation/' },
  ];

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-center items-center w-full text-white h-auto overflow-auto bg-black">
        <div 
          className="relative flex flex-col justify-center items-center w-full min-h-screen p-4 text-center text-white bg-[url('./public/Icons/foto-codigo.jpg')] bg-cover bg-center bg-no-repeat">
          
          {/* Overlay oscuro para mejorar la legibilidad */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Contenido central con animaciones */}
          <div className="relative z-10 flex flex-col items-center animate-fade-in">
            <h1 className="font-bold text-4xl md:text-5xl mb-5 drop-shadow-lg animate-slide-in-down">Portfolio</h1>
            <p className="font-medium max-w-3xl leading-relaxed px-4 mb-10 drop-shadow-lg animate-slide-in-up">
              Descubre una selección de mis proyectos más innovadores, donde he aplicado mis habilidades en desarrollo front-end y visualización 3D. Desde aplicaciones interactivas hasta configuradores personalizados, cada proyecto refleja mi pasión por crear experiencias únicas y funcionales para los usuarios.
            </p>

            {/* Botón CTA */}
            <Button href="https://wa.me/+573052737622">
              ¡Contáctame!
            </Button>
          </div>
          <ScrollArrow />
        </div>

        {/* Contenedor de videos en formato grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 py-36 pr-10 pl-10 text-white h-auto overflow-auto bg-white animate-slide-in-right">
          {videos.map((video, index) => (
            <Video 
              key={index} 
              src={video.src} 
              caption={video.caption} 
              link={video.link}
            />
          ))}
        </div>

        <div className="flex flex-col justify-center items-center w-full h-auto py-10 mt-10">
        <AnimatedSection>
          {/* Primer contenedor */}
          <div className="flex justify-center items-center w-full mb-4">
            <p className="font-medium max-w-3xl leading-relaxed text-center text-lg md:text-2xl">
              ¿Listo para llevar tu proyecto al siguiente nivel? ¡Contáctame y hagamos realidad tus ideas!
            </p>
          </div>

          {/* Segundo contenedor */}
          <div className="flex justify-center items-center w-full">
            <Button href="https://wa.me/+573052737622">Contáctame</Button>
          </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
