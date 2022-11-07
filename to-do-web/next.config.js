/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/to-do",
        permanent: true,
      },
    ];
  },
};
nextConfig;
