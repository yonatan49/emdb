import awardModel from "../models/awardModel.js";
import movieAwardModel from "../models/movieAwardModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPagination, createPagedResponse } from "../services/search.service.js";

export const listAwards = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const [awards, total] = await Promise.all([
    awardModel.find({}).sort({ year: -1, name: 1 }).skip(skip).limit(limit),
    awardModel.countDocuments({}),
  ]);
  res.json(createPagedResponse({ data: awards, total, page, limit }));
});

export const createAward = asyncHandler(async (req, res) => {
  const award = await awardModel.create(req.body);
  res.status(201).json({ data: award });
});

export const listMovieAwards = asyncHandler(async (req, res) => {
  const awards = await movieAwardModel.find({ movieId: req.params.id }).populate("awardId movieId personId").sort({ year: -1 });
  res.json({ data: awards });
});

export const attachMovieAward = asyncHandler(async (req, res) => {
  const movieAward = await movieAwardModel.create({ ...req.body, movieId: req.params.id });
  res.status(201).json({ data: movieAward });
});

export const deleteMovieAward = asyncHandler(async (req, res) => {
  const movieAward = await movieAwardModel.findByIdAndDelete(req.params.id);
  if (!movieAward) throw new ApiError(404, "Movie award not found");
  res.json({ message: "Movie award deleted" });
});
