const path = require('path')
const webpack = require('webpack')

const WebpackChunkHashPlugin = require('webpack-chunk-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = env => {
  const config = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'app.js'
    },
  
  
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax'
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'sass': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ]
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    },
  
  
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Vue memory',
        template: path.resolve(__dirname, './index.html'),
        filename: 'index.html',
      })
    ],
  
  
    resolve: {
      alias: {
        '@':  path.resolve(__dirname),
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }
  
  
  if (process.env.NODE_ENV === 'production') {
    config.output.filename = 'app-[hash].js'
    config.devtool = false
    config.devServer = {}
  
    config.plugins = (config.plugins || []).concat([
      new WebpackCleanupPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new WebpackChunkHashPlugin({algorithm: 'md5'}),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './static'),
        to: path.join(config.output.path, 'static')
      }]),
      new ImageminPlugin({ test: /\.(jpe?g|png)$/i }),
    ])
  }

  if(typeof env !== 'undefined' && env.analyze) {
    config.plugins = (config.plugins || []).concat([
      new BundleAnalyzerPlugin()
    ])
  }

  return config
}

