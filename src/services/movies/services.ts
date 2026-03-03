import { api } from "../api";
import { movieService } from "./endpoints";

const getMoviesList = async (limit: number = 10) => {
  const response = await api.get(movieService.getMovies());
  // TMDB: response.data.results
  return {
    ...response.data,
    results: response.data.results.slice(0, limit),
  };
};

const getMovieDetail = async (id: string | number) => {
  const response = await api.get(movieService.getMovieDetail(id));
  return response.data;
};

const movieServices = {
  getMoviesList,
  getMovieDetail,
};

export default movieServices;