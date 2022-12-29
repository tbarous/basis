import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'merge-deep';
import base, { fromRoot, plugins } from './base';

export default merge(base, {
  mode: 'development',
  entry: fromRoot('src/demo.tsx'),
  devServer: {
    static: [
      {
        directory: fromRoot('dist'),
        publicPath: '/dist',
        watch: true,
      },
      {
        directory: fromRoot('public'),
        watch: true,
      },
    ],
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
});
