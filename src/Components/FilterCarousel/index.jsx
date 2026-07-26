import { useRef, useCallback } from 'react';

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
              className={`flex-shrink-0 rounded-full px-5 py-2.5 text-[0.875rem]
                          transition-all duration-400 ease-smooth ${
                isActive
                  ? 'bg-white text-ink-700'
                  : 'border border-white/12 text-ink-300 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
              {counts?.[cat.id] != null && (
                <span className={`ml-2 tabular-nums ${isActive ? 'text-ink-400' : 'text-ink-500'}`}>
                  {counts[cat.id]}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCarousel;
