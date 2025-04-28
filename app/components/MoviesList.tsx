import React from "react";
import { Movie } from "../page";
import Card from "./Card";

const MoviesList = ({ results }: { results: Movie[] }) => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4">
      {results.length ? (
        results.map((result) => (
          <Card key={result.movieId || result.id} result={result} />
        ))
      ) : (
        <div className="text-center mt-10 col-span-4">
          <h1 className="text-xl my-5">No Movies Found!</h1>
          <p className="text-lg">Try searching for something else.</p>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
