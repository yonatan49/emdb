import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nameAmharic: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const awardModel = mongoose.model("Award", awardSchema);

export default awardModel;
