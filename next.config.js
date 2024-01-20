// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'puppeteer-core', '@sparticuz/chromium']
  },
  images: {
    domains: ['i.ebayimg.com']
  },
}

module.exports = nextConfig