import { useState, useRef, useEffect } from "react";
import AnimatedSection from "../../Animations/AnimatedSection";

const Video = ({ src, caption, link, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configuraciones del video
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.muted = true;
    video.loop = true;
    video.preload = 'auto';

    const playVideo = async () => {
      if (!video) return;
      
      try {
        video.muted = true;
        video.volume = 0;
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.log("Autoplay attempt failed:", error);
        setIsPlaying(false);
        
        setTimeout(() => {
          playVideo();
        }, 500);
      }
    };

    // Event listeners
    const handleLoadStart = () => {
      setIsLoaded(false);
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      setIsLoading(false);
      playVideo();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setTimeout(() => {
        playVideo();
      }, 100);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    // Agregar event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);

    // Intentar reproducir si está listo
    if (video.readyState >= 3) {
      setIsLoading(false);
      playVideo();
    }

    return () => {
      if (video) {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('waiting', handleWaiting);
      }
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideoWhenVisible = async () => {
      if (!video) return;
      
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Play on visibility failed:", error);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideoWhenVisible();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Manejar click
  const handleVideoClick = async (e) => {
    e.preventDefault();
    
    const video = videoRef.current;
    
    if (video && !isPlaying) {
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Could not play video:", error);
      }
    }
    
    setTimeout(() => {
      window.open(link, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  // Manejar hover
  const handleMouseEnter = async () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video && !isPlaying) {
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        // Silently handle autoplay restrictions
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Manejar touch
  const handleTouchStart = async () => {
    const video = videoRef.current;
    if (video && !isPlaying) {
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Touch play failed:", error);
      }
    }
  };

  // Spinner de carga mejorado
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl z-20">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-400 font-medium">Cargando proyecto...</div>
    </div>
  );

  return (
    <div className="mb-6 w-full">
      <AnimatedSection>
        <div
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-slate-700"
          onClick={handleVideoClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          {/* Barra superior animada */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30"></div>
          
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-10"></div>

          {/* Contenedor del video */}
          <div className="relative aspect-video overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
            
            {/* Spinner de carga */}
            {isLoading && <LoadingSpinner />}
            
            {/* Overlay oscuro dinámico */}
            <div className={`absolute inset-0 transition-all duration-500 ${
              isPlaying ? 'bg-opacity-10' : 'bg-opacity-40'
            } bg-black`}></div>

            {/* Icono de play/link */}
            {!isPlaying && isLoaded && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="transform transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-full group-hover:bg-opacity-100 transition-all duration-500 group-hover:scale-110">
                      <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
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
                  <span className="text-xs text-slate-400 font-medium">Ver proyecto</span>
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
                  Proyecto
                </span>
              </div>
            </div>
          </div>

          {/* Borde inferior con gradiente */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Video;