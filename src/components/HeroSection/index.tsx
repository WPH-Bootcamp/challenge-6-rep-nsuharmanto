import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import PlayIcon from "../../assets/icons/play.svg";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const fetchTrendingMovie = async () => {
  const res = await api.get("/trending/movie/week");
  return res.data.results?.[0];
};

const HeroSection: React.FC = () => {
  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["hero-movie"],
    queryFn: fetchTrendingMovie,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  if (isError || !movie)
    return (
      <div className="h-202.5 flex items-center justify-center bg-black text-red-500">
        Failed to fetch hero movie.
      </div>
    );

  return (
    <section
      className="relative w-full h-202.5 flex items-center"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/0 via-transparent to-black"></div>
      <div className="relative z-10 px-10 md:px-35 max-w-2xl">
        <h1 className="text-white font-bold text-4xl md:text-5xl mb-6">
          {movie.title}
        </h1>
        <p className="text-neutral-200 text-lg mb-8">{movie.overview}</p>
        <div className="flex gap-6">
          <Button
            className="cursor-pointer"
            variant="primary"
            onClick={() =>
              window.open(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(
                  movie.title + " trailer"
                )}`,
                "_blank"
              )
            }
            icon={<img src={PlayIcon} alt="Play" width={24} height={24} />}
          >
            Watch Trailer
          </Button>
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={() => (window.location.href = `/movie/${movie.id}`)}
          >
            See Detail
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;