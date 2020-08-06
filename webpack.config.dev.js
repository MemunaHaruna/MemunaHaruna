const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

// setup env vars in a React app:
// https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['webpack-hot-middleware/client', `${APP_DIR}/index.jsx`],
  devServer: {
    contentBase: './dist',
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /(\.scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /(\.otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: ['url-loader'],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(envKeys),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};