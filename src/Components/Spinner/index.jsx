import { useState, useEffect } from 'react';

// Un chunk cacheado llega en decenas de milisegundos. Si el indicador
// apareciera de inmediato, el usuario vería un parpadeo en cada navegación:
// esperamos a que la carga sea perceptible antes de mostrar nada.
const DELAY = 180;

/**
 * Indicador de carga de ruta. Deliberadamente discreto: una barra fina sobre
 * el borde superior, mientras la barra de navegación sigue visible y en su
 * sitio. El loader anterior tapaba la pantalla entera con tres puntos
 * rebotando, así que cada cambio de página parpadeaba en negro.
 */
const Spinner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Por encima del navbar (z-50) para que la barra nunca quede debajo */}
      <div
        className={`fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden bg-white/[0.06]
                    transition-opacity duration-300 ease-smooth ${
                      visible ? 'opacity-100' : 'opacity-0'
                    }`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="sr-only">Cargando</span>
        <div className="h-full w-2/5 origin-left rounded-full bg-accent-soft animate-loader-sweep" />
      </div>

      {/* Reserva el alto de una pantalla para que el footer no salte hacia
          arriba mientras el chunk de la ruta termina de bajar. */}
      <div className="min-h-[100svh] bg-ink" aria-hidden="true" />
    </>
  );
};

export default Spinner;
