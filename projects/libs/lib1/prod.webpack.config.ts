module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    globalObject: 'this',
    filename: 'index.js',
    library: { name: 'lib1', type: 'umd' },
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
