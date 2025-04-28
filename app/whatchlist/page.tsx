"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Movie } from "../page";
import MoviesList from "../components/MoviesList";

export default function FavoriteMovies() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const res = await fetch("/api/user/fav");
          if (!res.ok) throw new Error("Failed to fetch favorites");

          const data = await res.json();
          setFavorites(data.favorites);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [status, session?.user]);

  if (isLoading) {
    return <p>Loading your favorite movies...</p>;
  }

  if (!favorites || favorites.length === 0) {
    return <p>You have no favorite movies.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Movies</h2>
      <MoviesList results={favorites} />
    </div>
  );
}
