import Link from "next/link";
import { Movie } from "../page";
import Image from "next/image";
import { IconThumbUp } from "@tabler/icons-react";

type CardProps = {
  result: Movie;
};

const Card = ({ result }: CardProps) => {
  const posterPath = result.backdrop_path || result.poster_path;
  const id = result.movieId || result.id;
  return (
    <div className="group cursor-pointer hover:shadow-slate-400 shadow-md rounded-lg border border-slate-400 m-2 transition-shadow duration-200">
      <Link href={`/movie/${id}`}>
        <div className="relative w-full aspect-[1/1]">
          <Image
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/original/${posterPath}`
                : "/no-image.jpg"
            }
            alt={result.title || result.name}
            layout="fill"
            objectFit="cover"
            className="sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300
            w-full sm:h-36 object-cover
          "
          />
        </div>
        <div className="p-2 flex flex-col justify-end h-32">
          <p
            className={`line-clamp-3 text-sm ${
              !result.overview && "text-gray-500 italic"
            }`}
          >
            {result.overview ? result.overview : "-overview is not availiable-"}
          </p>

          <h2 className="font-bold truncate my-2 text-sm">
            {result.title || result.name}
          </h2>
          <p className="flex items-center text-xs">
            {result.release_date || result.first_air_date}
            <IconThumbUp className="h-5 mr-1 ml-3" />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
