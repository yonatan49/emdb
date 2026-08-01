import personModel from "../models/personModel.js";
import movieModel from "../models/movieModel.js";
import movieAwardModel from "../models/movieAwardModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPagination, createPagedResponse } from "../services/search.service.js";

export const searchPeople = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const q = req.query.q?.trim();
  const filter = q ? { $or: [{ name: new RegExp(q, "i") }, { nameAmharic: new RegExp(q, "i") }] } : {};
  const [people, total] = await Promise.all([
    personModel.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    personModel.countDocuments(filter),
  ]);
  res.json(createPagedResponse({ data: people, total, page, limit }));
});

export const getPerson = asyncHandler(async (req, res) => {
  const person = await personModel.findById(req.params.id);
  if (!person) throw new ApiError(404, "Person not found");
  res.json({ data: person });
});

export const getFilmography = asyncHandler(async (req, res) => {
  const personId = req.params.id;
  const movies = await movieModel
    .find({ $or: [{ "cast.personId": personId }, { "crew.personId": personId }] })
    .sort({ releaseDate: -1 });

  res.json({ data: movies });
});

export const getPersonAwards = asyncHandler(async (req, res) => {
  const awards = await movieAwardModel.find({ personId: req.params.id }).populate("awardId movieId personId").sort({ year: -1 });
  res.json({ data: awards });
});

export const createPerson = asyncHandler(async (req, res) => {
  const person = await personModel.create(req.body);
  res.status(201).json({ data: person });
});

export const updatePerson = asyncHandler(async (req, res) => {
  const person = await personModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!person) throw new ApiError(404, "Person not found");
  res.json({ data: person });
});

export const deletePerson = asyncHandler(async (req, res) => {
  const person = await personModel.findByIdAndDelete(req.params.id);
  if (!person) throw new ApiError(404, "Person not found");
  res.json({ message: "Person deleted" });
});
