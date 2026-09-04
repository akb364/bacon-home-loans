import type { NextConfig } from "next";

const appRoot = __dirname;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This app lives inside another Next.js repository. Pin Turbopack here so it
  // never inherits the parent project's PostCSS/Tailwind configuration.
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
