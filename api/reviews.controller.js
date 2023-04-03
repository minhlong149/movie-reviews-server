import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(request, response) {
    try {
      const { movie_id: movieId, review, name, user_id } = request.body;
      const userInfo = {
        name,
        _id: user_id,
      };
      const date = new Date();
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        review,
        date
      );
      response.json(reviewResponse).status(204);
      // response.json({ status: "success" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async apiUpdateReview(request, response) {
    try {
      const { review_id: reviewId, review, user_id: userId } = request.body;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        userId,
        review,
        date
      );

      if (reviewResponse.error) {
        response.json({ error: reviewResponse.error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review. User may not be original poster"
        );
      }
      
      response.json({ status: "success" });
      response.json(reviewResponse);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async apiDeleteReview(request, response) {
    try {
      const { review_id: reviewId, user_id: userId } = request.body;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      response.json(reviewResponse);
      // response.json({ status: "success" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
