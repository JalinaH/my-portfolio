/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { outputFileTracingIncludes: { "/api/chat": ["./data/**/*.md"] } },
  images: {
    remotePatterns: ["cdn-images-1.medium.com", "cdn-images-2.medium.com", "miro.medium.com"].map(hostname => ({ protocol: "https", hostname })),
  },
};
export default nextConfig;
