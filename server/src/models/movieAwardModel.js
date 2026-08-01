import mongoose from "mongoose";

const { Schema } = mongoose;

const movieAwardSchema = new Schema({
  awardId: {
    type: Schema.Types.ObjectId,
    ref: "Award",
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  personId: {
    type: Schema.Types.ObjectId,
    ref: "Person",
  },
  result: {
    type: String,
    enum: ["won", "nominated"],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

movieAwardSchema.index({ awardId: 1, movieId: 1, personId: 1 });

const movieAwardModel = mongoose.model(
  "MovieAward",
  movieAwardSchema,
  "movie_awards"
);

export default movieAwardModel;
