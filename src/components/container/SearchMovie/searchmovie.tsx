import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="relative md:ml-auto w-full max-w-60" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Movie"
        className="bg-[#23232b] text-white rounded-xl pl-10 pr-4 py-2 w-full placeholder-gray-400 focus:outline-none"
        style={{ minWidth: '120px', maxWidth: '243px' }}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-label="Search"
      >
        <svg
          style={{ cursor: 'pointer' }}
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M20 20l-3-3"
          />
        </svg>
      </button>
    </form>
  );
};
export default SearchMovie;