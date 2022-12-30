import { fromRoot } from './common';

export const entries = (path: string) => ({
  indexTypescript: `${path}/src/index.ts`,
  indexReact: `${path}/src/index.tsx`,
});

export const outputs = {
  index: { filename: 'index.js' },
  lib: (name: string) => ({
    globalObject: 'this',
    filename: 'index.js',
    library: {
      name,
      type: 'umd',
    },
  }),
};

export const modules = {
  ts: {
    rules: [
      {
        test: '/.(js|jsx|tsx|ts)$/',
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
    ],
  },
};

export const resolves = {
  ts: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
};

// const plugins = {
//   htmlPlugin: new HtmlWebpackPlugin({
//     scriptLoading: 'blocking',
//     inject: 'body',
//     template: fromRoot('templates/index.ejs'),
//     filename: fromRoot('public/index.html'),
//     publicPath: 'http://localhost:3000',
//   }),
// };

export const externals = {
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },
};

const devServer = {
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
};

const modes = {
  development: 'development',
  production: 'production',
};
