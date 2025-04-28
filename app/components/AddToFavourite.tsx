"use client";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

declare module "next-auth" {
  interface User {
    favouriteMovies?: string[];
  }
  interface Session {
    user?: User;
  }
}

const AddToFavourite = ({
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
  cast,
}: {
  movieId: string;
  title: string;
  image: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
  cast: { name: string }[];
}) => {
  const [isFav, setIsFav] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkFavorite = async () => {
      if (status === "authenticated" && session?.user) {
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

    checkFavorite();
  }, [movieId, status, session?.user]);

  const handleFavClick = async () => {
    if (status !== "authenticated") {
      router.push("/api/auth/signin");
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
        setIsFav(!isFav);
      } else {
        console.error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={
          status !== "authenticated" ? handleFavClick : redirect("/register")
        }
        className={`p-2 rounded cursor-pointer ${
          isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        {isFav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default AddToFavourite;
