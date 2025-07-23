import { useState, useRef, useEffect } from "react";
import AnimatedSection from "../../Animations/AnimatedSection";

const Video = ({ src, caption, link, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configuraciones adicionales para mejorar compatibilidad
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('autoplay', 'true');
    video.muted = true; // Esencial para autoplay
    video.loop = true;
    video.preload = 'auto'; // Cambiar a 'auto' para mejor reproducción

    // Función para intentar reproducir el video
    const playVideo = async () => {
      if (!video) return;
      
      try {
        // Asegurar que esté silenciado antes de reproducir
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
        
        // Intentar de nuevo después de un breve delay
        setTimeout(() => {
          playVideo();
        }, 500);
      }
    };

    // Eventos para manejar la carga y reproducción
    const handleLoadStart = () => {
      setIsLoaded(false);
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      setIsLoading(false);
      playVideo();
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      playVideo();
    };

    const handleLoadedMetadata = () => {
      setIsLoading(false);
      playVideo();
    };

    // Manejar cuando el video efectivamente empieza a reproducirse
    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      // Intentar reproducir de nuevo si se pausa
      setTimeout(() => {
        playVideo();
      }, 100);
    };

    const handleEnded = () => {
      // Asegurar que el loop funcione
      video.currentTime = 0;
      playVideo();
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    // Agregar todos los event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);

    // Intentar reproducir inmediatamente si el video ya está listo
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA
      setIsLoading(false);
      playVideo();
    }

    // Cleanup
    return () => {
      if (video) {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('waiting', handleWaiting);
      }
    };
  }, []);

  // Intersection Observer para reproducir cuando sea visible
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

  // Manejar click en el video/contenedor
  const handleVideoClick = async (e) => {
    e.preventDefault();
    
    const video = videoRef.current;
    
    // Primero intentar reproducir si no se está reproduciendo
    if (video && !isPlaying) {
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Could not play video:", error);
      }
    }
    
    // Abrir enlace después de un pequeño delay
    setTimeout(() => {
      window.open(link, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  // Manejar hover para desktop
  const handleMouseEnter = async () => {
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

  // Manejar touch events para dispositivos móviles
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

  // Componente Spinner
  const LoadingSpinner = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
    <div className="mt-3 text-sm text-gray-600 font-medium">Loading...</div>
  </div>
);


  return (
    <div className="mb-4 w-full overflow-hidden rounded-lg">
      <AnimatedSection>
        <div
          className="relative cursor-pointer group"
          onClick={handleVideoClick}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            autoPlay
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className={`w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              objectFit: 'cover',
              backgroundColor: 'transparent'
            }}
          />
          
          {/* Spinner de carga */}
          {isLoading && <LoadingSpinner />}
          
          {/* Overlay de play si el video no se está reproduciendo */}
          {!isPlaying && isLoaded && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg transition-opacity duration-300 group-hover:bg-opacity-20">
              <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-80 rounded-full">
                <svg
                  className="w-8 h-8 ml-1 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        <p className="font-medium leading-relaxed text-center text-black mt-3">
          {caption}
        </p>
      </AnimatedSection>
    </div>
  );
};

export default Video;