const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

const TMDB_API_KEY =
  process.env.VITE_TMDB_API_KEY ?? process.env.TMDB_API_KEY ?? '';

const config = {
  target: 'web',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new DotenvPlugin({ systemvars: true }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ModuleFederationPlugin({
      name: 'watchlog',
      filename: 'remoteEntry.js',
      exposes: {
        './WatchLogModule': './src/WatchLogModule',
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
        i18next: {
          singleton: true,
          requiredVersion: deps.i18next,
        },
        'react-i18next': {
          singleton: true,
          requiredVersion: deps['react-i18next'],
        },
        zustand: {
          singleton: true,
          requiredVersion: deps.zustand,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.TMDB_API_KEY': JSON.stringify(TMDB_API_KEY),
    }),
  ],
  output: {
    publicPath: 'auto',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    crossOriginLoading: 'anonymous',
  },
};

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';

  config.mode = argv.mode;

  if (isDevelopment) {
    config.output.filename = '[name].js';
    config.devtool = 'eval-cheap-module-source-map';
    config.optimization = { minimize: false };
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.devServer = {
      hot: true,
      port: 5173,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    };
  } else {
    config.devtool = false;
  }

  return config;
};
