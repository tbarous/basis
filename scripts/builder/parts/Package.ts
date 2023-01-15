import IPart from './IPart';
import File from '../../File';
import { chainable } from '../../Decorators';

class Package {
  filename = 'package.json';

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

  setName(name: string): Package {
    this.name = name;
    return this;
  }

  setGithubName(): Package {
    this.packageName = `@tbarous/${this.name}`;
    return this;
  }

  setStartingVersion(): Package {
    this.version = '0.1.0';
    return this;
  }

  setPrivateLicense(): Package {
    this.license = 'UNLICENSED';
    return this;
  }

  addBuildScript(): Package {
    this.scripts['build'] = 'webpack --config webpack/prod.webpack.config.ts';
    return this;
  }

  addDevScript(): Package {
    this.scripts['dev'] =
      'webpack serve --config webpack/dev.webpack.config.ts';
    return this;
  }

  addUnitTestScript(): Package {
    this.scripts['unit'] = 'jest';
    return this;
  }

  setIndexMain(): Package {
    this.main = 'dist/index.js';
    return this;
  }

  setCommonFiles(): Package {
    this.files = ['dist', 'README.md'];
    return this;
  }

  setGithubRegistry(): Package {
    this.publishConfig = { registry: 'https://npm.pkg.github.com/tbarous' };
    return this;
  }

  addReact(): Package {
    this.dependencies['react'] = '^18.2.0';
    this.devDependencies['@types/react'] = '^18.0.26';
    return this;
  }

  addReactDom(): Package {
    this.dependencies['react-dom'] = '^18.2.0';
    this.devDependencies['@types/react-dom'] = '^18.0.10';
    return this;
  }

  addStyledComponents(): Package {
    this.dependencies['styled-components'] = '^5.3.6';
    this.devDependencies['@types/styled-components'] = '^5.1.26';
    return this;
  }

  addMobx(): Package {
    this.dependencies['mobx'] = '^6.7.0';
    this.dependencies['mobx-react'] = '^7.6.0';
    return this;
  }

  addTypescript(): Package {
    this.devDependencies['typescript'] = '^4.9.4';
    this.devDependencies['@types/node'] = '^18.11.17';
    return this;
  }

  addJest(): Package {
    this.devDependencies['jest'] = '^29.3.1';
    this.devDependencies['@types/jest'] = '^29.2.4';
    return this;
  }

  addPrettier(): Package {
    this.devDependencies['prettier'] = '^2.8.1';
    return this;
  }

  addEssentialBabel(): Package {
    this.devDependencies['babel-loader'] = '^9.1.0';
    this.devDependencies['@babel/cli'] = '^7.20.7';
    this.devDependencies['@babel/core'] = '^7.20.7';
    this.devDependencies['@babel/preset-env'] = '^7.20.2';
    this.devDependencies['@babel/preset-typescript'] = '^7.18.6';
    return this;
  }

  addReactBabel(): Package {
    this.addEssentialBabel();
    this.devDependencies['@babel/preset-react'] = '^7.18.6';
    return this;
  }

  addEssentialWebpack(): Package {
    this.devDependencies['webpack'] = '^5.75.0';
    this.devDependencies['webpack-cli'] = '^5.0.1';
    this.devDependencies['@types/webpack'] = '^5.28.0';
    return this;
  }

  addReactWebpack(): Package {
    this.addEssentialWebpack();
    this.devDependencies['html-webpack-plugin'] = '^5.5.0';
    this.devDependencies['webpack-dev-server'] = '^4.11.1';
    this.devDependencies['@types/webpack-dev-server'] = '^4.7.2';
    return this;
  }

  addNodeTypes(): Package {
    this.devDependencies['@types/node'] = '^18.11.17';
    this.devDependencies['ts-node'] = '^10.9.1';
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      name: this.name,
      version: this.version,
      license: this.license,
      scripts: this.scripts,
      main: this.main,
      files: this.files,
      publishConfig: this.publishConfig,
      dependencies: this.dependencies,
      devDependencies: this.devDependencies,
    };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }

  async export(target: string) {
    await File.createJson(target, this.toJson());
  }
}

export default Package;
