module.exports = ({ config }) => {
  config.resolve.alias = {
    "next/image": require.resolve("./__mocks__/NextJSImageMock.js"),
  };

  config.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          }
        },
      },
    ],
  })

  return config;
};
