const ImagePreview = ({ src, caption, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block group relative mb-10">
    <img
      src={src}
      alt={caption}
      className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105 duration-300"
    />
    <p className="mt-2 text-center text-black font-semibold">{caption}</p>
  </a>
);

export default ImagePreview;