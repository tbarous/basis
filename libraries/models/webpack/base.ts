import { fromRoot } from '../utils/paths';

const entry = fromRoot('src/main.ts');
const output = { filename: 'bundle.js' };

const parsers = {
  typescript: {
    test: /\.ts?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
};

export default {
  devtool: 'inline-source-map',
  entry,
  output,
  module: {
    rules: [parsers.typescript],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
