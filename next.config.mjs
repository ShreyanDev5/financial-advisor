/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.0.103:3000"],
  images: {
    unoptimized: true,
  },
  // TEMP: Improve debuggability of production-only errors
  productionBrowserSourceMaps: true,
  experimental: {
    serverSourceMaps: true,
  },
}

export default nextConfig
