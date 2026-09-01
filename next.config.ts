import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lasabraso.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dineinpetweb.gumlet.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
