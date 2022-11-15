/** @type {import('next').NextConfig} */
const path = require("path");
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  images: {
    domains: [
      "images.selfridges.com",
      "dev-gift-guide.selfridges.com",
      "qa-gift-guide.selfridges.com",
      "ppt-gift-guide.selfridges.com",
    ],
  },
  webpack: (
    config,
    options
  ) => {
    // Important: return the modified config
    config.plugins.push(new CopyWebpackPlugin({
      patterns: [
          { from: '_content', to: '_content' }
      ]
  }))
    return config;
  }
};

module.exports = nextConfig;
