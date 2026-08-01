import mongoose from "mongoose";
import movieModel from "../models/movieModel.js";
import episodeModel from "../models/episodeModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPagination, createPagedResponse } from "../services/search.service.js";

function buildMovieFilter(query) {
  const filter = {};
  if (query.genre) filter.genreIds = query.genre;
  if (query.type) filter.type = query.type;
  if (query.language) filter.languages = query.language;
  if (query.minRating) filter.averageRating = { $gte: Number(query.minRating) };
  if (query.year) {
    const start = new Date(`${query.year}-01-01T00:00:00.000Z`);
    const end = new Date(`${Number(query.year) + 1}-01-01T00:00:00.000Z`);
    filter.releaseDate = { $gte: start, $lt: end };
  }
  return filter;
}

export const listMovies = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = buildMovieFilter(req.query);
  const [movies, total] = await Promise.all([
    movieModel.find(filter).sort({ releaseDate: -1, createdAt: -1 }).skip(skip).limit(limit),
    movieModel.countDocuments(filter),
  ]);

  res.json(createPagedResponse({ data: movies, total, page, limit }));
});

export const searchMovies = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const q = req.query.q?.trim();
  const filter = q ? { $text: { $search: q } } : {};
  const projection = q ? { score: { $meta: "textScore" } } : {};
  const sort = q ? { score: { $meta: "textScore" } } : { createdAt: -1 };

  const [movies, total] = await Promise.all([
    movieModel.find(filter, projection).sort(sort).skip(skip).limit(limit),
    movieModel.countDocuments(filter),
  ]);

  res.json(createPagedResponse({ data: movies, total, page, limit }));
});

export const trendingMovies = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const movies = await movieModel.find({ ratingsCount: { $gt: 0 } }).sort({ averageRating: -1, ratingsCount: -1 }).limit(limit);
  res.json({ data: movies });
});

export const newReleases = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const movies = await movieModel.find({}).sort({ releaseDate: -1, createdAt: -1 }).limit(limit);
  res.json({ data: movies });
});

export const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel
    .findById(req.params.id)
    .populate("genreIds productionCompanyIds cast.personId crew.personId");

  if (!movie) throw new ApiError(404, "Movie not found");
  res.json({ data: movie });
});

export const similarMovies = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.id);
  if (!movie) throw new ApiError(404, "Movie not found");

  const movies = await movieModel
    .find({ _id: { $ne: movie._id }, genreIds: { $in: movie.genreIds } })
    .sort({ averageRating: -1 })
    .limit(10);

  res.json({ data: movies });
});

export const createMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.create(req.body);
  res.status(201).json({ data: movie });
});

export const updateMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!movie) throw new ApiError(404, "Movie not found");
  res.json({ data: movie });
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.findByIdAndDelete(req.params.id);
  if (!movie) throw new ApiError(404, "Movie not found");
  res.json({ message: "Movie deleted" });
});

export const listEpisodes = asyncHandler(async (req, res) => {
  const episodes = await episodeModel.find({ seriesId: req.params.movieId }).sort({ seasonNumber: 1, episodeNumber: 1 });
  res.json({ data: episodes });
});

export const getEpisode = asyncHandler(async (req, res) => {
  const episode = await episodeModel.findById(req.params.id);
  if (!episode) throw new ApiError(404, "Episode not found");
  res.json({ data: episode });
});

export const createEpisode = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.movieId);
  if (!movie) throw new ApiError(404, "Series not found");
  if (movie.type !== "series") throw new ApiError(400, "Episodes can only be added to series");

  const episode = await episodeModel.create({ ...req.body, seriesId: new mongoose.Types.ObjectId(req.params.movieId) });
  res.status(201).json({ data: episode });
});

export const updateEpisode = asyncHandler(async (req, res) => {
  const episode = await episodeModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!episode) throw new ApiError(404, "Episode not found");
  res.json({ data: episode });
});

export const deleteEpisode = asyncHandler(async (req, res) => {
  const episode = await episodeModel.findByIdAndDelete(req.params.id);
  if (!episode) throw new ApiError(404, "Episode not found");
  res.json({ message: "Episode deleted" });
});
