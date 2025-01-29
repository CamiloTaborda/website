import { useState } from "react";
import { useTranslation } from "react-i18next";

const diplomasData = [
  { title: 'Asincronismo con JavaScript', href: '/Diplomas/diploma-asincronismo-js.pdf' },
  { title: 'EscmaScript 6', href: '/Diplomas/diploma-ecmascript-6.pdf' },
  { title: 'Frontend Developer Practico', href: '/Diplomas/diploma-frontend-developer-practico.pdf' },
  { title: 'Frontend Developer', href: '/Diplomas/diploma-frontend-developer.pdf' },
  { title: 'Git y Github', href: '/Diplomas/diploma-git-github.pdf' },
  { title: 'HTML Practico', href: '/Diplomas/diploma-html-practico.pdf' },
  { title: 'POO JS', href: '/Diplomas/diploma-javascript-poo.pdf' },
  { title: 'Javascript Practico', href: '/Diplomas/diploma-javascript-practico.pdf' },
  { title: 'React practico', href: '/Diplomas/diploma-react-vite-tailwindcss.pdf' },
  { title: 'React', href: '/Diplomas/diploma-react.pdf' },
  { title: 'Vite js', href: '/Diplomas/diploma-vitejs.pdf' },
  { title: 'Manipulación de Arrays', href: '/Diplomas/diploma-arrays.pdf' },
];

const Diplomas = () => {
  const { t } = useTranslation();
  const [showDiplomas, setShowDiplomas] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const toggleDiplomas = () => {
    if (showDiplomas) {
      setAnimationClass('animate-curtain-close');
      setTimeout(() => {
        setShowDiplomas(false);
        setAnimationClass('');
      }, 500);
    } else {
      setShowDiplomas(true);
      setAnimationClass('animate-curtain-open');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto py-16 bg-white text-black">
      <h1 className="font-bold text-3xl mb-8">{t("my_education")}</h1>
      <p className="font-medium text-center max-w-md leading-relaxed mb-10">
        {t("education_description_1")} <a href="https://platzi.com" target="_blank" rel="noopener noreferrer" className="font-bold">{t("Platzi")}</a>, {t("education_description_2")}
      </p>
      <div onClick={toggleDiplomas} className="flex flex-col items-center cursor-pointer text-black font-semibold mb-5">
      <span>{showDiplomas ? t("hide_certifications") : t("see_some_certifications")}</span>
        <img
          src={`/Icons/${showDiplomas ? "punta-de-flecha-hacia-arriba.png" : "flecha-hacia-abajo-para-navegar.png"}`}
          alt="Flecha"
          className="w-6 h-6 mt-1 mb-5"
        />
      </div>
      {showDiplomas && (
        <div className={`flex flex-col items-center mb-10 p-8 bg-black rounded-lg shadow-xl ${animationClass}`}>
          <h2 className="font-bold text-3xl text-white mb-6 text-center">{t("my_certificates")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {diplomasData.map((diploma, index) => (
              <a
                key={index}
                href={diploma.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 border border-transparent rounded-lg transition-all duration-300 bg-[#191919] hover:bg-gray-700 shadow-md transform hover:scale-105 hover:shadow-lg"
              >
                <span className="font-medium text-center text-white leading-relaxed">{diploma.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diplomas;
