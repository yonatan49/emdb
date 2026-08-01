import mongoose from "mongoose";

const ethiopianDateSchema = new mongoose.Schema(
  {
    year: Number,
    month: Number,
    day: Number,
  },
  { _id: false }
);

const externalLinksSchema = new mongoose.Schema(
  {
    website: String,
    instagram: String,
    wikipedia: String,
  },
  { _id: false }
);

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    nameAmharic: {
      type: String,
      trim: true,
    },
    bio: String,
    bioAmharic: String,
    gender: String,
    birthDate: Date,
    birthDateEthiopian: ethiopianDateSchema,
    birthPlace: String,
    deathDate: Date,
    photoUrl: String,
    professions: [String],
    externalLinks: externalLinksSchema,
  },
  { timestamps: true }
);

const personModel = mongoose.model("Person", personSchema);

export default personModel;
