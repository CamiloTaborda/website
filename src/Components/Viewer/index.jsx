import '@google/model-viewer';
import { useEffect, useRef } from 'react';
import { isWebGLAvailable } from '../../Utils/webgl';

const MyModel = () => {
  const modelRef = useRef(null);
  // model-viewer crea su renderer fuera del ciclo de React, asi que un Error
  // Boundary no lo alcanza: hay que no montarlo si no hay WebGL.
  const supported = isWebGLAvailable();

  useEffect(() => {
    const model = modelRef.current;

    const handleMouseMove = (event) => {
      if (!model) return;
      
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      
      const orbitX = (x - 0.5) * 60;
      const orbitY = 75 - (y * 30);

      model.setAttribute('camera-orbit', `${orbitX}deg ${orbitY}deg 2.5m`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!supported) return null;

  return (
    // Fondo transparente: el color lo pone la seccion que lo contiene.
    <div className="w-full h-full">
      <model-viewer
        ref={modelRef}
        src="/3dModels/Bike.glb"
        alt="Modelo 3D interactivo de una bicicleta"
        auto-rotate
        loading="lazy"
        disable-zoom
        camera-orbit="0deg 75deg 2.5m"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      ></model-viewer>
    </div>
  );
};

export default MyModel;
