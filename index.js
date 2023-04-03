import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import app from "./server.js";

dotenv.config();

const port = process.env.PORT || 8000;
const uri = process.env.MOVIEREVIEWS_DB_URI;
const client = new MongoClient(uri);

(async function () {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
