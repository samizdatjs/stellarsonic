const path = require('path');
const webpack = require('webpack');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env) => {
  let config = {
    context: __dirname + '/src/client',

    entry: [
      'aurelia-bootstrapper',
    ],
    
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
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
          exclude: [
            path.resolve(__dirname, 'dist/client'),
            path.resolve(__dirname, 'src/server')
          ]
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
        template: 'aurelia/index.html'
      }),
      new TsConfigPathsPlugin(),
      new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],

    node: {
      fs: 'empty'
    },

    optimization: {
      minimize: false
    }
  };
    
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: env === 'prod' ? JSON.stringify('production') : JSON.stringify('development')
    }
  }));
  
  if (env === 'prod') {
    config.optimization.minimize = true;
    config.plugins.push(new CompressionPlugin());
  } else if (env === 'dev') {
    config.entry.push('webpack-dev-server/client?http://localhost:8080');
    config.entry.push('webpack-hot-middleware/client');

    config.devtool = 'cheap-module-eval-source-map';
    config.devServer = {
      stats: 'errors-only'
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  
  return config;
};
