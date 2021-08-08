const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    GITHUB_CLIENT_ID: "4860581bd098afbf7956",
    API_HOST: isDev ? "http://localhost:3000" : "",
    ACCESS_TOKEN_HEADER_NAME: "gkmat",
  };

  const result = {
    env,
    reactStrictMode: true,
    images: {
      // TODO: 나중에 정리
      domains: [
        "tailwindui.com",
        "images.unsplash.com",
        "avatars.githubusercontent.com",
        "storage.googleapis.com",
      ],
    },
  };

  return result;
};
