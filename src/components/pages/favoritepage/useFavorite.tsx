import { useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "./helper";

const useFavorite = () => {
  const [favorites, setFavorites] = useState<any[]>(getFavorites());

  const add = (movie: any) => {
    addFavorite(movie);
    setFavorites(getFavorites());
  };

  const remove = (id: number) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return { favorites, add, remove };
};

export default useFavorite;
