export const version = '0.1.0';

export const licenses = { private: 'UNLICENSED' };

export const scripts = {
  build: { build: 'webpack --config webpack/prod.webpack.config.ts' },
  dev: 'webpack serve --config webpack/dev.ts',
  unitTest: { 'test:unit': 'jest' },
};

export const mains = { distIndex: 'dist/index.js' };

export const files = ['dist', 'README.md'];

export const publishConfig = {
  registry: 'https://npm.pkg.github.com/tbarous',
};

const babelEssentials = {
  'babel-loader': '^9.1.0',
  '@babel/cli': '^7.20.7',
  '@babel/core': '^7.20.7',
  '@babel/preset-env': '^7.20.2',
  '@babel/preset-typescript': '^7.18.6',
};

const webpackEssentials = {
  webpack: '^5.75.0',
  'webpack-cli': '^5.0.1',
  'webpack-dev-server': '^4.11.1',
  '@types/webpack': '^5.28.0',
};

export const dependencies = {
  react: {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
  },

  styledComponents: {
    'styled-components': '^5.3.6',
  },
};

export const devDependencies = {
  typescript: {
    typescript: '^4.9.4',
    '@types/node': '^18.11.17',
  },

  reactTypes: {
    '@types/react': '^18.0.26',
    '@types/react-dom': '^18.0.10',
  },

  babelEssentials,

  babelReact: {
    ...babelEssentials,
    '@babel/preset-react': '^7.18.6',
  },

  styledComponentsTypes: {
    '@types/styled-components': '^5.1.26',
  },

  nodeTypes: {
    '@types/node': '^18.11.17',
    'ts-node': '^10.9.1',
  },

  webpackEssentials,

  webpackReact: {
    ...webpackEssentials,
    'webpack-dev-server': '^4.11.1',
    '@types/webpack-dev-server': '^4.7.2',
    'html-webpack-plugin': '^5.5.0',
  },

  jest: {
    jest: '^29.3.1',
    '@types/jest': '^29.2.4',
  },

  prettier: {
    prettier: '^2.8.1',
  },
};
