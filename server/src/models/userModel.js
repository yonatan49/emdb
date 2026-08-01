import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    fullNameAmharic: {
      type: String,
      trim: true,
    },
    profilePicture: String,
    bio: String,
    location: String,
    preferredLanguage: {
      type: String,
      enum: ["en", "am"],
      default: "en",
    },
    role: {
      type: String,
      enum: ["user", "critic", "admin"],
      default: "user",
    },
    isVerifiedCritic: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
