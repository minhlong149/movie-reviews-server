import { ObjectId } from "mongodb";

let reviews;

export default class ReviewsDAO {
  static async injectDB(client) {
    try {
      const database = await client.db(process.env.MOVIEREVIEWS_NS);
      reviews = database.collection("reviews");
    } catch (error) {
      console.error(
        `unable to establish connection handle in reviewDAO: ${error}`
      );
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const doc = {
        name: user.name,
        user_id: user._id,
        date,
        review,
        movie_id: new ObjectId(movieId),
      };
      const result = await reviews.insertOne(doc);
      return result;
    } catch (error) {
      console.error(`unable to post review: ${error}`);
      return { error };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      const filter = { _id: new ObjectId(reviewId), user_id: userId };
      const updateDoc = { $set: { review, date } };
      const result = await reviews.updateOne(filter, updateDoc);
      return result;
    } catch (error) {
      console.error(`unable to update review: ${error}`);
      return { error };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const query = {
        _id: new ObjectId(reviewId),
        user_id: userId,
      };
      const result = await reviews.deleteOne(query);
      return result;
    } catch (error) {
      console.error(`unable to delete review: ${error}`);
      return { error };
    }
  }
}
