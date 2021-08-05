const path = require("path");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-ant-design", "storybook-preset-less"],
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.less$/i,
  //     loader: [
  //       "style-loader",
  //       "css-loader",
  //       {
  //         loader: "less-loader",
  //         options: { javascriptEnabled: true }
  //       }
  //     ],
  //     include: path.resolve(__dirname, "../")
  //   });
  //   return config;
  // }
};
