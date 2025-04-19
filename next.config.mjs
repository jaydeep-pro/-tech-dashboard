/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better tree shaking
  reactStrictMode: true,

  // Configure webpack for better tree shaking
  webpack: (config, { isServer }) => {
    // Enable tree shaking in production
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
      };
    }
    return config;
  },
};

export default nextConfig;
