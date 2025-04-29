import { fetchMovieDetails } from "@/action/movies";
import AddToFavourite from "@/app/components/AddToFavourite";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

type PageProps = {
  params: {
    id: string;
  };
};

const MoviePage = async ({ params }: PageProps) => {
  const movieId = await params.id;

  const movie: Movie = await fetchMovieDetails(movieId);

  if (!movie) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5 font-semibold text-gray-700">
          Movie details are not available at the moment!
        </h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Go Home
        </Link>
      </div>
    );
  }

  const {
    backdrop_path,
    poster_path,
    overview,
    title,
    name,
    release_date,
    first_air_date,
    vote_count,
    credits,
  } = movie;

  const moviePoster = backdrop_path || poster_path;
  const movieTitle = title || name || "Untitled";
  const movieOverview = overview || "Overview is not available";
  const movieReleaseDate = release_date || first_air_date || "Unknown";
  const movieRating = vote_count ?? "N/A";
  const castList = credits?.cast || [];

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <div className="relative w-full md:w-96 h-56 md:h-auto">
          <Image
            src={
              moviePoster
                ? `https://image.tmdb.org/t/p/original/${moviePoster}`
                : "/no-image.jpg"
            }
            alt="Movie Poster"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>

        <div className="p-2 flex-1">
          <h2 className="text-2xl mb-4 font-bold">{movieTitle}</h2>
          <p
            className={`text-md mb-4 ${overview ? "" : "italic text-gray-500"}`}
          >
            {movieOverview}
          </p>

          <p className="mb-2">
            <span className="font-semibold mr-1">Date Released:</span>
            {movieReleaseDate}
          </p>
          <p className="mb-4">
            <span className="font-semibold mr-1">Rating:</span>
            {movieRating}
          </p>

          <AddToFavourite
            movieId={movieId}
            title={movieTitle}
            image={moviePoster || ""}
            overview={overview || ""}
            releaseDate={movieReleaseDate}
            voteCount={vote_count}
            cast={castList.map((actor) => ({ name: actor.name }))}
          />

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3">Cast:</h3>
            {castList.length ? (
              <ul className="list-disc pl-5 space-y-2">
                {castList.map((actor) => (
                  <li key={actor.name} className="flex items-center gap-3">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                          : "/no-image.jpg"
                      }
                      alt={actor.name}
                      width={50}
                      height={75}
                      className="rounded"
                    />
                    <span>
                      <span className="font-semibold">{actor.name}</span> as{" "}
                      {actor.character}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-500">
                No cast information available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
