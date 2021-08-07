const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules-preset",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "next/image": require.resolve("./__mocks__/NextJSImageMock.js"),
    };
    return config;
  },
};
