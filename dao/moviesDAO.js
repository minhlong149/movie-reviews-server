let movies;

export default class MoviesDAO {
  static async injectDB(client) {
    try {
      const database = await client.db(process.env.MOVIEREVIEWS_NS);
      movies = database.collection("movies");
    } catch (error) {
      console.error(`Unable to connect in MoviesDAO: ${error}`);
    }
  }

  static async getMovies(option = {}) {
    try {
      const { filters = {}, page = 0, moviesPerPage = 20 } = option;
      const query = filters.hasOwnProperty("title")
        ? { $text: { $search: filters["title"] } }
        : filters.hasOwnProperty("rated")
        ? { rated: { $eq: filters["rated"] } }
        : {};

      const cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}
