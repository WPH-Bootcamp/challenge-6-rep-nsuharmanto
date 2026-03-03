import movieServices from "../../../services/movies/services";

const searchMovies = async (query: string) => {
  try {
    return await movieServices.searchMovies(query);
  } catch (error) {
    console.error(error);
    throw Error("Failed to search movies");
  }
};

export { searchMovies };
