export const version = '0.1.0';

export const licenses = { private: 'UNLICENSED' };

export const scripts = {
  build: { build: 'webpack --config webpack/prod.webpack.config.ts' },
  dev: 'webpack serve --config webpack/dev.ts',
};

export const mains = { distIndex: 'dist/index.js' };

export const files = ['dist', 'README.md'];

export const publishConfig = {
  registry: 'https://npm.pkg.github.com/tbarous',
};

export const dependencies = {
  frontend: {
    'styled-components': '^5.3.6',
    react: '^18.2.0',
    'react-dom': '^18.2.0',
  },
};

export const devDependencies = {
  '@babel/cli': '^7.20.7',
  '@babel/core': '^7.20.7',
  '@babel/preset-env': '^7.20.2',
  '@babel/preset-react': '^7.18.6',
  '@babel/preset-typescript': '^7.18.6',
  '@types/jest': '^29.2.4',
  '@types/merge-deep': '^3.0.0',
  '@types/node': '^18.11.17',
  '@types/react': '^18.0.26',
  '@types/react-dom': '^18.0.10',
  '@types/react-router-dom': '^5.3.3',
  '@types/styled-components': '^5.1.26',
  '@types/webpack': '^5.28.0',
  '@types/webpack-dev-server': '^4.7.2',
  'babel-loader': '^9.1.0',
  'html-webpack-plugin': '^5.5.0',
  jest: '^29.3.1',
  'merge-deep': '^3.0.3',
  prettier: '^2.8.1',
  'ts-node': '^10.9.1',
  typescript: '^4.9.4',
  webpack: '^5.75.0',
  'webpack-cli': '^5.0.1',
  'webpack-dev-server': '^4.11.1',
};
