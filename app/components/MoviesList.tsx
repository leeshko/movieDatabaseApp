import React from "react";
import { Movie } from "@/types/movie";
import Card from "./Card";

interface MoviesListProps {
  results: Movie[];
}

const MoviesList = ({ results }: MoviesListProps) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-10 w-full">
        <h1 className="text-xl my-5 font-semibold text-gray-700">
          No Movies Found!
        </h1>
        <p className="text-lg text-gray-500">
          Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-6xl mx-auto py-4">
      {results.map((result) => (
        <Card key={result?.id || result?.movieId} result={result} />
      ))}
    </div>
  );
};

export default MoviesList;
