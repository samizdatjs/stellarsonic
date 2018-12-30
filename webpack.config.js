const path = require('path');
const webpack = require('webpack');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (env) => {
  let config = {
    entry: [
      'aurelia-bootstrapper',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack-hot-middleware/client'
    ],
    
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    
    resolve: {
      extensions: [
        '.webpack.js',
        '.web.js',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ],
      modules: [
        'src/client/aurelia',
        'node_modules'
      ]
    },
    
    module: {
      rules: [
        {
          test: /\.styl$/i,
          issuer: [{ test: /\.html$/i }],
          use: [
            'css-loader', 'stylus-loader'
          ]
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          use: {loader: 'css-loader'},
        },
        {
          test: /\.ts$/i,
          loader: 'awesome-typescript-loader',
          exclude: path.resolve(__dirname, 'dist/client')
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        }
      ]
    },
    
    plugins: [
      new AureliaPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/client/aurelia/index.html'
      }),
      new TsConfigPathsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],

    node: {
      fs: 'empty'
    }
  };
  
  if (env === 'prod') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));
  } else if (env === 'dev') {
    config.devtool = 'cheap-module-eval-source-map';
    config.devServer = {
      stats: 'errors-only'
    };
  }
  
  return config;
};
