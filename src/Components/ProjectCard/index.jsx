import { memo } from 'react';
import Video from "../Video";

/**
 * Tarjeta de proyecto: el video manda y la información va debajo, sin overlays
 * que compitan. En reposo se ve el poster; al pasar el cursor la imagen se
 * acerca ligeramente y aparece la flecha.
 */
const ProjectCard = memo(({ item, t }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${item.caption} — ${t('pf_open')}`}
    className="group block focus:outline-none"
  >
    {/* Marco del video. 21:10 se aproxima a la proporción que quedó tras
        recortar las franjas negras de las grabaciones (~2,1:1), así que
        object-cover apenas tiene que recortar nada de la interfaz. */}
    <div className="relative aspect-[21/10] overflow-hidden rounded-3xl bg-ink-800
                    ring-1 ring-white/10 transition-all duration-600 ease-smooth
                    group-hover:ring-white/25
                    group-focus-visible:ring-2 group-focus-visible:ring-accent-soft">
      <div className="absolute inset-0 transition-transform duration-800 ease-smooth group-hover:scale-[1.04]">
        <Video src={item.src} poster={item.img} />
      </div>

      {/* Velo inferior muy tenue: asienta la imagen sin ensuciarla */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24
                      bg-gradient-to-t from-black/40 to-transparent
                      opacity-0 transition-opacity duration-600 ease-smooth
                      group-hover:opacity-100" />

      {/* Flecha de salida */}
      <div className="pointer-events-none absolute right-5 top-5 flex h-9 w-9 items-center justify-center
                      rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20
                      opacity-0 translate-y-1 transition-all duration-500 ease-smooth
                      group-hover:opacity-100 group-hover:translate-y-0">
        <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M4 10L10 4M10 4H5M10 4v5" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {/* Información */}
    <div className="mt-6 px-1">
      <h3 className="text-display-sm text-white transition-colors duration-400 ease-smooth">
        {item.caption}
      </h3>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-400">
        {item.tools.join(' · ')}
      </p>
    </div>
  </a>
));

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
