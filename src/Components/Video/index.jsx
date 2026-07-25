import { useState, useRef, useEffect, useCallback } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import AnimatedSection from "../../Animations/AnimatedSection";

// Margen de precarga: empezamos a bajar el video cuando está a 300px de entrar
// en pantalla, para que llegue listo sin descargar los 11 de golpe.
const PRELOAD_MARGIN = '300px';

const Video = ({ src, caption, link, poster }) => {
  const t = useCustomTranslation();
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // shouldLoad: hasta que no sea true, el <video> no tiene src y no pesa nada.
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Adjuntar el src solo cuando la tarjeta se acerca al viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Reproducir solo mientras está visible; pausar al salir para no gastar
  //    CPU ni batería con 11 videos corriendo a la vez.
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Si el navegador bloquea el autoplay, nos quedamos con el poster
          // y el botón de play. Sin reintentos: el usuario puede tocar.
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleCanPlay = useCallback(() => setIsReady(true), []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (video && video.paused) video.play().catch(() => {});
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    tryPlay();
  }, [tryPlay]);

  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const showSpinner = shouldLoad && !isReady;

  return (
    <div className="mb-6 w-full" ref={containerRef}>
      <AnimatedSection>
        {/* <a> real en vez de div+onClick: navegable por teclado, permite
            abrir en pestaña nueva con click central y no lo bloquea el popup blocker. */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={caption}
          className="block group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={tryPlay}
        >
          {/* Barra superior animada */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30"></div>

          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-10"></div>

          {/* Contenedor del video */}
          <div className="relative aspect-video overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={shouldLoad ? src : undefined}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              tabIndex={-1}
              aria-hidden="true"
              onCanPlay={handleCanPlay}
              onPlay={handlePlay}
              onPause={handlePause}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />

            {/* Spinner mientras baja el video (el poster ya se ve detrás) */}
            {showSpinner && (
              <div className="absolute bottom-3 left-3 z-20">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Overlay oscuro dinámico */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isPlaying ? 'bg-opacity-10' : 'bg-opacity-40'
              } bg-black`}
            ></div>

            {/* Icono de play mientras no reproduce */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-full group-hover:bg-opacity-100 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Indicador de enlace externo */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 z-20">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>

          {/* Información del proyecto */}
          <div className="relative p-5 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500">
                  {caption}
                </h3>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-xs text-slate-400 font-medium">{t('view_project')}</span>
                  <svg className="w-4 h-4 text-slate-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Badge de proyecto */}
              <div className="ml-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800 to-slate-700 group-hover:from-blue-900 group-hover:to-purple-900 text-slate-300 group-hover:text-blue-300 text-xs font-bold rounded-full transition-all duration-500 shadow-sm group-hover:shadow-md border border-slate-700 group-hover:border-blue-500">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('project_badge')}
                </span>
              </div>
            </div>
          </div>

          {/* Borde inferior con gradiente */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
      </AnimatedSection>
    </div>
  );
};

export default Video;
