import { fetchLatestMovies } from "@/action/movies";
import MoviesList from "@/app/components/MoviesList";
import Searchbar from "@/app/components/Searchbar";
import MoviesPagination from "@/app/components/MoviesPagination";
import { MovieResponse } from "@/types/movie";

type Props = {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
};

const MainPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const query = typeof params.query === "string" ? params.query : "";

  const data: MovieResponse = await fetchLatestMovies(page, query);

  return (
    <main className="p-6 min-h-screen">
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
