import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thedemostop.com",
      },
      {
        hostname: "guitar.com",
      },
      {
        hostname: "images.smiletemplates.com",
      },
      {
        hostname: "cdn.pixabay.com",
      },
      {
        hostname: "t3.ftcdn.net",
      },
      {
        hostname: "www.searchenginejournal.com",
      },
      {
        hostname: "wallpapers.com",
      },
      {
        hostname: "musicblog-datastorage.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "png.pngtree.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
