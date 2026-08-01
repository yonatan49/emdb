import userModel from "../models/userModel.js";
import ratingModel from "../models/ratingModel.js";
import reviewModel from "../models/reviewModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPagination, createPagedResponse } from "../services/search.service.js";

export const getPublicProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).select("username fullName fullNameAmharic profilePicture bio location role isVerifiedCritic createdAt");
  if (!user) throw new ApiError(404, "User not found");

  const reviewCount = await reviewModel.countDocuments({ userId: user._id });
  res.json({ data: user, reviewCount });
});

export const updateMe = asyncHandler(async (req, res) => {
  const allowedFields = ["fullName", "fullNameAmharic", "profilePicture", "bio", "location", "preferredLanguage"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
  const user = await userModel.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select("-passwordHash");
  res.json({ data: user });
});

export const listMyRatings = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { userId: req.user._id };
  const [ratings, total] = await Promise.all([
    ratingModel.find(filter).populate("movieId", "title titleAmharic posterUrl slug averageRating").sort({ createdAt: -1 }).skip(skip).limit(limit),
    ratingModel.countDocuments(filter),
  ]);
  res.json(createPagedResponse({ data: ratings, total, page, limit }));
});

export const deleteMe = asyncHandler(async (req, res) => {
  await userModel.findByIdAndDelete(req.user._id);
  res.json({ message: "Account deleted" });
});
