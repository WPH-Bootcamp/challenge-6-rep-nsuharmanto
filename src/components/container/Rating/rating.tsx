import React from "react";

type RatingProps = {
  value: number;
};

const Rating: React.FC<RatingProps> = ({ value }) => (
  <div className="rating">
    <span role="img" aria-label="star">⭐</span>
    <span>{value}</span>
  </div>
);

export default Rating;
