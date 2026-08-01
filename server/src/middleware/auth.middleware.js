import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import userModel from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const user = await userModel.findById(payload.id).select("-passwordHash");

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, "Invalid or expired token"));
  }
}
