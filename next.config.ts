import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify deployment - remove standalone output
  // output: 'export', // Uncomment for static export if needed
  
  // Image optimization
  images: {
    domains: ['localhost', 'logo.clearbit.com', 'companieslogo.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Required for static export on Netlify
  },
  
  // Enable experimental features
  experimental: {
    esmExternals: true,
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Disable strict mode for better compatibility
  reactStrictMode: true,
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Rewrites for API routes (if using external backend)
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
