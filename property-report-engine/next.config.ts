import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Phase 1 is entirely client-side. A static artifact avoids unnecessary
  // server/function packaging; remove this when API routes are introduced.
  output: "export",
};

export default nextConfig;
