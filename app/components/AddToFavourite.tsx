"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

declare module "next-auth" {
  interface User {
    favouriteMovies?: string[];
  }
  interface Session {
    user?: User;
  }
}

interface AddToFavouriteProps {
  movieId: string;
  title: string;
  image: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
  cast: { name: string }[];
}

const AddToFavourite = ({
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
  cast,
}: AddToFavouriteProps) => {
  const [isFav, setIsFav] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/user/fav");
          if (!res.ok) throw new Error("Failed to fetch favorites");

          const data = await res.json();
          const isMovieFav = data.favorites.some(
            (fav: { movieId: string }) => fav.movieId === movieId
          );
          setIsFav(isMovieFav);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchFavorites();
  }, [movieId, status]);

  const handleFavClick = async () => {
    if (status !== "authenticated") {
      router.push("/register");
      return;
    }

    try {
      const res = await fetch("/api/user/fav", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          title,
          overview,
          releaseDate,
          voteCount,
          image,
          cast,
          action: isFav ? "remove" : "add",
        }),
      });

      if (res.ok) {
        setIsFav((prev) => !prev);
      } else {
        console.error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const buttonLabel = isFav ? "Remove from Favorites" : "Add to Favorites";

  return (
    <div>
      <button
        onClick={handleFavClick}
        disabled={status === "loading"}
        className={`p-2 rounded cursor-pointer transition ${
          isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default AddToFavourite;
