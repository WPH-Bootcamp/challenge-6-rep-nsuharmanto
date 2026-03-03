import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const fetchTrendingMovies = async () => {
  const res = await api.get("/trending/movie/week");
  return res.data.results.slice(0, 15);
};

const TrendingMovieSlider: React.FC = () => {
  const { data: movies = [], isLoading, error } = useQuery<Movie[]>({
    queryKey: ["trending-movies"],
    queryFn: fetchTrendingMovies,
    refetchInterval: 1000 * 60 * 5, // fetch ulang setiap 5 menit
  });

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        setIsFirstVisible(sliderRef.current.scrollLeft <= 5);
      }
    };
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (slider) slider.removeEventListener("scroll", handleScroll);
    };
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = 216 + 34;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full px-20">
      <div className="pointer-events-none absolute inset-y-0 left-20 w-15 bg-black z-30"></div>
      <div className="pointer-events-none absolute inset-y-0 right-15 w-70 bg-linear-to-l from-black via-black/35 to-black/5 z-20 blur-sm"></div>
      <h2 className="text-neutral-50 font-bold leading-relaxed text-left px-10 mb-6 md:px-15 md:mb-7"
        style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>
        Trending Now
      </h2>
      <div className="relative">
        {isLoading && (
          <div className="flex items-center justify-center min-h-75">
            <LoadingSpinner />
          </div>
        )}
        {error && <div className="text-red-500 p-6">Failed to fetch trending movies</div>}
        {!isLoading && !error && (
          <>
            {!isFirstVisible && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 cursor-pointer"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <div
              ref={sliderRef}
              className="flex gap-8.5 overflow-x-auto scroll-smooth px-6 md:px-15 md:pt-3 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {movies.map((movie, idx) => (
                <div
                  key={movie.id}
                  className="min-w-54 max-w-54 h-99.25 shrink-0 bg-black rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    <img
                      src={
                        movie.poster_path
                          ? `${IMAGE_BASE_URL}${movie.poster_path}`
                          : "/images/placeholder.jpg"
                      }
                      alt={movie.title}
                      className="w-full h-72 object-cover rounded-xl"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                    <span className="absolute top-3 left-3 bg-gray-900/80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg cursor-pointer ">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="px-0 pt-3">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center gap-1 mt-2 text-gray-300">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-sm">{movie.vote_average.toFixed(1)}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 cursor-pointer"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingMovieSlider;