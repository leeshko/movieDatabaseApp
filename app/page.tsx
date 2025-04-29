import { fetchLatestMovies } from "@/action/movies";
import React from "react";
import MoviesList from "./components/MoviesList";
import Searchbar from "./components/Searchbar";
import MoviesPagination from "./components/MoviesPagination";
import { MovieResponse } from "@/types/movie";

type Props = {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
};

const MainPage = async ({ searchParams }: Props) => {
  const { page, query } = await searchParams;

  const currentPage = page ? parseInt(page) : 1;

  let data: MovieResponse;

  try {
    data = await fetchLatestMovies(currentPage, query);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return (
      <main className="p-6 bg-gray-100 min-h-screen text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Failed to load movies. Please try again later.
        </h1>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Latest Movies
      </h1>
      <Searchbar />
      <MoviesList results={data.results} />
      <MoviesPagination
        currentPage={currentPage}
        totalPages={data.total_pages}
      />
    </main>
  );
};

export default MainPage;
