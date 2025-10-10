/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: [
      "mixed-decls",
      "legacy-js-api",
      "import",
      "slash-div",
      "global-builtin",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if needed
        hostname: "**", // matches any domain
      },
      {
        protocol: "http", // or 'http' if needed
        hostname: 'settlewise.in',
        hostname: "**", // matches any domain
      },
    ],
  },
};

module.exports = nextConfig;
