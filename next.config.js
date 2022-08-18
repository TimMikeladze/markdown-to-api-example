/** @type {import('next').NextConfig} */

/**
 * Important note:
 *
 * This file has additional configuration commented out below for rapid package development and testing when using `yalc` alongside `markdown-to-api`.
 *
 */

// const withTM = require('next-transpile-modules')(['markdown-to-api']);
//
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack: (config, { isServer }) => {
//     config.snapshot = {
//       ...(config.snapshot ?? {}),
//       managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!markdown-to-api)/],
//     };
//
//     config.watchOptions = {
//       ...(config.watchOptions ?? {}),
//       ignored: [
//         '**/.git/**',
//         '**/node_modules/!(markdown-to-api)**',
//         '**/.next/**',
//       ],
//     };
//
//     return config;
//   },
// };
//
// module.exports = withTM(nextConfig);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
