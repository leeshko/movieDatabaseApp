import { fetchLatestMovies } from "@/action/movies";
import MoviesList from "./components/MoviesList";
import Searchbar from "./components/Searchbar";
import MoviesPagination from "./components/MoviesPagination";
import { MovieResponse } from "@/types/movie";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const MainPage = async ({ searchParams }: Props) => {
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const query = typeof searchParams.query === "string" ? searchParams.query : "";

  const data: MovieResponse = await fetchLatestMovies(page, query);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Latest Movies
      </h1>
      <Searchbar />
      <MoviesList results={data.results} />
      <MoviesPagination totalPages={data.total_pages} />
    </main>
  );
};

export default MainPage;
