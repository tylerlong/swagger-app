import ExtractTextPlugin from 'extract-text-webpack-plugin'

const rules = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            'targets': {
              'browsers': ['last 2 versions']
            }
          }],
          'react'
        ]
      }
    }
  }
]

const config = {
  target: 'web',
  entry: {
    'index': './index.js'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: { rules },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ]
}

export default [config]
