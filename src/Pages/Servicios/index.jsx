import Layout from "../../Components/Layout";
import Button from "../../Components/Button";
import AnimatedSection from "../../Animations/AnimatedSection";
import SlideUp from "../../Animations/SlideUp";
import SlideLeft from "../../Animations/SlideLeft";
import SlideRight from "../../Animations/SlideRight";
import SlideDown from "../../Animations/SlideDown";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import { 
  FiAlertCircle, 
  FiTrendingDown, 
  FiSmartphone, 
  FiImage 
} from "react-icons/fi";
import {  
  BiTargetLock, 
  BiMessageSquareDetail, 
  BiRocket 
} from "react-icons/bi";
import { 
  HiSparkles,
  HiOutlineGlobeAlt, 
  HiOutlineLightningBolt, 
  HiOutlineCode, 
  HiOutlineRefresh 
} from "react-icons/hi";
import { 
  BsBriefcase, 
  BsBullseye,  
  BsChatDots 
} from "react-icons/bs";
import { AiOutlineRocket } from "react-icons/ai";
import { FaHandshake, FaPhoneAlt  } from "react-icons/fa";

const Servicios = () => {
  const t = useCustomTranslation();

  useSeo({
    title: t('seo_services_title'),
    description: t('seo_services_description'),
    path: '/servicios',
  });

  const handleContactClick = () => {
    window.open("https://wa.me/573052737622?text=Hola, me interesa conocer más sobre tus servicios", "_blank");
  };

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-between items-center w-full text-white h-auto overflow-auto">
        
        {/* 1️⃣ HERO SECTION - Pantalla completa con efecto de degradado */}
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen px-5 2xl:px-0 bg-gradient-to-b from-black via-gray-900 to-black">
          <AnimatedSection>
            <div className="max-w-[1500px] flex flex-col items-center text-center gap-5 mt-20 xl:mt-10 2xl:mt-0">
              <SlideDown>
                <div className="inline-block px-6 py-2 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-full">
                 <p className="flex items-center gap-2 text-xs md:text-base font-bold text-gray-300">
                 <BiRocket className="text-gray-300" size={18} />
                  {t('services_hero_tag')}
                 </p>
                </div>
              </SlideDown>

              <SlideUp>
                <h1 className="font-extrabold text-white text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
                  {t('services_hero_title')}
                </h1>
              </SlideUp>
              
              <SlideUp>
                <p className="font-medium text-md md:text-xl xl:text-2xl 2xl:text-3xl text-gray-300 max-w-4xl leading-relaxed">
                  {t('services_hero_text')}
                </p>
              </SlideUp>

              <SlideUp>
                <div className="flex flex-col sm:flex-row mt-5">
                <Button onClick={handleContactClick}>
                <FaPhoneAlt size={16} />
                 {t('services_hero_button')}
                </Button>
                </div>
              </SlideUp>

              <SlideUp>
                <div className="hidden md:flex flex-col md:flex-row items-center gap-8 mt-8 text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-medium">✓ {t('services_hero_tag_1')}</span>
                  </div>
                  <div className="hidden md:block w-px h-6"><span>•</span></div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-medium">✓ {t('services_hero_tag_2')}</span>
                  </div>
                  <div className="hidden md:block w-px h-6"><span>•</span></div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-medium">✓ {t('services_hero_tag_3')}</span>
                  </div>
                </div>
              </SlideUp>
            </div>
          </AnimatedSection>
        </div>

        {/* 2️⃣ PROBLEMAS COMUNES - Fondo blanco */}
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 md:py-24 bg-white text-black">
  <AnimatedSection>
    <div className="max-w-[1500px] w-full px-5 2xl:px-0 flex flex-col items-center gap-16">

      {/* HEADER */}
      <div className="text-center ">
        <SlideUp>
          <h2 className="w-full font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight mb-6">
            {t('services_2_title')}
          </h2>
        </SlideUp>
        <SlideUp>
          <p className="font-medium text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('services_2_text')}
          </p>
        </SlideUp>
      </div>

      {/* GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {[
          {
            Icon: FiAlertCircle,
            title: t('services_2_card_1'),
            description:
              t('services_2_card_1_description'),
            color: "text-gray-600",
          },
          {
            Icon: FiSmartphone,
            title: t('services_2_card_2'),
            description:
              t('services_2_card_2_description'),
            color: "text-gray-600",
          },
          {
            Icon: FiImage,
            title: t('services_2_card_3'),
            description:
              t('services_2_card_3_description'),
            color: "text-gray-600",
          },
          {
            Icon: FiTrendingDown,
            title: t('services_2_card_4'),
            description:
              t('services_2_card_4_description'),
            color: "text-gray-600",
          },
        ].map((problem, index) => (
          <SlideUp key={index}>
            <div
              className="
                flex flex-col justify-between
                h-[350px]
                bg-gradient-to-br from-gray-50 to-gray-100
                border-2 border-gray-200
                rounded-2xl
                p-8 md:p-10
                transition-all duration-500
                hover:scale-105 hover:border-black hover:shadow-2xl
                group
              "
            >
              {/* CONTENT */}
              <div>
                <problem.Icon
                  className={`text-6xl mb-6 ${problem.color} transition-transform duration-300 group-hover:scale-110`}
                />

                <h3 className="font-extrabold text-2xl md:text-3xl mb-4 line-clamp-2">
                  {problem.title}
                </h3>

                <p className="font-medium text-base md:text-lg text-gray-700 leading-relaxed line-clamp-3">
                  {problem.description}
                </p>
              </div>
            </div>
          </SlideUp>
        ))}
      </div>
    </div>
  </AnimatedSection>
</div>


        {/* 3️⃣ TU SOLUCIÓN - Fondo negro con patrón */}
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 md:py-24 bg-black text-white relative overflow-hidden">
          {/* Patrón de fondo sutil */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <AnimatedSection>
            <div className="max-w-[1500px] w-full px-5 2xl:px-0 flex flex-col items-center gap-16 relative z-10">
              <div className="text-center ">
                <SlideUp>
                  <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight mb-6">
                    {t('services_3_title')}
                  </h2>
                </SlideUp>
                <SlideUp>
                  <p className="font-medium text-lg md:text-xl text-gray-300 leading-relaxed">
                    {t('services_3_text')}
                  </p>
                </SlideUp>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    Icon: HiSparkles, 
                    title: t('services_3_card_1'), 
                    description: t('services_3_card_1_description'),
                  },
                  { 
                    Icon: BiTargetLock, 
                    title: t('services_3_card_2'), 
                    description: t('services_3_card_2_description'),
                  },
                  { 
                    Icon: BiMessageSquareDetail, 
                    title: t('services_3_card_3'), 
                    description: t('services_3_card_3_description'),
                  },
                  { 
                    Icon: BiRocket, 
                    title: t('services_3_card_4'), 
                    description: t('services_3_card_4_description'),
                  }
                ].map((solution, index) => (
                  <SlideUp key={index}>
                    <div className="flex flex-col items-center text-center bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-8 transition-all duration-500 hover:border-white hover:scale-105 group h-full">
                      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-4 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <solution.Icon className="text-5xl text-white" />
                      </div>
                      <h3 className="font-extrabold text-xl md:text-2xl mb-4">{solution.title}</h3>
                      <p className="font-medium text-sm md:text-base text-gray-300 leading-relaxed">{solution.description}</p>
                    </div>
                  </SlideUp>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* 4️⃣ SERVICIOS - Fondo blanco */}
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 md:py-24 bg-white text-black">
          <AnimatedSection>
            <div className="max-w-[1500px] w-full px-5 2xl:px-0 flex flex-col items-center gap-16">
              <div className="text-center ">
                <SlideUp>
                  <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight mb-6">
                    {t('services_4_title')}
                  </h2>
                </SlideUp>
                <SlideUp>
                  <p className="font-medium text-lg md:text-xl text-gray-600 leading-relaxed">
                    {t('services_4_text')}
                  </p>
                </SlideUp>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    Icon: HiOutlineGlobeAlt,
                    title: t('services_4_card_1'),
                    features: [
                      t('services_4_card_1_feature_1'),
                      t('services_4_card_1_feature_2'),
                      t('services_4_card_1_feature_3'),
                      t('services_4_card_1_feature_4'),
                      t('services_4_card_1_feature_5'),
                      t('services_4_card_1_feature_6')
                    ],
                    ideal: t('services_4_card_1_ideal')
                  },
                  {
                    Icon: HiOutlineLightningBolt,
                    title: t('services_4_card_2'),
                    features: [
                      t('services_4_card_2_feature_1'),
                      t('services_4_card_2_feature_2'),
                      t('services_4_card_2_feature_3'),
                      t('services_4_card_2_feature_4'),
                      t('services_4_card_2_feature_5'),
                      t('services_4_card_2_feature_6')
                    ],
                    ideal: t('services_4_card_2_ideal')
                  },
                  {
                    Icon: HiOutlineCode,
                    title: t('services_4_card_3'),
                    features: [
                      t('services_4_card_3_feature_1'),
                      t('services_4_card_3_feature_2'),
                      t('services_4_card_3_feature_3'),
                      t('services_4_card_3_feature_4'),
                      t('services_4_card_3_feature_5'),
                      t('services_4_card_3_feature_6')
                    ],
                    ideal: t('services_4_card_3_ideal')
                  },
                  {
                    Icon: HiOutlineRefresh,
                    title: t('services_4_card_4'),
                    features: [
                      t('services_4_card_4_feature_1'),
                      t('services_4_card_4_feature_2'),
                      t('services_4_card_4_feature_3'),
                      t('services_4_card_4_feature_4'),
                      t('services_4_card_4_feature_5'),
                      t('services_4_card_4_feature_6')
                    ],
                    ideal: t('services_4_card_4_ideal')
                  }
                ].map((service, index) => (
                  <SlideUp key={index}>
                    <div className="flex flex-col bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:border-black hover:shadow-2xl h-full group">
                      <div className="bg-black text-white p-4 rounded-xl mb-6 inline-flex items-center justify-center w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <service.Icon className="text-4xl" />
                      </div>
                      <h3 className="font-extrabold text-2xl md:text-3xl mb-6">{service.title}</h3>
                      
                      <ul className="flex flex-col gap-3 mb-6 flex-grow">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                            <span className="font-medium text-sm md:text-base text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t-2 border-gray-200">
                        <p className="text-xs md:text-sm font-bold text-gray-500 mb-4">{service.ideal}</p>
                        <Button onClick={handleContactClick}>
                          {t('services_4_button')}
                        </Button>
                      </div>
                    </div>
                  </SlideUp>
                ))}
              </div>

              <SlideUp>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 md:p-10 text-center ">
                  <p className="font-bold text-xl md:text-2xl text-gray-800 mb-2">
                     {t('services_4_text_2')}
                  </p>
                  <p className="font-medium text-base md:text-lg text-gray-600 mb-3">
                    {t('services_4_text_3')}
                  </p>
                  <Button onClick={handleContactClick}>
                    {t('services_4_button_2')}
                  </Button>
                </div>
              </SlideUp>
            </div>
          </AnimatedSection>
        </div>

        {/* 5️⃣ POR QUÉ TRABAJAR CONTIGO - Fondo negro */}
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
          <AnimatedSection>
            <div className="max-w-[1500px] w-full px-5 2xl:px-0 flex flex-col items-center gap-16">
              <div className="text-center ">
                <SlideUp>
                  <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight mb-6">
                    {t('services_5_title')}
                  </h2>
                </SlideUp>
                <SlideUp>
                  <p className="font-medium text-lg md:text-xl text-gray-300 leading-relaxed">
                    {t('services_5_text')}
                  </p>
                </SlideUp>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {[
                  {
                    Icon: BsBriefcase,
                    title: t('services_5_card_1'),
                    description: t('services_5_card_1_description'),
                  },
                  {
                    Icon: BsBullseye,
                    title: t('services_5_card_2'),
                    description: t('services_5_card_2_description'),
                  },
                  {
                    Icon: FaHandshake,
                    title: t('services_5_card_3'),
                    description: t('services_5_card_3_description'),
                  },
                  {
                    Icon: BsChatDots,
                    title: t('services_5_card_4'),
                    description: t('services_5_card_4_description'),
                  }
                ].map((reason, index) => (
                  <SlideUp key={index}>
                    <div className="flex flex-col lg:flex-row items-start gap-6 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:border-white hover:scale-105 group h-[400px] xl:h-[300px]">
                      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-4 rounded-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <reason.Icon className="text-4xl text-white" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-2xl md:text-3xl mb-4">{reason.title}</h3>
                        <p className="font-medium text-base md:text-lg text-gray-300 leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  </SlideUp>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* 6️⃣ QUIÉN ERES - Fondo blanco mejorado */}
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white text-black">
          <AnimatedSection>
            <div className="max-w-[1500px] flex flex-col md:flex-row items-center gap-16 px-5 2xl:px-0">
              <SlideLeft>
                <div className="w-full md:w-2/5 flex justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 transform scale-105"></div>
                  <img 
                    src="/Icons/img1.webp" 
                    alt="Camilo Taborda" 
                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-black transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </SlideLeft>

              <SlideRight>
                <div className="w-full md:w-3/5 flex flex-col gap-8 text-center md:text-left">
                  <div>
                    <p className="text-sm md:text-base font-bold text-gray-500 mb-3 uppercase tracking-wider">
                    {t('services_about_me')}
                    </p>
                    <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                      {t('services_name')}
                    </h2>
                  </div>
                  
                  <div className="space-y-5">
                    <p className="font-medium text-lg md:text-xl leading-relaxed text-gray-700">
                      {t('services_text_1')}
                    </p>
                    <p className="font-medium text-lg md:text-xl leading-relaxed text-gray-700">
                      {t('services_text_2')} <span className="font-bold text-black">{t('services_text_2_span')}</span> {t('services_text_2_2')}
                    </p>
                    <p className="font-medium text-lg md:text-xl leading-relaxed text-gray-700">
                      {t('services_text_3')} <span className="font-bold text-black">{t('services_text_3_span')}</span>, {t('services_text_3_2')}
                    </p>
                  </div>

                  <div className="flex gap-6 justify-center md:justify-start pt-4">
                    <a 
                      href="https://www.linkedin.com/in/camilo-taborda-20724917a/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black text-white p-4 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-gray-800"
                    >
                      <img 
                        src="/Icons/linkedin.webp" 
                        alt="LinkedIn" 
                        className="w-8 h-8 filter invert brightness-200" 
                      />
                    </a>
                    <a 
                      href="https://github.com/CamiloTaborda" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black text-white p-4 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-gray-800"
                    >
                      <img 
                        src="/Icons/github.webp" 
                        alt="GitHub" 
                        className="w-8 h-8 filter invert brightness-200" 
                      />
                    </a>
                  </div>
                </div>
              </SlideRight>
            </div>
          </AnimatedSection>
        </div>

        {/* 7️⃣ CTA FINAL - Fondo negro con efecto especial */}
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen py-20 md:py-24 bg-black text-white overflow-hidden">
          {/* Efecto de fondo animado */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
          </div>

          <AnimatedSection>
            <div className="max-w-[1000px] flex flex-col items-center text-center gap-10 px-5 2xl:px-0 relative z-10">
              <SlideUp>
                <AiOutlineRocket className="text-7xl md:text-8xl text-white mb-4" />
              </SlideUp>

              <SlideUp>
                <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
                  {t('services_cta_title')}
                </h2>
              </SlideUp>

              <SlideUp>
                <p className="font-medium text-lg md:text-xl xl:text-2xl text-gray-300  leading-relaxed">
                  {t('services_cta_text')}
                </p>
              </SlideUp>

              <SlideUp>
                <div className="flex flex-col sm:flex-row mt-5">
                <Button onClick={handleContactClick}>
                <FaPhoneAlt size={16} />
                 {t('services_cta_button')}
                </Button>
                </div>
              </SlideUp>

              <SlideUp>
                <div className="flex flex-col md:flex-row items-center gap-8 mt-8 text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-medium">✓ {t('services_cta_1')}</span>
                  </div>
                  <div className="hidden md:block w-px h-6"><span>•</span></div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-medium">✓ {t('services_cta_2')}</span>
                  </div>
                  <div className="hidden md:block w-px h-6"><span>•</span></div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-base font-medium">✓ {t('services_cta_3')}</span>
                  </div>
                </div>
              </SlideUp>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </Layout>
  );
};

export default Servicios;