/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Ensure React strict mode
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/:path*', 
        },
      ];
    },
  };
  
  export default nextConfig;