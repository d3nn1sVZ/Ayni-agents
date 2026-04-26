import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MDK ships native Lightning bindings and uses the ws WebSocket library.
  // Bundling these breaks the mask() function in ws (TypeError: b.mask is
  // not a function) and dlopen for the .node binding. Externalize so Next.js
  // resolves them at runtime from node_modules instead of webpacking them.
  // Externalize only what MUST be: the native Lightning binding (.node file
  // can't be bundled) and the ws library (bundling breaks its mask() frame
  // function, surfaces as "TypeError: b.mask is not a function" at runtime).
  // Bundling @moneydevkit/core itself works fine and avoids ESM resolution
  // bugs in its dist (missing .js extensions on handler imports).
  serverExternalPackages: [
    '@moneydevkit/lightning-js',
    '@moneydevkit/lightning-js-linux-x64-gnu',
    'ws',
  ],
}

export default withMdkCheckout(nextConfig)
