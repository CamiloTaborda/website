import { useState } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import SlideUp from "../../Animations/SlideUp";
import Button from "../../Components/Button";
import Layout from "../../Components/Layout";

const Contacto = () => {
  const t = useCustomTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(t("sending"));

    try {
      const response = await fetch("https://formspree.io/f/mpwqrnzq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        setStatus(t("message_sent"));
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(t("message_not_sent"));
      }
    } catch (error) {
      setStatus(t("conection_error"));
    }
  };

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="flex flex-col justify-between items-center w-full mt-20 md:mt-0">
        {/* Primera sección: título y botón */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-10 bg-black text-white px-4 min-h-screen max-w-screen-xl mx-auto">
          {/* Sección de información */}
          <div className="flex flex-col justify-center items-center text-center w-full md:w-1/2 p-6 animate-slide-in-left">
            <h2 className="font-bold text-4xl mb-5">{t("tilte_contact")}</h2>
            <p className="font-medium max-w-3xl leading-relaxed">{t("description_contact")}</p>
            <div className="mt-6">
              <Button href="https://wa.me/+573052737622">{t("contact_me")}</Button>
            </div>
          </div>

          {/* Formulario */}
          <div className="w-full md:w-1/2 p-6 rounded-lg shadow-lg text-white animate-slide-in-right">
            <h3 className="font-bold text-4xl text-center mb-6">{t("form_title")}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t("form_name")}
                className="font-medium p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition duration-200"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("form_email")}
                className="font-medium p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition duration-200"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t("form_message")}
                className="font-medium p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition duration-200 resize-y min-h-[150px]"
              />

              {/* Contenedor flex para centrar el botón */}
              <div className="flex justify-center">
                <Button type="submit">{t("form_send")}</Button>
              </div>
            </form>
            {status && <p className="mt-4 text-center">{status}</p>}
          </div>
        </div>

        {/* Segunda sección: ubicación, contacto y formulario */}
        <div className="flex flex-col justify-center items-center w-full h-auto bg-white py-10">
          <div className="flex flex-col md:flex-row justify-center items-center md:gap-60 w-full px-4">
            {/* Sección de ubicación */}
            <div className="flex flex-col justify-center items-center mt-5 animate-slide-in-left">
              <img
                className="w-8 h-8 mb-2 transform hover:scale-110"
                src="/Icons/ubicacion.png"
                alt="Ubicación"
              />
              <p className="font-medium max-w-xs leading-relaxed text-center">Medellín, Colombia</p>
            </div>
            {/* Sección de contacto */}
            <div className="flex flex-col justify-center items-center mt-5 animate-slide-in-right">
              <img
                className="w-8 h-8 mb-2 transform hover:scale-110"
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
                  className="w-8 h-8 transform hover:scale-110"
                />
              </SlideUp>
            </a>
            <a href="https://github.com/CamiloTaborda" target="_blank" rel="noopener noreferrer">
              <SlideUp>
                <img
                  src="/Icons/github.png"
                  alt="GitHub"
                  className="w-8 h-8 transform hover:scale-110"
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
