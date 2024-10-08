/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://staging-production-326e.up.railway.app/", 
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://staging-production-326e.up.railway.app/", 
          },
        ],
      },
    ];
  },
};

export default nextConfig;
