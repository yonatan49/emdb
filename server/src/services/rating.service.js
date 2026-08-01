import mongoose from "mongoose";
import movieModel from "../models/movieModel.js";
import ratingModel from "../models/ratingModel.js";

export async function recomputeMovieRating(movieId) {
  const [result] = await ratingModel.aggregate([
    { $match: { movieId: new mongoose.Types.ObjectId(movieId) } },
    { $group: { _id: "$movieId", averageRating: { $avg: "$score" }, ratingsCount: { $sum: 1 } } },
  ]);

  const averageRating = result ? Number(result.averageRating.toFixed(1)) : 0;
  const ratingsCount = result ? result.ratingsCount : 0;

  await movieModel.findByIdAndUpdate(movieId, { averageRating, ratingsCount });
  return { averageRating, ratingsCount };
}
