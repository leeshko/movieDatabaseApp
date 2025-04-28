import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  // env:{
  //   AUTH_SECRET:process.env.AUTH_SECRET,
  //   MONGO_URI:process.env.MONGO_URI,
  //   GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
  //   GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
  //   TMDB_API_KEY:process.env.TMDB_API_KEY,
  //   TMDB_ACCESS_TOKEN:process.env.TMDB_ACCESS_TOKEN,
  //   NEXT_PUBLIC_MOVIE_DB_URL:process.env.NEXT_PUBLIC_MOVIE_DB_URL
  // },
  serverExternalPackages: ["mongoose"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "mongoose"];
    }
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
