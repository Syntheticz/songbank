/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          fs: false,
          request: false,
        },
      };
    }
    return config;
  },
  
  async headers() {
    return [
        {
            // matching all API routes
            source: "/src/app/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Method/s", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
},
  
  env : {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000/api',
    PRODUCTION_URL: 'https://songbank.vercel.app/api',
    BASE_URL: 'http://localhost:3000',
    PROD_URL: 'https://songbank.vercel.app'
  },



  
}

if (process.env.NODE_ENV === 'development') {
    console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`)

  }

module.exports = nextConfig
