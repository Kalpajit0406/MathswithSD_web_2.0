/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 800, // Ensures instant file change detection on Windows / OneDrive directories
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
