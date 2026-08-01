import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

function sanitizeUser(user) {
  const userObject = user.toObject ? user.toObject() : user;
  delete userObject.passwordHash;
  return userObject;
}

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, fullName, fullNameAmharic, preferredLanguage } = req.body;

  const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(409, "Username or email is already in use");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await userModel.create({ username, email, passwordHash, fullName, fullNameAmharic, preferredLanguage });
  const token = signToken(user);

  res.status(201).json({ user: sanitizeUser(user), token });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken(user);
  res.json({ user: sanitizeUser(user), token });
});

export const logout = asyncHandler(async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const refresh = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) throw new ApiError(400, "Token is required");

  const payload = jwt.verify(token, env.jwtSecret);
  const user = await userModel.findById(payload.id);
  if (!user) throw new ApiError(401, "User no longer exists");

  res.json({ token: signToken(user), user: sanitizeUser(user) });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();
  }

  res.json({ message: "If that email exists, a reset token has been generated" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) throw new ApiError(400, "Token and password are required");

  const user = await userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
  if (!user) throw new ApiError(400, "Invalid or expired reset token");

  user.passwordHash = await bcrypt.hash(password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successfully" });
});
