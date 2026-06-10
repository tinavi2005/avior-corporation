/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@vale-integrador/shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;