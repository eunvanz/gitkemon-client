const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");
// const { withSentryConfig } = require("@sentry/nextjs");

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    GITHUB_CLIENT_ID: isDev ? "1b594b7d4b0134060136" : "1b594b7d4b0134060136",
    API_HOST: isDev ? "http://localhost:3000" : "http://benjamin.ay1.krane.9rum.cc:8080",
    ACCESS_TOKEN_COOKIE_NAME: "gkmat",
    PORT: isDev ? "4000" : "80",
  };

  const result = {
    env,
    reactStrictMode: true,
    images: {
      domains: [
        "tailwindui.com",
        "images.unsplash.com",
        "avatars.githubusercontent.com",
        "storage.googleapis.com",
        "via.placeholder.com",
      ],
    },
    pageExtensions: ["page.tsx", "page.ts"],
  };

  // const SentryWebpackPluginOptions = {
  //   // Additional config options for the Sentry Webpack plugin. Keep in mind that
  //   // the following options are set automatically, and overriding them is not
  //   // recommended:
  //   //   release, url, org, project, authToken, configFile, stripPrefix,
  //   //   urlPrefix, include, ignore

  //   silent: true, // Suppresses all logs
  //   // For all available options, see:
  //   // https://github.com/getsentry/sentry-webpack-plugin#options.
  // };

  // return withSentryConfig(result, SentryWebpackPluginOptions);
  return result;
};
