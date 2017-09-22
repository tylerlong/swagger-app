import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'

const webConfig = {
  target: 'web',
  entry: {
    index: './src/web/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react'
            ],
            plugins: [
              ['import', { libraryName: 'antd', style: 'css' }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),
    new WriteFilePlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  devtool: 'source-map'
}

const electronConfig = {
  target: 'electron',
  entry: {
    electron: './src/electron/index.js',
    preload: './src/electron/preload.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  node: {
    __dirname: false // https://github.com/webpack/webpack/issues/2010#issuecomment-181256611
  }
}

export default [webConfig, electronConfig]
