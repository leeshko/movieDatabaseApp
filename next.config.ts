import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  // serverExternalPackages: ["mongoose"],
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals = [...config.externals, "mongoose"];
  //   }
  //   config.experiments = {
  //     topLevelAwait: true,
  //     layers: true,
  //   };
  //   return config;
  // },
};

export default nextConfig;
