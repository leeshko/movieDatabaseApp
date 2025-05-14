"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MoviesList from "../components/MoviesList";
import { Movie } from "@/types/movie";

const FavoriteMovies = () => {
  const router = useRouter();
  const { status } = useSession();

  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const controller = new AbortController();

    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/user/fav", { signal: controller.signal });

        if (!res.ok) {
          throw new Error("Failed to fetch favorite movies");
        }

        const data = await res.json();
        setFavorites(data.favorites);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("Fetch was aborted normally.");
          return;
        }

        if (err instanceof Error) {
          console.error("Fetching favorites failed:", err.message);
          setError(err.message);
        } else {
          console.error("An unknown error occurred");
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();

    return () => {
      controller.abort();
    };
  }, [status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="text-center p-10">
        <p className="text-lg animate-pulse">Loading your favorite movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="text-center p-10">
        <p className="text-lg text-gray-600">
          You have no favorite movies yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Your Favorite Movies
      </h2>
      <MoviesList results={favorites} />
    </div>
  );
};

export default FavoriteMovies;
