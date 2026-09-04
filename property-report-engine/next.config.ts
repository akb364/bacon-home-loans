import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This app lives inside another Next.js repository. Pin Turbopack here so it
  // never inherits the parent project's PostCSS/Tailwind configuration.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
