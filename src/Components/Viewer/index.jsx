import '@google/model-viewer';

const MyModel = () => {
  return (
    <div className="w-full h-full bg-white">
      <model-viewer
        src="/public/3dModels/Bike.glb"
        alt="A 3D model"
        auto-rotate
        loading="lazy"
        disable-zoom
        camera-controls
        camera-orbit="0deg 75deg 2.5m" 
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </div>
  );
}

export default MyModel;
