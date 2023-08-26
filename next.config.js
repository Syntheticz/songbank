/** @type {import('next').NextConfig} */
const nextConfig = {
  env : {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000/api',
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3000/'
  }
  
}

if (process.env.NODE_ENV === 'development') {
    console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`)

  }

module.exports = nextConfig
