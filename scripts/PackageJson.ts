class PackageJson {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  get names() {
    return {
      github: `@tbarous/${this.name}`,
    };
  }

  static versions = {
    start: '0.1.0',
  };

  static licenses = {
    private: { private: 'UNLICENSED' },
  };

  static scripts = {
    build: { build: 'webpack --config webpack/prod.webpack.config.ts' },
    dev: { dev: 'webpack serve --config webpack/dev.webpack.config.ts' },
    unitTest: { 'test:unit': 'jest' },
  };

  static mains = { distIndex: 'dist/index.js' };
  static files = { essential: ['dist', 'README.md'] };

  static publishConfigs = {
    github: {
      registry: 'https://npm.pkg.github.com/tbarous',
    },
  };

  static babelEssentialDeps = {
    'babel-loader': '^9.1.0',
    '@babel/cli': '^7.20.7',
    '@babel/core': '^7.20.7',
    '@babel/preset-env': '^7.20.2',
    '@babel/preset-typescript': '^7.18.6',
  };

  static webpackEssentialDeps = {
    webpack: '^5.75.0',
    'webpack-cli': '^5.0.1',
    'webpack-dev-server': '^4.11.1',
    '@types/webpack': '^5.28.0',
  };

  static dependencies = {
    react: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },

    styledComponents: {
      'styled-components': '^5.3.6',
    },

    mobx: {
      mobx: '^6.7.0',
      'mobx-react': '^7.6.0',
    },
  };

  static devDependencies = {
    typescript: {
      typescript: '^4.9.4',
      '@types/node': '^18.11.17',
    },

    reactTypes: {
      '@types/react': '^18.0.26',
      '@types/react-dom': '^18.0.10',
    },

    babelEssentials: PackageJson.babelEssentialDeps,

    babelReact: {
      ...PackageJson.babelEssentialDeps,
      '@babel/preset-react': '^7.18.6',
    },

    styledComponentsTypes: {
      '@types/styled-components': '^5.1.26',
    },

    nodeTypes: {
      '@types/node': '^18.11.17',
      'ts-node': '^10.9.1',
    },

    webpackEssentials: PackageJson.webpackEssentialDeps,

    webpackReact: {
      ...PackageJson.webpackEssentialDeps,
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
}

export default PackageJson;
