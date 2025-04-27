import { fetchPopularMovies } from "@/action/movies";
import React from "react";
import MoviesList from "./components/MoviesList";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  first_air_date: string;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name: string;
};

type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const MainPage = async () => {
  const data: MovieResponse = await fetchPopularMovies();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 max-w-6xl mx-auto py-4">Latest Movies</h1>
      <MoviesList results={data.results} />
    </main>
  );
};

export default MainPage;
