/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**"
      }
    ]
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000, // Sprawdza zmiany co 1 sekundę
      aggregateTimeout: 300, // Czas, po którym jest uruchamiana aktualizacja
    };
    return config;
  }
};

module.exports = nextConfig;
