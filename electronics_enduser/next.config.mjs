/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.mediamart.vn',
          pathname: '**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          pathname: '**',
        }
      ],
    },
};

export default nextConfig;
