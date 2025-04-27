// lib/api/movies.ts

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.lte=${new Date()}&sort_by=primary_release_date.desc`
  );
  if (!res.ok) throw new Error("Failed to fetch popular movies");

  return res.json();
}

export async function fetchMovieDetails(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
