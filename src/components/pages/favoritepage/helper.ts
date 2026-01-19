type FavoriteMovie = {
  id: number;
  title: string;
  poster_path?: string;
  [key: string]: unknown; // jika ada properti lain yang tidak pasti
};

const FAV_KEY = "favorite_movies";

const getFavorites = (): FavoriteMovie[] => {
  const fav = localStorage.getItem(FAV_KEY);
  return fav ? JSON.parse(fav) as FavoriteMovie[] : [];
};

const addFavorite = (movie: FavoriteMovie) => {
  const favs = getFavorites();
  if (!favs.find((m) => m.id === movie.id)) {
    favs.push(movie);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }
};

const removeFavorite = (id: number) => {
  const favs = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
};

export { getFavorites, addFavorite, removeFavorite };