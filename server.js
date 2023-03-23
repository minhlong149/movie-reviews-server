import cors from "cors";
import express from "express";

import moviesRouter from "./api/movies.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", moviesRouter);

app.use("*", (request, response) =>
  res.status(404).json({ error: "not found" })
);

export default app;
