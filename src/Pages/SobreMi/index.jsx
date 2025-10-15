import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Layout from "../../Components/Layout";
import Diplomas from "../../Components/Diplomas";
import ScrollArrow from "../../Components/ScrollArrow";
import AnimatedSection from "../../Animations/AnimatedSection";
import SlideDown from "../../Animations/SlideDown";
import SlideLeft from "../../Animations/SlideLeft";
import SlideRight from "../../Animations/SlideRight";
import SlideUp from "../../Animations/SlideUp";
import Ribbons from "../../Components/Ribbons";

const SobreMi = () => {
  const t = useCustomTranslation();

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-between items-center w-full text-white h-auto overflow-auto">
        
        {/* Sección superior con imagen y presentación - PANTALLA COMPLETA */}
        <div className="relative flex flex-col w-full min-h-screen md:flex-row">
          
          {/* Contenedor de la imagen */}
          <div
            className="relative flex justify-center items-end w-full h-[50vh] min-h-[400px] md:h-full md:min-h-screen bg-cover bg-center animate-slide-in-left md:w-1/2"
            style={{ backgroundImage: "url('/Icons/img1.jpeg')" }}
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
          <div className="flex flex-col justify-center w-full min-h-[50vh] md:h-full md:min-h-screen p-8 md:w-1/2 md:p-10 animate-slide-in-right">
            <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 leading-snug text-center md:text-left">{t("my_name")}
            </h1>
            <p className="font-medium max-w-3xl leading-relaxed text-center md:text-left text-base md:text-md xl:text-lg 2xl:text-xl">
            {t("my_description_1")}
              <br />
              <br />
              {t("my_description_2")}
            </p>
          </div>
          <ScrollArrow />
        </div>

        {/* Sección de habilidades con Ribbons - PANTALLA COMPLETA */}
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen py-16 md:py-20 bg-white text-black overflow-hidden">
          
          {/* Ribbons como fondo interactivo */}
          <div className="absolute inset-0 w-full h-full z-20">
            <Ribbons
              baseThickness={15}
              colors={['#007BFF']}
              speedMultiplier={0.5}
              maxAge={500}
              enableFade={false}
              enableShaderEffect={true}
            />
          </div>

          {/* Contenido sobre el fondo de ribbons */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatedSection>
              <div className="max-w-[1600px] flex flex-col justify-center items-center w-full h-full px-5 md:px-10 mx-auto gap-8 md:gap-12">
                
                {/* Título y descripción centrados */}
                <div className="flex flex-col items-center text-center max-w-4xl animate-slide-in-up">
                  <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 md:mb-6 leading-tight">{t("mySkills")}</h1>
                  <p className="font-medium leading-relaxed text-base md:text-lg xl:text-xl 2xl:text-2xl opacity-90">
                    {t("skillsDescription")}
                  </p>
                </div>

                {/* Grid de tecnologías con diseño hexagonal */}
                <div className="flex justify-center items-center w-full max-w-5xl pb-12 md:pb-0">
                  <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8">
                    
                    <SlideRight>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-blue-500/50">
                        <img src="/Icons/js.png" alt="JavaScript" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">JavaScript</div>
                      </div>
                    </SlideRight>

                    <SlideDown>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-orange-500/50">
                        <img src="/Icons/html-5.png" alt="HTML5" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">HTML5</div>
                      </div>
                    </SlideDown>

                    <SlideLeft>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-blue-400/50">
                        <img src="/Icons/css-3.png" alt="CSS3" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">CSS3</div>
                      </div>
                    </SlideLeft>

                    <SlideRight>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-cyan-400/50">
                        <img src="/Icons/react.png" alt="React" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">React</div>
                      </div>
                    </SlideRight>

                    <SlideUp>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-gray-600/50">
                        <img src="/Icons/next-logo.png" alt="Next.js" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">Next.js</div>
                      </div>
                    </SlideUp>

                    <SlideLeft>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-gray-800/50">
                        <img src="/Icons/three-js-icon.png" alt="Three.js" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">Three.js</div>
                      </div>
                    </SlideLeft>

                    <SlideDown>
                      <div className="group relative flex justify-center items-center aspect-square bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white border-opacity-30 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-110 hover:bg-opacity-30 hover:border-opacity-50 hover:shadow-2xl hover:shadow-cyan-300/50">
                        <img src="/Icons/tailwind.png" alt="Tailwind CSS" className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">Tailwind</div>
                      </div>
                    </SlideDown>

                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Sección de experiencia - PANTALLA COMPLETA */}
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-16 md:py-20 bg-black text-white">
          <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-8 md:mb-12 leading-snug px-5 text-center">{t("myExperience")}</h1>
          <div className="max-w-[1500px] w-[90%] md:w-[80%] flex flex-col md:flex-row justify-center gap-8 md:gap-10 pb-8 md:pb-0">
            {/* Sección de 77 Render Studio */}
           <div
            onClick={() => window.open("https://www.77renderstudio.com/", "_blank")}  
            className="flex flex-col justify-center items-center cursor-pointer w-full md:w-1/2 px-5 md:px-8 border border-transparent rounded-lg bg-[#191919] p-8 md:p-10 transition-all duration-500 ease-in-out hover:border-[#ffffff]">
              <AnimatedSection>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h2 className="font-extrabold text-white text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-6xl mb-5 leading-snug text-center">{t("77RenderStudio")}</h2>
                  <p className="font-medium max-w-3xl leading-relaxed text-center text-base md:text-md xl:text-lg 2xl:text-xl">
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
            className="flex flex-col justify-center items-center cursor-pointer w-full md:w-1/2 px-5 md:px-8 border border-transparent rounded-lg bg-[#191919] p-8 md:p-10 transition-all duration-500 ease-in-out hover:border-[#ffffff]">
              <AnimatedSection>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h2 className="font-extrabold text-white text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-6xl mb-5 leading-snug text-center">{t("ArdataTech")}</h2>
                  <p className="font-medium max-w-3xl leading-relaxed text-center text-base md:text-md xl:text-lg 2xl:text-xl">
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