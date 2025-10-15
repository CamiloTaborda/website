import { useState } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import { diplomasData } from "../../DiplomasData";

const Diplomas = () => {
  const t = useCustomTranslation();
  const [showDiplomas, setShowDiplomas] = useState(false);
  const [visibleDiplomas, setVisibleDiplomas] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreDiplomas = () => {
    if (isLoading || visibleDiplomas >= diplomasData.length) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setVisibleDiplomas(prev => Math.min(prev + 12, diplomasData.length));
      setIsLoading(false);
    }, 500);
  };

  const toggleDiplomas = () => {
    setShowDiplomas(!showDiplomas);
    setVisibleDiplomas(12);
  };

  const diplomasToShow = diplomasData.slice(0, visibleDiplomas);
  const hasMoreDiplomas = visibleDiplomas < diplomasData.length;

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 text-black relative overflow-hidden">
      
      {/* Fondos decorativos */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-7xl px-4">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-full ">
              {t("Platzi")} Certified
            </span>
          </div>
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-6 leading-tight">
            {t("my_education")}
          </h1>
          <p className="text-base md:text-lg xl:text-xl 2xl:text-2xl max-w-3xl mx-auto leading-relaxed">
            {t("education_description_1")} 
            <a href="https://platzi.com" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-purple-600 transition-colors duration-300">
              {t("Platzi")}
            </a>, {t("education_description_2")}
          </p>
        </div>

        {/* Botón principal */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={toggleDiplomas}
            className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            <span className="relative flex items-center gap-3">
              {showDiplomas ? t("hide_certifications") : t("see_some_certifications")}
              <svg className={`w-5 h-5 transition-transform duration-300 ${showDiplomas ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Grid de diplomas */}
        {showDiplomas && (
          <div className="w-full">
            <div className="mb-8 text-center">
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3 ">
                {t("my_certificates")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-slate-500 mx-auto rounded-full"></div>
              
              {/* Contador de diplomas */}
              <div className="flex justify-center items-center gap-4 mt-4">
                <span className="px-4 py-2 bg-white text-gray-500 rounded-full text-sm font-semibold">
                  {diplomasToShow.length} de {diplomasData.length} certificados
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {diplomasToShow.map((diploma, index) => (
                <a
                  key={index}
                  href={diploma.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-slate-200"
                >
                  {/* Barra superior animada */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                  
                  <div className="relative p-6 flex flex-col items-center text-center h-full">
                    
                    {/* Icono de certificado */}
                    <div className="mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-2xl group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-500">
                        <svg className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors duration-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-500 leading-tight">
                      {diploma.title}
                    </h3>
                    
                    {/* Badge de certificado */}
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100 text-slate-700 group-hover:text-blue-700 text-xs font-bold rounded-full transition-all duration-500 shadow-sm group-hover:shadow-md">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Certificado
                      </span>
                    </div>

                    {/* Flecha indicadora */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Botón "Ver más" */}
            {hasMoreDiplomas && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMoreDiplomas}
                  disabled={isLoading}
                  className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-6 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-400 border-t-transparent"></div>
                        Cargando...
                      </>
                    ) : (
                      <>
                        Ver más certificados
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Diplomas;