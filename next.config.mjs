import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default withMdkCheckout(nextConfig)
