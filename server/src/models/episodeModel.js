import mongoose from "mongoose";

const { Schema } = mongoose;

const episodeSchema = new Schema({
  seriesId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
    index: true,
  },
  seasonNumber: {
    type: Number,
    required: true,
  },
  episodeNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  titleAmharic: {
    type: String,
    trim: true,
  },
  synopsis: String,
  airDate: Date,
  runtimeMinutes: Number,
});

episodeSchema.index(
  { seriesId: 1, seasonNumber: 1, episodeNumber: 1 },
  { unique: true }
);

const episodeModel = mongoose.model("Episode", episodeSchema);

export default episodeModel;
