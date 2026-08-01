import mongoose from "mongoose";

const { Schema } = mongoose;

const ethiopianDateSchema = new Schema(
  {
    year: Number,
    month: Number,
    day: Number,
  },
  { _id: false }
);

const castMemberSchema = new Schema(
  {
    personId: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    characterName: String,
    characterNameAmharic: String,
    billingOrder: Number,
  },
  { _id: false }
);

const crewMemberSchema = new Schema(
  {
    personId: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: String,
  },
  { _id: false }
);

const boxOfficeSchema = new Schema(
  {
    budget: Number,
    domesticGross: Number,
    worldwideGross: Number,
    currency: String,
  },
  { _id: false }
);

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleAmharic: {
      type: String,
      trim: true,
    },
    originalTitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ["movie", "series", "short", "documentary"],
      default: "movie",
    },
    synopsis: String,
    synopsisAmharic: String,
    releaseDate: Date,
    releaseDateEthiopian: ethiopianDateSchema,
    status: {
      type: String,
      enum: ["released", "upcoming", "in-production"],
      default: "upcoming",
    },
    runtimeMinutes: Number,
    languages: [String],
    countryOfOrigin: String,
    ageRating: String,
    posterUrl: String,
    backdropUrl: String,
    trailerUrl: String,
    keywords: [String],
    genreIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    productionCompanyIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    cast: [castMemberSchema],
    crew: [crewMemberSchema],
    boxOffice: boxOfficeSchema,
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    ratingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

movieSchema.index({
  title: "text",
  titleAmharic: "text",
  originalTitle: "text",
  keywords: "text",
});

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
