/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode:false,images: {
  domains: ['images.unsplash.com'],
},
  webpack:(config, {isServer}) =>{
    if(!isServer){
      config.resolve.fallback = {
        fs:false,
      };
    }return config;
  }
  }

module.exports = nextConfig
