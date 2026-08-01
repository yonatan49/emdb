import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nameAmharic: {
    type: String,
    trim: true,
  },
  description: String,
});

const genreModel = mongoose.model("Genre", genreSchema);

export default genreModel;
