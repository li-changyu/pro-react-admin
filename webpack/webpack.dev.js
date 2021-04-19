const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const jsRegex = /\.(js)$/
module.exports = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    compress: false,
    inline: true,
    hot: true,
    port: 8090,
    open: true,
    clientLogLevel: 'silent',
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    // proxy: {
    //   '/app/api': {
    //     target: 'http://hc-t1.yonghuivip.com',
    //     pathRewrite: { '^/api': '' },
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        pathRewrite: { '^/api': '' },
      },
    },
  },

  module: {
    rules: [
      {
        test: jsRegex,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin(), new webpack.HotModuleReplacementPlugin()].filter(Boolean),
  optimization: {
    providedExports: true,
    usedExports: true,
  },
})
