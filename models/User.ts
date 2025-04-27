import mongoose from "mongoose";
import { movieSchema } from "./Movie";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  authProviderId: {
    type: String,
  },
  favouriteMovies: {
    type: [movieSchema],
    default: [],
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
