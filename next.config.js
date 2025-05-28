const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    }
};

if (process.env.NEXT_PUBLIC_TEMPO) {
    nextConfig["experimental"] = {
        // NextJS 13.4.8 up to 14.1.3:
        // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
        // NextJS 14.1.3 to 14.2.11:
        swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],

        // NextJS 15+ (Not yet supported, coming soon)
    }
}

// Performance optimizations
nextConfig.compress = true;
nextConfig.poweredByHeader = false;

// Experimental features for better performance
nextConfig.experimental = {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
};

// Webpack optimizations
nextConfig.webpack = (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
        config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    enforce: true,
                },
                three: {
                    test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
                    name: 'three',
                    chunks: 'all',
                    priority: 10,
                },
                framer: {
                    test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                    name: 'framer',
                    chunks: 'all',
                    priority: 10,
                },
            },
        };
    }

    // Tree shaking for better performance
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    return config;
};

// Headers for better caching
nextConfig.async headers() {
    return [
        {
            source: '/(.*)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
        {
            source: '/api/(.*)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-cache, no-store, must-revalidate',
                },
            ],
        },
    ];
}

module.exports = withBundleAnalyzer(nextConfig);