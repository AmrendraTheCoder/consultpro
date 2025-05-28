const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: "three",
            chunks: "all",
            priority: 10,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }

    return config;
  },
};

// Tempo configuration
if (process.env.NODE_ENV === "development") {
  nextConfig.experimental = {
    ...nextConfig.experimental,
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],
  };
}

module.exports = withBundleAnalyzer(nextConfig);
