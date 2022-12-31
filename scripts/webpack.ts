import { jsTsReactRegex, nodeModulesRegex } from './common';

export const entries = (path: string) => ({
  indexTypescript: `${path}/src/index.ts`,
  indexReact: `${path}/src/index.tsx`,
  indexReactDemo: `${path}/src/demo.tsx`,
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
        test: jsTsReactRegex,
        exclude: nodeModulesRegex,
        loader: 'babel-loader',
      },
    ],
  },
};

export const resolves = {
  ts: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
};

export const plugins = (path: string) => ({
  htmlPlugin: `REMOVEnew HtmlWebpackPlugin({scriptLoading: 'blocking',inject: 'body',templateContent: '<div id="root"></div>',filename: '${path}/public/index.html',publicPath: 'http://localhost:3000'})REMOVE`,
});

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

export const devServer = (path: string) => ({
  devServer: {
    static: [
      {
        directory: `${path}/dist`,
        publicPath: '/dist',
        watch: true,
      },
      {
        directory: `${path}/public`,
        watch: true,
      },
    ],
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
});

const modes = {
  development: 'development',
  production: 'production',
};
