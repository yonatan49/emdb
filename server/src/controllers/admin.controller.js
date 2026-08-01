import userModel from "../models/userModel.js";
import movieModel from "../models/movieModel.js";
import reviewModel from "../models/reviewModel.js";
import awardModel from "../models/awardModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getStats = asyncHandler(async (req, res) => {
  const [users, movies, reviews, awards] = await Promise.all([
    userModel.countDocuments({}),
    movieModel.countDocuments({}),
    reviewModel.countDocuments({}),
    awardModel.countDocuments({}),
  ]);

  res.json({ data: { users, movies, reviews, awards } });
});

export const listPendingReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewModel.find({ isApproved: false }).populate("movieId userId").sort({ createdAt: -1 });
  res.json({ data: reviews });
});

export const approveReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  if (!review) throw new ApiError(404, "Review not found");
  res.json({ data: review });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role, isVerifiedCritic } = req.body;
  if (role && !["user", "critic", "admin"].includes(role)) throw new ApiError(400, "Invalid role");

  const updates = {};
  if (role) updates.role = role;
  if (isVerifiedCritic !== undefined) updates.isVerifiedCritic = isVerifiedCritic;

  const user = await userModel.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select("-passwordHash");
  if (!user) throw new ApiError(404, "User not found");
  res.json({ data: user });
});
