import { useRef, useCallback } from 'react';

const FilterCarousel = ({ categories, activeFilter, onFilterChange }) => {
  const filterButtonRefs = useRef({});

  const handleClick = useCallback((id) => {
    onFilterChange(id);
    filterButtonRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [onFilterChange]);

  return (
    <div className="relative w-full mb-16 px-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex md:justify-center gap-4 min-w-max md:min-w-0 md:flex-wrap pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => (filterButtonRefs.current[cat.id] = el)}
              onClick={() => handleClick(cat.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-full font-bold transition-all duration-300 border-2 ${
                activeFilter === cat.id
                  ? 'bg-black text-white border-black scale-105'
                  : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCarousel;