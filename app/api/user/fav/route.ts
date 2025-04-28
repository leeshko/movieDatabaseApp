import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    if (!session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ favorites: user.favouriteMovies || [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { movieId, title, overview, releaseDate, voteCount, image, action, cast } =
    await req.json();

  if (!movieId) {
    return new Response("Movie ID required", { status: 400 });
  }

  await connectDB();

  if (!session.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (action === "add") {
    if (!user.favouriteMovies) {
      user.favouriteMovies = [];
    }
    if (
      !user.favouriteMovies.some(
        (fav: { movieId: string }) => fav.movieId === movieId
      )
    ) {
      user.favouriteMovies.push({
        movieId,
        title,
        description: overview || "",
        releaseDate,
        poster_path: image || "",
        rating: voteCount,
        cast: cast || [],
      });
    }
  } else if (action === "remove") {
    user.favouriteMovies = user.favouriteMovies.filter(
      (fav: { movieId: string }) => fav.movieId !== movieId
    );
  } else {
    return new Response("Invalid action", { status: 400 });
  }

  await user.save();

  return new Response("Success", { status: 200 });
}
