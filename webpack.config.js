import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'

const cssRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  })
}

const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', { targets: { browsers: ['last 2 Chrome versions'] } }],
        'react'
      ],
      plugins: [
        ['import', { libraryName: 'antd', style: 'css' }]
      ]
    }
  }
}

const electronRule = {
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', {
          'targets': {
            'electron': '1.7'
          }
        }]
      ]
    }
  }
}

const rendererConfig = {
  target: 'web',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: { rules: [jsRule, cssRule] },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),
    new WriteFilePlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
}

const mainConfig = {
  target: 'electron-main',
  entry: './src/electron.js',
  output: {
    filename: 'electron.bundle.js',
    path: path.join(__dirname, 'dist')
  },
  node: { // Don't mock the following:
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [electronRule]
  }
}

export default [rendererConfig, mainConfig]
