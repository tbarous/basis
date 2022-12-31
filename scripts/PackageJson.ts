import { writeJSONToFile } from '@tbarous/utils';

class PackageJson {
  private name: string;
  private packageName: string;

  private config: {
    name: string;
    version: string;
    license: string;
    scripts: any;
    main: string;
    files: any;
    publishConfig: any;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  } = {
    name: '',
    version: '',
    license: '',
    scripts: {},
    main: '',
    files: '',
    publishConfig: '',
    dependencies: {},
    devDependencies: {},
  };

  constructor(name: string) {
    this.name = name;
  }

  setGithubName() {
    this.config.name = `@tbarous/${this.name}`;
  }

  setStartingVersion() {
    this.config.version = '0.1.0';
  }

  setPrivateLicense() {
    this.config.license = 'UNLICENSED';
  }

  addBuildScript() {
    this.config.scripts['build'] =
      'webpack --config webpack/prod.webpack.config.ts';
  }

  addDevScript() {
    this.config.scripts['dev'] =
      'webpack serve --config webpack/dev.webpack.config.ts';
  }

  addUnitTestScript() {
    this.config.scripts['unit'] = 'jest';
  }

  setIndexMain() {
    this.config.main = 'dist/index.js';
  }

  setCommonFiles() {
    this.config.files = ['dist', 'README.md'];
  }

  setGithubRegistry() {
    this.config.publishConfig = {
      registry: 'https://npm.pkg.github.com/tbarous',
    };
  }

  addReact() {
    this.config.dependencies['react'] = '^18.2.0';
    this.config.devDependencies['@types/react'] = '^18.0.26';
  }

  addReactDom() {
    this.config.dependencies['react-dom'] = '^18.2.0';
    this.config.devDependencies['@types/react-dom'] = '^18.0.10';
  }

  addStyledComponents() {
    this.config.dependencies['styled-components'] = '^5.3.6';
    this.config.devDependencies['@types/styled-components'] = '^5.1.26';
  }

  addMobx() {
    this.config.dependencies['mobx'] = '^6.7.0';
    this.config.dependencies['mobx-react'] = '^7.6.0';
  }

  addTypescript() {
    this.config.devDependencies['typescript'] = '^4.9.4';
    this.config.devDependencies['@types/node'] = '^18.11.17';
  }

  addJest() {
    this.config.devDependencies['jest'] = '^29.3.1';
    this.config.devDependencies['@types/jest'] = '^29.2.4';
  }

  addPrettier() {
    this.config.devDependencies['prettier'] = '^2.8.1';
  }

  addEssentialBabel() {
    this.config.devDependencies['babel-loader'] = '^9.1.0';
    this.config.devDependencies['@babel/cli'] = '^7.20.7';
    this.config.devDependencies['@babel/core'] = '^7.20.7';
    this.config.devDependencies['@babel/preset-env'] = '^7.20.2';
    this.config.devDependencies['@babel/preset-typescript'] = '^7.18.6';
  }

  addReactBabel() {
    this.addEssentialBabel();
    this.config.devDependencies['@babel/preset-react'] = '^7.18.6';
  }

  addEssentialWebpack() {
    this.config.devDependencies['webpack'] = '^5.75.0';
    this.config.devDependencies['webpack-cli'] = '^5.0.1';
    this.config.devDependencies['@types/webpack'] = '^5.28.0';
  }

  addReactWebpack() {
    this.addEssentialWebpack();
    this.config.devDependencies['html-webpack-plugin'] = '^5.5.0';
    this.config.devDependencies['webpack-dev-server'] = '^4.11.1';
    this.config.devDependencies['@types/webpack-dev-server'] = '^4.7.2';
  }

  addNodeTypes() {
    this.config.devDependencies['@types/node'] = '^18.11.17';
    this.config.devDependencies['ts-node'] = '^10.9.1';
  }

  async export(path: string) {
    await writeJSONToFile(path, this);
  }
}

export default PackageJson;
