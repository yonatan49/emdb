import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ratingSchema.index({ movieId: 1, userId: 1 }, { unique: true });

const ratingModel = mongoose.model("Rating", ratingSchema);

export default ratingModel;
