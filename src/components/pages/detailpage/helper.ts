import movieServices from "../../../services/movies/services";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const getMovieDetail = async (id: string | number) => {
  try {
    const detail = await movieServices.getMovieDetail(id);
    const creditsRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return {
      ...detail,
      credits: creditsRes.data,
    };
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch movie detail");
  }
};

export { getMovieDetail };