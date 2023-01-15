module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    globalObject: 'this',
    filename: 'index.js',
    library: { name: 'new1', type: 'umd' },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [],
  resolve: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
};
