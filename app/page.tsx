import { fetchLatestMovies } from "@/action/movies";
import React from "react";
import MoviesList from "./components/MoviesList";
import Searchbar from "./components/Searchbar";
import MoviesPagination from "./components/MoviesPagination";

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

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const MainPage = async ({ searchParams }: Props) => {
  const { page, query } = await searchParams;

  const currentPage = page ? parseInt(page) : 1;
  const data: MovieResponse = await fetchLatestMovies(currentPage, query);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 max-w-6xl mx-auto py-4">
        Latest Movies
      </h1>
      <Searchbar />
      <MoviesList results={data.results} />
      <MoviesPagination currentPage={currentPage} totalPages={data.total_pages} />
    </main>
  );
};

export default MainPage;
