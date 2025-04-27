import mongoose from "mongoose";

export const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    select: false,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export const Movie =
  mongoose.models?.Movie || mongoose.model("Movie", movieSchema);
