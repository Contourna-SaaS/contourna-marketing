module.exports = {
  pageExtensions: ['tsx'],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: 'json',
          use: 'yaml-loader',
        },
        {
          test: /\.svg$/,
          use: '@svgr/webpack',
        },
        {
          test: /\.(png|jpg|gif|eot|ttf)$/,
          loader: 'url-loader',
        },
      ]
    );
    return config;
  },
};
