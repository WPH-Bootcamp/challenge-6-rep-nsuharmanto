import React, { useRef } from 'react';
import type { SliderProps } from './Slider.interface';

const Slider: React.FC<SliderProps> = ({ movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
        aria-label="Scroll Left"
      >
        &#8592;
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-12 py-4 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {movies.map((movie, idx) => (
          <div
            key={movie.id}
            className="relative min-w-50 bg-neutral-900 rounded-xl shrink-0 text-white"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-xl mb-3"
            />
            <div className="absolute top-3 left-3 bg-neutral-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>
            <div className="font-semibold text-lg px-3">{movie.title}</div>
            <div className="flex items-center gap-1 px-3 pb-3 text-yellow-400">
              <span>★</span>
              <span className="text-white">{movie.rating}/10</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Slider;