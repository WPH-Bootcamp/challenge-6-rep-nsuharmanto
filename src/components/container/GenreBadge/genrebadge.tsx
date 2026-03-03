import React from "react";

type GenreBadgeProps = {
  genre: string;
};

const GenreBadge: React.FC<GenreBadgeProps> = ({ genre }) => (
  <span className="genre-badge">{genre}</span>
);

export default GenreBadge;
