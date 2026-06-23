/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  // Required for Docker standalone output
  output: process.env.DOCKER_BUILD === '1' ? 'standalone' : undefined,
};

export default nextConfig;
