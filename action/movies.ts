const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchLatestMovies(page: number = 1) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=${page}`, {
      next: { revalidate: 3600 }, 
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }
  
    return res.json();
  }
  

export async function fetchMovieDetails(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json();
}
