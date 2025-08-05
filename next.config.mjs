/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.0.103:3000"],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
