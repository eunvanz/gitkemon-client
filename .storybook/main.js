const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "next/image": require.resolve("./__mocks__/NextJSImageMock.js"),
    };
    config.module.rules.push({
      test: /\.less$/i,
      loader: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: { lessOptions: { javascriptEnabled: true }}
        }
      ],
      include: path.resolve(__dirname, "../")
    });
    return config;
  }
};
