import movieServices from "../../../services/movies/services";
const getMovies = async (limit: number = 10) => {
  try {
      return await movieServices.getMoviesList(limit);
  } catch (error) {
      console.error(error);
      throw Error("Failed to fetch movies");
  }
};    
export { getMovies };