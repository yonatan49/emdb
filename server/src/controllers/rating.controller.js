import ratingModel from "../models/ratingModel.js";
import movieModel from "../models/movieModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { recomputeMovieRating } from "../services/rating.service.js";

export const upsertRating = asyncHandler(async (req, res) => {
  const score = Number(req.body.score);
  if (!Number.isInteger(score) || score < 1 || score > 10) throw new ApiError(400, "Score must be an integer from 1 to 10");

  const movie = await movieModel.findById(req.params.id);
  if (!movie) throw new ApiError(404, "Movie not found");

  const rating = await ratingModel.findOneAndUpdate(
    { movieId: req.params.id, userId: req.user._id },
    { score },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  );
  const summary = await recomputeMovieRating(req.params.id);

  res.json({ data: rating, movieRating: summary });
});

export const getMyRating = asyncHandler(async (req, res) => {
  const rating = await ratingModel.findOne({ movieId: req.params.id, userId: req.user._id });
  res.json({ data: rating });
});

export const deleteMyRating = asyncHandler(async (req, res) => {
  await ratingModel.findOneAndDelete({ movieId: req.params.id, userId: req.user._id });
  const summary = await recomputeMovieRating(req.params.id);
  res.json({ message: "Rating removed", movieRating: summary });
});
