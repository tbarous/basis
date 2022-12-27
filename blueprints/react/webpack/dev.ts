import merge from 'merge-deep';
import base from './base';
import { fromRoot } from '@baroce/utils';

const assets = {
  directory: fromRoot('dist'),
  publicPath: '/dist',
  watch: true,
};

const html = {
  directory: fromRoot('public'),
  watch: true,
};

const devServer = {
  static: [assets, html],
  compress: true,
  port: 3000,
  hot: true,
  open: true,
};

const config = merge(base, {
  mode: 'development',
  devServer,
});

export default config;
