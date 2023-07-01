module.exports ={
  images: {
  domains: ['images.unsplash.com'],
},
  reactStrictmode:false,
  webpack:(config,{isServer})=>{
    if(!isServer){
      config.resolve.fallback = {
        fs:false,
      };
    }
    return config;
  }
}

//module.exports = nextConfig

//images: {
  //domains: ['images.unsplash.com'],
//},