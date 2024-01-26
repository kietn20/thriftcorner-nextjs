// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'puppeteer-core', '@sparticuz/chromium']
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'i.ebayimg.com',
    }, {
      protocol: 'https',
      hostname: 'ir.ebaystatic.com'
    }
    ]
  },
}

module.exports = nextConfig