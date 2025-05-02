import Link from "next/link";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { IconThumbUp } from "@tabler/icons-react";

interface CardProps {
  result: Movie;
}

const Card = ({ result }: CardProps) => {
  const posterPath = result.backdrop_path || result.poster_path;
  const description =
    result.overview || result.description || "Overview not available";
  const title = result.title || result.name || "Untitled";
  const releaseDate =
    result.release_date || result.first_air_date || "Unknown date";
  const rating = result.vote_count ?? result.rating ?? "N/A";
  const id = result.id ?? result.movieId;

  return (
    <div className="group cursor-pointer hover:shadow-lg shadow-md rounded-lg border border-slate-400 m-2 transition-shadow duration-200 overflow-hidden">
      <Link href={`/movie/${id}`}>
        <div className="relative w-full aspect-[1/1]">
          <Image
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/original/${posterPath}`
                : "/no-image.jpg"
            }
            alt={title}
            fill
            className="object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
        <div className="p-3 flex flex-col justify-between h-36">
          <h2 className="font-bold truncate text-sm mb-1">{title}</h2>
          <p
            className={`line-clamp-3 text-sm ${
              !result.overview && "text-gray-500 italic"
            }`}
          >
            {description}
          </p>
          <p className="flex items-center text-xs mt-2">
            {releaseDate}
            <IconThumbUp className="h-4 ml-2 mr-1 text-blue-500" />
            {rating}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
