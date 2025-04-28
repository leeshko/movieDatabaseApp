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
    required: false,
  },
  releaseDate: {
    type: Date,
    select: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  poster_path: {
    type: String,
  },
  cast: [
    {
      name: { type: String, required: false },
      character: { type: String, required: false },
      id: { type: Number },
      profile_path: { type: String },
    },
  ],
});

export const Movie =
  mongoose.models?.Movie || mongoose.model("Movie", movieSchema);
