import { useState } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import { diplomasData } from "../../DiplomasData";

const PAGE = 16;

/**
 * Listado de certificados. Se muestra plegado por defecto: son 60 y desplegarlos
 * todos de entrada entierra el resto de la página.
 */
const Diplomas = () => {
  const t = useCustomTranslation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const toggle = () => {
    setOpen((v) => !v);
    setVisible(PAGE);
  };

  const shown = diplomasData.slice(0, visible);
  const hasMore = visible < diplomasData.length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
        <button type="button" onClick={toggle} className="btn-ghost-light" aria-expanded={open}>
          {open ? t('am_edu_hide') : t('am_edu_show')}
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-400 ease-smooth ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 12 12" fill="none" aria-hidden="true"
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="text-[0.8125rem] text-ink-400 tabular-nums">
          {diplomasData.length} {t('am_edu_count')} · {t('am_edu_platform')}
        </p>
      </div>

      {open && (
        <div className="mt-12 animate-fade-in">
          <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-white/[0.08]
                             py-4 transition-colors duration-400 ease-smooth hover:border-white/25"
                >
                  <span className="text-[0.9375rem] text-ink-300 transition-colors duration-400 group-hover:text-white">
                    {d.title}
                  </span>
                  <svg
                    className="h-3 w-3 flex-shrink-0 text-ink-500 transition-all duration-400 ease-smooth
                               group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    viewBox="0 0 12 12" fill="none" aria-hidden="true"
                  >
                    <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5v4" stroke="currentColor" strokeWidth="1.3"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setVisible((v) => Math.min(v + PAGE, diplomasData.length))}
                className="btn-ghost-light"
              >
                {t('am_edu_more')}
                <span className="tabular-nums text-ink-400">
                  {diplomasData.length - visible}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Diplomas;
