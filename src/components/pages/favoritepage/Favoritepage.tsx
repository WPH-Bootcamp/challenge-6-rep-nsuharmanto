import useFavorite from "./useFavorite";

const Favoritepage: React.FC = () => {
  const { favorites, remove } = useFavorite();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 && <div>No favorite movies yet.</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {favorites.map((movie: any) => (
          <div key={movie.id} className="bg-[#18181c] rounded-lg overflow-hidden shadow-md">
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
              <button
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs"
                onClick={() => remove(movie.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritepage;
