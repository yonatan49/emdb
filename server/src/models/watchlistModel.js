import mongoose from "mongoose";

const { Schema } = mongoose;

const watchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  status: {
    type: String,
    enum: ["want_to_watch", "watching", "watched"],
    default: "want_to_watch",
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const watchlistModel = mongoose.model("Watchlist", watchlistSchema);

export default watchlistModel;
