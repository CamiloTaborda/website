import useCustomTranslation from "../../Hooks/useCustomTranslation";
import SlideUp from "../../Animations/SlideUp";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout";

const Contacto = () => {
  const t = useCustomTranslation();

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-between items-center w-full min-h-screen">
        {/* Primera sección: título y botón */}
        <div className="flex flex-col justify-center items-center bg-black text-white w-full h-auto mt-40 mb-10 px-4">
          <div className="flex flex-col justify-center mt-10 mb-10 items-center w-full h-auto text-center animate-slide-in-up">
            <h2 className="font-bold text-4xl mb-5">{t("tilte_contact")}</h2>
            <p className="font-medium max-w-3xl leading-relaxed">
              {t("description_contact")}
            </p>
          </div>
          <div className="animate-slide-in-up">
            <Button href="https://wa.me/+573052737622">{t("contact_me")}</Button>
          </div>
        </div>

        {/* Segunda sección: ubicación y contacto */}
        <div className="flex flex-col justify-center items-center w-full h-auto bg-white py-10">
          <div className="flex flex-col md:flex-row justify-center items-center md:gap-60 w-full px-4">
            {/* Sección de ubicación */}
            <div className="flex flex-col justify-center items-center mt-5 animate-slide-in-left">
              <img
                className="w-8 h-8 duration-200 transform hover:scale-110 mb-2"
                src="/Icons/ubicacion.png"
                alt="Ubicación"
              />
              <p className="font-medium max-w-xs leading-relaxed text-center">
                Medellín, Colombia
              </p>
            </div>
            {/* Sección de contacto */}
            <div className="flex flex-col justify-center items-center mt-5 animate-slide-in-right">
              <img
                className="w-8 h-8 duration-200 transform hover:scale-110 mb-2"
                src="/Icons/carta.png"
                alt="Email"
              />
              <p className="font-medium max-w-xs leading-relaxed text-center">
                camilotaborda2010@gmail.com
              </p>
              <p className="font-medium max-w-xs leading-relaxed text-center">
                www.camilotaborda.dev
              </p>
            </div>
          </div>

          {/* Contenedor de redes sociales */}
          <div className="flex gap-6 mt-6 mb-6 border-t border-black pt-4 w-full max-w-4xl justify-center bg-white">
            <a
              href="https://www.linkedin.com/in/camilo-taborda-20724917a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SlideUp>
              <img
                src="/Icons/linkedin.png"
                alt="LinkedIn"
                className="w-8 h-8 transition-transform duration-200 transform hover:scale-110 animate-slide-in-up"
              />
              </SlideUp>
            </a>
            <a
              href="https://github.com/CamiloTaborda"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SlideUp>
              <img
                src="/Icons/github.png"
                alt="GitHub"
                className="w-8 h-8 duration-200 transform hover:scale-110 animate-slide-in-up"
              />
              </SlideUp>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacto;
