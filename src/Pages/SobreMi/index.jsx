import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Layout from "../../Components/Layout";
import Diplomas from "../../Components/Diplomas";
import ScrollArrow from "../../Components/ScrollArrow";
import AnimatedSection from "../../Animations/AnimatedSection";
import SlideDown from "../../Animations/SlideDown";
import SlideLeft from "../../Animations/SlideLeft";
import SlideRight from "../../Animations/SlideRight";
import SlideUp from "../../Animations/SlideUp";

const SobreMi = () => {
  const t = useCustomTranslation();

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-between items-center w-full text-white h-auto overflow-auto">
        
        {/* Sección superior con imagen y presentación */}
        <div className="relative flex flex-col w-full min-h-screen md:flex-row">
          
          {/* Contenedor de la imagen */}
          <div
            className="relative flex justify-center items-end w-full h-[50vh] md:h-auto bg-cover bg-center animate-slide-in-left md:w-1/2"
            style={{ backgroundImage: "url('/Icons/foto3.jpeg')" }}
          >
            <div
              className="absolute inset-0 bg-black opacity-100"
              style={{
                background: "linear-gradient(to right, transparent, black)",
              }}
            />
            <div className="flex gap-5 mb-10 pt-3 w-full justify-center relative z-10">
              <a href="https://www.linkedin.com/in/camilo-taborda-20724917a/" target="_blank" rel="noopener noreferrer">
                <img src="/Icons/linkedin.png" alt="LinkedIn" className="animate-slide-in-up w-8 h-8 filter invert brightness-200 transition-transform duration-200 transform hover:scale-110" />
              </a>
              <a href="https://github.com/CamiloTaborda" target="_blank" rel="noopener noreferrer">
                <img src="/Icons/github.png" alt="GitHub" className="animate-slide-in-up w-8 h-8 filter invert brightness-200 transition-transform duration-200 transform hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Contenedor de texto */}
          <div className="flex flex-col justify-center w-full p-5 md:w-1/2 md:p-10 animate-slide-in-right">
            <h1 className="font-bold text-4xl mb-5 text-center md:text-left">{t("my_name")}</h1>
            <p className="font-medium max-w-3xl leading-relaxed text-center md:text-left">
            {t("my_description_1")}
              <br />
              <br />
              {t("my_description_2")}
            </p>
          </div>
          <ScrollArrow />
        </div>

        {/* Sección de habilidades */}
        <div className="flex flex-col justify-center items-center w-full h-auto py-20 bg-white text-black cursor-crosshair">
          <AnimatedSection>
            <div className="max-w-[1500px] flex flex-col md:flex-row justify-center items-center w-full h-auto p-0 md:p-5">
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 p-8 md:items-center animate-slide-in-up">
                <h1 className="font-bold text-4xl mb-8 text-center">{t("mySkills")}</h1>
                <p className="font-medium leading-relaxed text-left md:text-center w-full md:max-w-3xl">
                {t("skillsDescription")}
                </p>
              </div>

              <div className="flex justify-center items-center w-full md:w-1/2 p-4 mx-auto">
                <div className="grid grid-cols-3 grid-rows-2 gap-8 p-8 bg-black bg-opacity-10 border border-gray-300 rounded-lg backdrop-blur-md">
                  <SlideRight>
                  <img src="/Icons/js.png" alt="JS Icon" className="w-full max-w-[100px] h-auto" />
                  </SlideRight>
                  <SlideDown>
                  <img src="/Icons/html-5.png" alt="HTML Icon" className="w-full max-w-[100px] h-auto" />
                  </SlideDown>
                  <SlideLeft>
                  <img src="/Icons/css-3.png" alt="CSS Icon" className="w-full max-w-[100px] h-auto" />
                  </SlideLeft>
                  <SlideRight>
                  <img src="/Icons/react.png" alt="React Icon" className="w-full max-w-[100px] h-auto" />
                  </SlideRight>
                  <SlideUp>
                  <img src="/Icons/three-js-icon.png" alt="Three.js Icon" className="w-full max-w-[100px] h-auto" />
                  </SlideUp>
                  <SlideLeft>
                  <img src="/Icons/tailwind.png" alt="Tailwind Icon" className="w-full max-w-[100px] h-auto" />
                  </SlideLeft>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Sección de experiencia */}
        <div className="flex flex-col justify-center items-center w-full h-auto py-36 bg-black text-white">
          <h1 className="font-bold text-4xl mb-8">{t("myExperience")}</h1>
          <div className="max-w-[1500px] w-[90%] md:w-[80%] flex flex-col md:flex-row justify-center gap-10">
            {/* Sección de 77 Render Studio */}
           <div
            onClick={() => window.open("https://www.77renderstudio.com/", "_blank")}  
            className="flex flex-col justify-center items-center cursor-pointer w-full md:w-1/2 px-5 md:px-8 mb-8 md:mb-0 border border-transparent rounded-lg bg-[#191919] p-10 transition-all duration-500 ease-in-out hover:border-[#ffffff]">
              <AnimatedSection>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h2 className="font-bold text-3xl mb-5">{t("77RenderStudio")}</h2>
                  <p className="font-medium text-center max-w-md leading-relaxed">
                  {t("77RenderStudioDescription")}
                  </p>
                  <SlideUp>
                  <img className="w-10 mt-5 transition-transform duration-200 transform hover:scale-110" src="/Icons/77-logo.webp" alt="77 Render Studio Logo" />
                  </SlideUp>
                </div>
              </AnimatedSection>
            </div>

            {/* Sección de Ardata Tech */}
            <div
            onClick={() => window.open("https://ardatatech.co/", "_blank")} 
            className="flex flex-col justify-center items-center cursor-pointer w-full md:w-1/2 px-5 md:px-8 border border-transparent rounded-lg bg-[#191919] p-10 transition-all duration-500 ease-in-out hover:border-[#ffffff]">
              <AnimatedSection>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h2 className="font-bold text-3xl mb-5">{t("ArdataTech")}</h2>
                  <p className="font-medium text-center max-w-md leading-relaxed">
                  {t("ArdataTechDescription")}
                  </p>
                  <SlideUp>
                  <img className="w-10 mt-5 transition-transform duration-200 transform hover:scale-110" src="/Icons/logo-color.png" alt="Ardata Tech Logo" />
                  </SlideUp>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Sección de educación */}
        <Diplomas />
      </div>
    </Layout>
  );
};

export default SobreMi;
