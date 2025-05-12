import { useState, useEffect } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout";
import Video from "../../Components/Video";
import ImagePreview from "../../Components/ImagePreview";
import ScrollArrow from "../../Components/ScrollArrow";
import AnimatedSection from "../../Animations/AnimatedSection";

const Portfolio = () => {
  const t = useCustomTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const videos = [
    {
      src: "/Video/video3.mp4",
      img: "/Icons/foto-1.png",
      caption: "Modular Configurator",
      link: "https://static.ardatatech.co/ARData/modular/",
    },
    {
      src: "/Video/video5.mp4",
      img: "/Icons/foto-2.png",
      caption: "Viewer360",
      link: "https://static.ardatatech.co/ardata-viewer-full/",
    },
    {
      src: "/Video/video6.mp4",
      img: "/Icons/foto-3.png",
      caption: "Product Animation",
      link: "https://static.ardatatech.co/web-components/ardata-animation-product/",
    },
    {
      src: "/Video/video4.mp4",
      img: "/Icons/foto-4.png",
      caption: "Product Tour",
      link: "https://static.ardatatech.co/ARData/product-tour/",
    },
    {
      src: "/Video/video1.mp4",
      img: "/Icons/foto-6.png",
      caption: "Website Ardata Tech",
      link: "https://ardatatech.co/",
    },
    {
      src: "/Video/video2.mp4",
      img: "/Icons/foto-5.png",
      caption: "Website 77 Render Studio",
      link: "https://www.77renderstudio.com/",
    },
  ];

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-center items-center w-full text-white h-auto overflow-auto bg-black">
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen p-4 text-center text-white bg-[url('/Icons/foto-codigo.jpg')] bg-cover bg-center bg-no-repeat">
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Contenido central */}
          <div className="relative flex flex-col items-center animate-fade-in">
            <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 leading-snug animate-slide-in-down">
              {t("my_portfolio")}
            </h1>
            <p className="font-medium max-w-3xl leading-relaxed text-center md:text-left text-base md:text-md xl:text-lg 2xl:text-xl mb-10 animate-slide-in-up">
              {t("portfolio_description")}
            </p>

            <Button href="https://wa.me/+573052737622">{t("contact_me_porfolio")}</Button>
          </div>
          <ScrollArrow />
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 py-36 pr-10 pl-10 text-white h-auto overflow-auto bg-white animate-slide-in-right">
          {videos.map((item, index) =>
            isMobile ? (
              <ImagePreview
                key={index}
                src={item.img}
                caption={item.caption}
                link={item.link}
              />
            ) : (
              <Video
                key={index}
                src={item.src}
                caption={item.caption}
                link={item.link}
              />
            )
          )}
        </div>

        {/* Descripción final */}
        <div className="flex flex-col justify-center items-center w-full h-auto py-10 mt-10">
          <AnimatedSection>
            <div className="flex justify-center items-center w-full mb-4">
              <p className="font-medium max-w-3xl leading-relaxed text-center text-lg md:text-2xl">
                {t("portfolio_description_1")}
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button href="https://wa.me/+573052737622">{t("contact_me")}</Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
