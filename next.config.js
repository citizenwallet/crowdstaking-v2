/** @type {import('next').NextConfig} */
const nextConfig = {
  minify: false,
  output: "export",
  images: {
    unoptimized: true,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: "true",
});

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
