/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
