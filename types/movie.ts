export type Movie = {
  id: number;
  movieId?: string;
  title: string;
  release_date: string;
  first_air_date: string;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  description?: string;
  name: string;
  credits: {
    cast: { name: string; character: string; profile_path: string }[];
    crew: { name: string; job: string; profile_path: string }[];
  };
  genres: { id: number; name: string }[];
  rating?: string;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
