const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');
// const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function (env, { mode = 'development' }) {
  return {
    mode,
    context: path.join(__dirname, 'src'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'www'),
      filename: `js/[name]${mode === 'production' ? '.min' : ''}.js`,
    },
    devtool: 'sourcemap',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: mode === 'production' },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 50,
              name: 'images/[name].[ext]',
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 50,
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new MiniCssExtractPlugin({
        filename: `css/[name]${mode === 'production' ? '.min' : ''}.css`,
      }),
      new WebpackPwaManifest({
        name: 'Xin Bootstrap',
        short_name: 'XinBootstrap',
        description: 'Awesome Xin Bootstrap Template!',
        start_url: '/',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/img/xin.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          {
            src: path.resolve('src/img/xin.png'),
            size: '1024x1024', // you can also use the specifications pattern
          },
        ],
      }),
      new GenerateSW({
        importWorkboxFrom: 'local',
        skipWaiting: true,
        clientsClaim: true,
      }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    devServer: {
      disableHostCheck: true,
      contentBase: path.join(__dirname, 'www'),
      // https: true,
      // port: 8443,
      host: '0.0.0.0',
    },
  };
};
