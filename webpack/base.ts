import path from 'path'

const entry = path.resolve(__dirname, '../')

export default {
  entry: './src/main.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js*/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  }
}
