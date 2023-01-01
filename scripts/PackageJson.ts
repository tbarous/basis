import { writeJSONToFile } from '@tbarous/utils';

class PackageJson {
  private name: string;
  private packageName: string;
  private version: string;
  private license: string;
  private scripts: Record<string, string> = {};
  private main: string;
  private files: string[] = [];
  private publishConfig: Record<string, string> = {};
  private dependencies: Record<string, string> = {};
  private devDependencies: Record<string, string> = {};

  constructor(name: string) {
    this.name = name;
  }

  setGithubName() {
    this.packageName = `@tbarous/${this.name}`;
  }

  setStartingVersion() {
    this.version = '0.1.0';
  }

  setPrivateLicense() {
    this.license = 'UNLICENSED';
  }

  addBuildScript() {
    this.scripts['build'] = 'webpack --config webpack/prod.webpack.config.ts';
  }

  addDevScript() {
    this.scripts['dev'] =
      'webpack serve --config webpack/dev.webpack.config.ts';
  }

  addUnitTestScript() {
    this.scripts['unit'] = 'jest';
  }

  setIndexMain() {
    this.main = 'dist/index.js';
  }

  setCommonFiles() {
    this.files = ['dist', 'README.md'];
  }

  setGithubRegistry() {
    this.publishConfig = {
      registry: 'https://npm.pkg.github.com/tbarous',
    };
  }

  addReact() {
    this.dependencies['react'] = '^18.2.0';
    this.devDependencies['@types/react'] = '^18.0.26';
  }

  addReactDom() {
    this.dependencies['react-dom'] = '^18.2.0';
    this.devDependencies['@types/react-dom'] = '^18.0.10';
  }

  addStyledComponents() {
    this.dependencies['styled-components'] = '^5.3.6';
    this.devDependencies['@types/styled-components'] = '^5.1.26';
  }

  addMobx() {
    this.dependencies['mobx'] = '^6.7.0';
    this.dependencies['mobx-react'] = '^7.6.0';
  }

  addTypescript() {
    this.devDependencies['typescript'] = '^4.9.4';
    this.devDependencies['@types/node'] = '^18.11.17';
  }

  addJest() {
    this.devDependencies['jest'] = '^29.3.1';
    this.devDependencies['@types/jest'] = '^29.2.4';
  }

  addPrettier() {
    this.devDependencies['prettier'] = '^2.8.1';
  }

  addEssentialBabel() {
    this.devDependencies['babel-loader'] = '^9.1.0';
    this.devDependencies['@babel/cli'] = '^7.20.7';
    this.devDependencies['@babel/core'] = '^7.20.7';
    this.devDependencies['@babel/preset-env'] = '^7.20.2';
    this.devDependencies['@babel/preset-typescript'] = '^7.18.6';
  }

  addReactBabel() {
    this.addEssentialBabel();
    this.devDependencies['@babel/preset-react'] = '^7.18.6';
  }

  addEssentialWebpack() {
    this.devDependencies['webpack'] = '^5.75.0';
    this.devDependencies['webpack-cli'] = '^5.0.1';
    this.devDependencies['@types/webpack'] = '^5.28.0';
  }

  addReactWebpack() {
    this.addEssentialWebpack();
    this.devDependencies['html-webpack-plugin'] = '^5.5.0';
    this.devDependencies['webpack-dev-server'] = '^4.11.1';
    this.devDependencies['@types/webpack-dev-server'] = '^4.7.2';
  }

  addNodeTypes() {
    this.devDependencies['@types/node'] = '^18.11.17';
    this.devDependencies['ts-node'] = '^10.9.1';
  }

  async export(path: string) {
    const result: any = {
      name: this.packageName,
      version: this.version,
      license: this.license,
      scripts: this.scripts,
      main: this.main,
      files: this.files,
      publishConfig: this.publishConfig,
      dependencies: this.dependencies,
      devDependencies: this.devDependencies,
    };

    await writeJSONToFile(path, result);
  }
}

export default PackageJson;
