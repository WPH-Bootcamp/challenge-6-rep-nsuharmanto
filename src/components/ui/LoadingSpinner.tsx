import React from "react";

const LoadingSpinner: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <svg
      style={{ animation: "spin 2s linear infinite" }}
      width="60"
      height="60"
      viewBox="0 0 60 60"
    >
      <defs>
        <linearGradient id="netflix-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E50914" stopOpacity="1" />
          <stop offset="85%" stopColor="#E50914" stopOpacity="0.005" />
        </linearGradient>
      </defs>
      <circle
        cx="30"
        cy="30"
        r="24"
        fill="none"
        stroke="#222"
        strokeWidth="6"
        opacity="0.15"
      />
      <path
        d="M54 30a24 24 0 1 1-24-24"
        fill="none"
        stroke="url(#netflix-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
    <span className="mt-3 text-white text-base font-semibold">Loading...</span>
  </div>
);

export default LoadingSpinner;