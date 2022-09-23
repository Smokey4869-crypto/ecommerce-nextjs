/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL": "mongodb+srv://admin29:Anhminh29@projects.vpib6.mongodb.net/eCommerce?retryWrites=true&w=majority",
    "ACCESS_TOKEN": "ptxCB-fd99rq!xw2%J*gw5",
    "REFRESH_TOKEN": "sU%t=yE4QfVU8ARX"
  }
}

module.exports = nextConfig
