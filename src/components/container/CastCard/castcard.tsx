import React from "react";

type CastCardProps = {
  name: string;
  role: string;
  image?: string;
};

const CastCard: React.FC<CastCardProps> = ({ name, role, image }) => (
  <div className="cast-card">
    {image ? (
      <img src={image} alt={name} className="cast-avatar" />
    ) : (
      <div className="cast-avatar placeholder" />
    )}
    <div>
      <div className="cast-name">{name}</div>
      <div className="cast-role">{role}</div>
    </div>
  </div>
);

export default CastCard;
