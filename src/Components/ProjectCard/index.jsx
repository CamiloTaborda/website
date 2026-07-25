import { memo } from 'react';
import Video from "../../Components/Video";

const ProjectCard = memo(({ item, t }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-black transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">

    {/* Video limpio, sin caption encima */}
    <Video
      src={item.src}
      caption={item.caption}
      link={item.link}
      poster={item.img}
    />

    {/* Overlay — solo visible en hover */}
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
      
      {/* Título arriba */}
      <h4 className="text-white text-lg font-semibold tracking-wide">
        {item.caption}
      </h4>

      {/* Tools en el centro */}
      <div className="flex flex-wrap gap-2">
        {item.tools.map((tool, i) => (
          <span
            key={i}
            className="text-white/70 text-[10px] uppercase tracking-widest"
          >
            {tool}{i < item.tools.length - 1 && <span className="text-white/30 ml-2">·</span>}
          </span>
        ))}
      </div>

      {/* Botón abajo */}
      
        <a href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors"
      >
        {t("view_project") || "VIEW PROJECT"} →
      </a>

    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;