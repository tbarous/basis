import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export const fromRoot = (location: string) =>
  path.resolve(path.resolve(__dirname, '../'), location);

export const plugins: any = [
  new HtmlWebpackPlugin({
    scriptLoading: 'blocking',
    inject: 'body',
    template: fromRoot('templates/index.ejs'),
    filename: fromRoot('public/index.html'),
    publicPath: 'http://localhost:3000',
  }),
];

export default {
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
};
