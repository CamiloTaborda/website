import { useState, useRef, useEffect } from "react";

// Margen de precarga: empezamos a bajar el video cuando está a 300px de
// entrar en pantalla, para no descargar los 11 de golpe.
const PRELOAD_MARGIN = '300px';

/**
 * Reproductor perezoso, sin decoración: hasta que la tarjeta no se acerca al
 * viewport el <video> no tiene src y no pesa nada. Toda la capa visual
 * (títulos, overlays, enlaces) vive en ProjectCard.
 */
const Video = ({ src, poster, className = '' }) => {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // 1. Adjuntar el src solo cuando la tarjeta se acerca al viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: PRELOAD_MARGIN }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 2. Reproducir solo mientras está visible; pausar al salir para no gastar
  //    CPU ni batería con varios videos a la vez.
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Si el navegador bloquea el autoplay nos quedamos con el poster.
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
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
        onCanPlay={() => setReady(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-smooth ${
          ready ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};

export default Video;
