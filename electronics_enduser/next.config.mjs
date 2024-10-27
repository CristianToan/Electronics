/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.mediamart.vn", "localhost", "cf.shopee.vn"],
  },
};

export default nextConfig;
