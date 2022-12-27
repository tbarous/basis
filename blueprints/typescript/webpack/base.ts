import { fromRoot } from '../utils/paths';

const entry = fromRoot('src/main.ts');
const output = { filename: 'bundle.js' };

const parsers = {
  typescript: {
    test: /\.(ts)$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
  },
};

export default {
  entry,
  output,
  module: {
    rules: [parsers.typescript],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
