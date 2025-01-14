const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const MyPlugin = require('./src/myPlugins/my-plugin')
const path = require('path');

/**
 * __dirname 是Node.js中的全局变量
 * 表示当前执行文件所在的目录的绝对路径
 * console.log(111, __dirname)
 * /Users/a58/Desktop/Project/webpack相关/toy-webpack
 */

module.exports = {
  entry: {
    index: './src/index.js',
    file1: './src/file1.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:8].js',
  },
  mode: "production", // development
  // devtool: "source-map", // 将编译、打包、压缩后的代码映射回源代码的技术
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'src/myLoaders')]
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // 识别css文件
        use: ['style-loader', 'css-loader']  // 对css文件使用的三个loader
      },
      {
        test: /\.(scss|sass)$/,
        // 1. 官方的loader
        // use: ['style-loader', 'css-loader', 'sass-loader']
        // 2. 使用自己的loader
        use: ['ou-style-loader', 'ou-css-loader', 'ou-sass-loader']
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        // use: ['url-loader']
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     esModule: false,  // 不适用esmodule解析
          //     name: '[name].[ext]',   // 使用占位符设置导出名称
          //     limit: 1024 * 10  // 设置转成base64阈值，大于10k不转成base64,而是直接打包成文件
          //   }
          // },
          {
            loader: 'file-loader', // 默认就是导出文件，默认名称是哈希值，可以进行设置
            options: {
              esModule: false,  // 不适用esmodule解析
              name: '[name].[ext]'  // 使用占位符设置导出名称
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-withimg-loader',
          options: {
            sources: true,
            esModule: false,  // 不适用esmodule解析
          }
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader']

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MyPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new CleanWebpackPlugin()] : [])
  ],
  devServer: {
    port: 3001,
    // hot: true, // 启用热模块替换???并没有热更新啊
  },
  cache: {
    type: 'memory'  // 默认配置
  }
};


