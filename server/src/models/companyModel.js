import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ["production", "distributor"],
    required: true,
  },
  foundedYear: Number,
  country: String,
  logoUrl: String,
  description: String,
});

const companyModel = mongoose.model("Company", companySchema);

export default companyModel;
