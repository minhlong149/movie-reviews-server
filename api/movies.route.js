import express from "express";

import MoviesController from "./movies.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", MoviesController.apiGetMovies);

export default movieRouter;
