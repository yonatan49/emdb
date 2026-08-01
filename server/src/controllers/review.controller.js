import reviewModel from "../models/reviewModel.js";
import movieModel from "../models/movieModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPagination, createPagedResponse } from "../services/search.service.js";

export const listMovieReviews = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { movieId: req.params.id };
  const [reviews, total] = await Promise.all([
    reviewModel.find(filter).populate("userId", "username fullName profilePicture role isVerifiedCritic").sort({ createdAt: -1 }).skip(skip).limit(limit),
    reviewModel.countDocuments(filter),
  ]);
  res.json(createPagedResponse({ data: reviews, total, page, limit }));
});

export const createReview = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.id);
  if (!movie) throw new ApiError(404, "Movie not found");

  const review = await reviewModel.create({ ...req.body, movieId: req.params.id, userId: req.user._id });
  res.status(201).json({ data: review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) throw new ApiError(404, "Review not found");
  if (!review.userId.equals(req.user._id) && req.user.role !== "admin") throw new ApiError(403, "You can only edit your own review");

  Object.assign(review, req.body);
  await review.save();
  res.json({ data: review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) throw new ApiError(404, "Review not found");
  if (!review.userId.equals(req.user._id) && req.user.role !== "admin") throw new ApiError(403, "You can only delete your own review");

  await review.deleteOne();
  res.json({ message: "Review deleted" });
});

export const likeReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findByIdAndUpdate(req.params.id, { $inc: { likesCount: 1 } }, { new: true });
  if (!review) throw new ApiError(404, "Review not found");
  res.json({ data: review });
});

export const listUserReviews = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { userId: req.params.id };
  const [reviews, total] = await Promise.all([
    reviewModel.find(filter).populate("movieId", "title titleAmharic posterUrl slug").sort({ createdAt: -1 }).skip(skip).limit(limit),
    reviewModel.countDocuments(filter),
  ]);
  res.json(createPagedResponse({ data: reviews, total, page, limit }));
});
