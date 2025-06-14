const { withContentlayer } = require("next-contentlayer2");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/apps/:path*",
        destination: "/:path*",
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
