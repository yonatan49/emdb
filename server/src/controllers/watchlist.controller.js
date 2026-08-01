import watchlistModel from "../models/watchlistModel.js";
import movieModel from "../models/movieModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const listWatchlist = asyncHandler(async (req, res) => {
  const items = await watchlistModel.find({ userId: req.user._id }).populate("movieId").sort({ addedAt: -1 });
  res.json({ data: items });
});

export const addToWatchlist = asyncHandler(async (req, res) => {
  const { movieId, status } = req.body;
  const movie = await movieModel.findById(movieId);
  if (!movie) throw new ApiError(404, "Movie not found");

  const item = await watchlistModel.findOneAndUpdate(
    { userId: req.user._id, movieId },
    { status: status || "want_to_watch", addedAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  );
  res.status(201).json({ data: item });
});

export const updateWatchlistItem = asyncHandler(async (req, res) => {
  const item = await watchlistModel.findOneAndUpdate(
    { userId: req.user._id, movieId: req.params.movieId },
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!item) throw new ApiError(404, "Watchlist item not found");
  res.json({ data: item });
});

export const removeWatchlistItem = asyncHandler(async (req, res) => {
  await watchlistModel.findOneAndDelete({ userId: req.user._id, movieId: req.params.movieId });
  res.json({ message: "Watchlist item removed" });
});
