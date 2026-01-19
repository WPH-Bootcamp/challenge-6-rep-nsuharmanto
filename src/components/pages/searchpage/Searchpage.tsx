import useSearch from "./useSearch";
import { useNavigate } from "react-router-dom";

const Searchpage: React.FC = () => {
  const { query, setQuery, results, loading, error, search } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) search(query);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="px-4 py-2 rounded bg-[#222] text-white w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded text-white font-semibold"
        >
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-[#18181c] rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-2">
              <div className="text-white font-semibold text-sm truncate">{movie.title}</div>
              <div className="text-gray-400 text-xs">{movie.release_date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchpage;
