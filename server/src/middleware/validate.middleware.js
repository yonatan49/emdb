import { ApiError } from "../utils/ApiError.js";

export function validateBody(requiredFields = []) {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => req.body[field] === undefined || req.body[field] === "");

    if (missingFields.length > 0) {
      throw new ApiError(400, "Missing required fields", { missingFields });
    }

    next();
  };
}
