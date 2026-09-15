const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

const WATCHLOG_REMOTE =
  process.env.WATCHLOG_REMOTE_URL ?? 'http://localhost:5173/remoteEntry.js';

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    target: 'web',
    mode: argv.mode,
    entry: './host/src/index.tsx',
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              configFile: path.resolve(__dirname, '../babel.config.js'),
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new ModuleFederationPlugin({
        name: 'watchlog_host',
        remotes: {
          watchlog: `watchlog@${WATCHLOG_REMOTE}`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: deps['react-router-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
      }),
    ],
    output: {
      publicPath: 'auto',
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, '../dist-host'),
      clean: true,
    },
    devServer: isDevelopment
      ? {
          port: 5174,
          historyApiFallback: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      : undefined,
  };
};
