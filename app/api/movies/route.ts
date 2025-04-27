import { NextResponse } from 'next/server';


const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.lte=${new Date()}&sort_by=primary_release_date.desc`);
  
  if (!res.ok) {
    return NextResponse.json({ message: 'Failed to fetch movies' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
