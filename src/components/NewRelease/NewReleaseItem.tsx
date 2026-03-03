import React from "react";
import { useNavigate } from "react-router-dom";
import type { NewReleaseItem as NewReleaseItemType } from "./newRelease.types";

type Props = {
  movie: NewReleaseItemType;
};

const NewReleaseItem: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="
        min-w-54 max-w-54 h-99.25 shrink-0 
        bg-black rounded-xl shadow-lg 
        cursor-pointer hover:scale-105 transition-transform duration-300
      "
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-72 object-cover rounded-xl"
        onClick={() => navigate(`/movie/${movie.id}`)}
        style={{ cursor: "pointer" }}
      />
      <div className="px-0 pt-3">
        <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1 mt-2 text-gray-300">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-sm">{movie.vote_average?.toFixed(1) || '-'}/10</span>
        </div>
      </div> 
    </div>  
  );
};

export default NewReleaseItem;