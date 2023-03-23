import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(request, response) {
    const { moviesPerPage = 20, page = 0, rated, title } = request.query;

    let filters = {};
    rated && (filters.rated = rated);
    title && (filters.title = title);

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    const moviesResponse = {
      movies: moviesList,
      page,
      filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    return response.json(moviesResponse);
  }
}
