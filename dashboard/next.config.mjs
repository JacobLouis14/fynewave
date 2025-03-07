/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "gratisography.com",
      },
      {
        hostname: "musicblog-datastorage.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
