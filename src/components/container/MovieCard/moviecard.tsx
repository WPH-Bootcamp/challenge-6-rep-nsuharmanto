import React from "react";
import GenreBadge from "../GenreBadge/genrebadge";
import Rating from "../Rating/rating";

type MovieCardProps = {
  title: string;
  image?: string;
  rating?: number;
  genre?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  image,
  rating,
  genre,
  onClick,
  variant = "default",
}) => (
  <div className={`movie-card ${variant}`} onClick={onClick}>
    {image ? (
      <img src={image} alt={title} className="movie-card-img" />
    ) : (
      <div className="movie-card-img placeholder" />
    )}
    <div className="movie-card-info">
      <h3>{title}</h3>
      {genre && <GenreBadge genre={genre} />}
      {rating !== undefined && <Rating value={rating} />}
    </div>
  </div>
);

export default MovieCard;
