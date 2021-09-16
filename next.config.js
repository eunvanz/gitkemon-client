const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    GITHUB_CLIENT_ID: isDev ? "461b3104c569d1f66e6d" : "4860581bd098afbf7956",
    API_HOST: isDev ? "http://localhost:3000" : "https://api.gitkemon.com",
    ACCESS_TOKEN_COOKIE_NAME: "gkmat",
    GITHUB_REPO: "https://github.com/eunvanz/gitkemon-client",
    GITHUB_URL: "https://github.com",
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

  const SentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
  };

  return withSentryConfig(result, SentryWebpackPluginOptions);
};
