import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// La pastilla blanca del filtro activo es un solo elemento (layoutId) que viaja
// de una categoría a otra con un spring sin rebote, en lugar de apagarse en una
// y encenderse en otra. Si se cambia de filtro a mitad del viaje, el spring
// sale desde donde está la pastilla en ese momento.
const PILL_SPRING = { type: 'spring', bounce: 0, duration: 0.4 };

const FilterCarousel = ({ categories, activeFilter, onFilterChange, label, counts }) => {
  const buttonRefs = useRef({});

  const handleClick = useCallback((id) => {
    onFilterChange(id);
    // En móvil la fila desborda: centramos el filtro elegido.
    buttonRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [onFilterChange]);

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
      <div
        role="tablist"
        aria-label={label}
        className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap"
      >
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              ref={(el) => (buttonRefs.current[cat.id] = el)}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleClick(cat.id)}
              className={`pressable relative flex-shrink-0 rounded-full border px-5 py-2.5 text-[0.875rem] ${
                isActive
                  ? 'border-transparent text-ink-700'
                  : 'border-white/12 text-ink-300 hover:border-white/30 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  transition={PILL_SPRING}
                  className="absolute inset-0 rounded-full bg-white"
                  aria-hidden="true"
                />
              )}
              <span className="relative">
                {cat.label}
                {counts?.[cat.id] != null && (
                  <span className={`ml-2 tabular-nums transition-colors duration-400 ${
                    isActive ? 'text-ink-400' : 'text-ink-500'
                  }`}>
                    {counts[cat.id]}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCarousel;
