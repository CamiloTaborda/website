import AnimatedSection from "../../Animations/AnimatedSection";

const Video = ({ src, caption, link }) => {
    
    return (
      <div className="mb-4 w-full overflow-hidden rounded-lg">
        <AnimatedSection>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="w-full h-auto rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110" 
          />
        </a>
        <p className="font-medium leading-relaxed text-center text-black mt-3">{caption}</p>
        </AnimatedSection>
      </div>
    );
  };
  
  export default Video;
  