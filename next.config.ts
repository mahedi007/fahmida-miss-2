import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static HTML export -> /out (Cloudflare Pages)
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
