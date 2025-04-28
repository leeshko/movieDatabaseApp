// import AddToFav from "@/components/AddToFav";
import { fetchMovieDetails } from "@/action/movies";
import AddToFavourite from "@/app/components/AddToFavourite";
import { Movie } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id: movieId } = await params;

  const movie: Movie = await fetchMovieDetails(movieId);

  if (!movie) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">
          Movie details are not available at the moment!
        </h1>
        <p>
          <Link href="/" className="hover:text-amber-600">
            Go Home
          </Link>
        </p>
      </div>
    );
  }

  const moviePoster = movie.backdrop_path || movie.poster_path;

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={
            moviePoster
              ? `https://image.tmdb.org/t/p/original/${moviePoster}`
              : "/no-image.jpg"
          }
          alt="Movie Poster"
          width={500}
          height={500}
          className="rounded-lg w-full md:w-96 h-56 object-cover"
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className={`text-lg mb-3 ${movie.overview ? "" : "italic"}`}>
            {movie.overview ? movie.overview : "Overview is not availiable"}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count}
          </p>
          <AddToFavourite
            movieId={movieId}
            title={movie.title || movie.name}
            image={movie.backdrop_path || movie.poster_path}
            overview={movie.overview}
            releaseDate={movie.release_date || movie.first_air_date}
            voteCount={movie.vote_count}
          />

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Cast:</h3>
            <ul className="list-disc pl-5">
              {movie.credits.cast.length ? (
                movie.credits.cast.map((actor) => (
                  <li key={actor.name} className="mb-1">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                          : "/no-image.jpg"
                      }
                      alt={actor.name}
                      width={50}
                      height={150}
                      className="mr-2 inline-block"
                    />
                    <span className="font-semibold">{actor.name}</span> as{" "}
                    {actor.name} as {actor.character}
                  </li>
                ))
              ) : (
                <li className="mb-1 italic">No cast information available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
