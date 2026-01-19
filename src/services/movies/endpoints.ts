export const movieService = {
  getMovies: () => `/movie/popular?language=en-US&page=1`,
  getMovieDetail: (id: string | number) => `/movie/${id}`,
  getNowPlaying: (page = 1) => `/movie/now_playing?language=en-US&page=${page}`,
};