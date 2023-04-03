import express from "express";

import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", MoviesController.apiGetMovies);

movieRouter
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

movieRouter.get("/id/:id", MoviesController.apiGetMovieById);
movieRouter.get("/ratings", MoviesController.apiGetRatings);

export default movieRouter;
