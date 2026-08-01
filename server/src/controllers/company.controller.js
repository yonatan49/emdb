import companyModel from "../models/companyModel.js";
import movieModel from "../models/movieModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPagination, createPagedResponse } from "../services/search.service.js";

export const listCompanies = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const q = req.query.q?.trim();
  const filter = q ? { $or: [{ name: new RegExp(q, "i") }, { nameAmharic: new RegExp(q, "i") }] } : {};
  const [companies, total] = await Promise.all([
    companyModel.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    companyModel.countDocuments(filter),
  ]);
  res.json(createPagedResponse({ data: companies, total, page, limit }));
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await companyModel.findById(req.params.id);
  if (!company) throw new ApiError(404, "Company not found");
  const movies = await movieModel.find({ productionCompanyIds: company._id }).sort({ releaseDate: -1 });
  res.json({ data: company, movies });
});

export const createCompany = asyncHandler(async (req, res) => {
  const company = await companyModel.create(req.body);
  res.status(201).json({ data: company });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await companyModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!company) throw new ApiError(404, "Company not found");
  res.json({ data: company });
});

export const deleteCompany = asyncHandler(async (req, res) => {
  const company = await companyModel.findByIdAndDelete(req.params.id);
  if (!company) throw new ApiError(404, "Company not found");
  res.json({ message: "Company deleted" });
});
