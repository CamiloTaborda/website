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
    <div className="w-full h-full bg-white">
      <model-viewer
        ref={modelRef}
        src="/3dModels/Bike.glb"
        alt="A 3D model"
        auto-rotate
        loading="lazy"
        disable-zoom
        camera-orbit="0deg 75deg 2.5m"
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </div>
  );
};

export default MyModel;
