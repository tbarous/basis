import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const root = path.resolve(__dirname, '../');
const fromRoot = (location: string) => path.resolve(root, location);

const entry = fromRoot('src/main.tsx');
const output = { filename: 'bundle.js' };

const htmlPlugin = new HtmlWebpackPlugin({
  scriptLoading: 'blocking',
  inject: 'body',
  template: fromRoot('src/templates/index.ejs'),
  filename: fromRoot('public/index.html'),
  publicPath: 'http://localhost:3000',
});

const parsers = {
  javascript: {
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
};

export default {
  entry,
  output,
  module: {
    rules: [parsers.javascript],
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
};
