import genreModel from "../models/genreModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const listGenres = asyncHandler(async (req, res) => {
  const genres = await genreModel.find({}).sort({ name: 1 });
  res.json({ data: genres });
});

export const createGenre = asyncHandler(async (req, res) => {
  const genre = await genreModel.create(req.body);
  res.status(201).json({ data: genre });
});

export const updateGenre = asyncHandler(async (req, res) => {
  const genre = await genreModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!genre) throw new ApiError(404, "Genre not found");
  res.json({ data: genre });
});

export const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await genreModel.findByIdAndDelete(req.params.id);
  if (!genre) throw new ApiError(404, "Genre not found");
  res.json({ message: "Genre deleted" });
});
