/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactStrictMode: true,

    appDir: false,
    output: 'export',
  },
};

module.exports = nextConfig;
