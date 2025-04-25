/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn-images-1.medium.com", "medium.com"],
    // Alternatively, you can use remotePatterns for more control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn-images-1.medium.com',
    //     pathname: '**',
    //   },
    // ],
  },
};

export default nextConfig;
