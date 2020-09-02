const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? 'js/[name].js' : 'js/[name].js?[chunkhash]',
    chunkFilename: 'js/[id].js?[chunkhash]',
  },
  externals: {
    // 'video.js': 'videojs',
    // 'flv.js': 'flvjs'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/_vuex-along@1.2.8@vuex-along/lib/main.js'),
          resolve('node_modules/_vue-socket.io@3.0.7@vue-socket.io/dist/vue-socketio.js'),
          resolve('node_modules/_debug@4.1.1@debug/src/')
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'},
      { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'},
      { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/'}
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve('src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: { 
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})