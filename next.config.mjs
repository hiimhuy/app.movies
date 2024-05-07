import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "https://img.phimapi.com",
      'https://phimapi.com',
      "img.phimapi.com",
    ],
    // remotePatterns: [
    //   {protocol: 'https',
    //   hostname: 'https://img.phimapi.com',
    //   port: '',
    //   pathname: '/upload/vod/20240507-1/ba175bc24c5da57be5a52c209e988634.jpg',}
    // ]

  },
};

export default nextConfig;
