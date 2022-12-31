import { exec } from 'child_process';
import { promisify } from 'util';
const run = promisify(exec);
import path from 'path';
import PackageJson from '../PackageJson';
import {
  removeDir,
  copyDir,
  writeJSONToFile,
  writeToFile,
} from '@tbarous/utils';
import Webpack from '../webpack';
import Babel from '../Babel';
import Tsconfig from '../tsconfig';

export interface IConstruct {
  cleanup: () => void;
  copyBlueprint: () => void;
  createBabelrc: () => void;
}

abstract class Construct implements IConstruct {
  name: string;
  type: string;
  readmeTemplate: string;
  baseProductPath: string;

  packageJson: PackageJson;
  babelrc: Babel = new Babel();
  webpacks: {
    prod: Webpack;
    dev: Webpack;
  };
  tsconfiguration: Tsconfig = new Tsconfig();

  constructor(name: string) {
    this.name = name;
    this.packageJson = new PackageJson(this.name);
    this.webpacks.prod = new Webpack(this.paths.webpack.prod, name);
    this.webpacks.dev = new Webpack(this.paths.webpack.dev, name);
  }

  get paths() {
    const product = path.resolve(
      __dirname,
      `../../${this.baseProductPath}/${this.name}`
    );
    return {
      product,
      blueprint: path.resolve(__dirname, `../../blueprints/${this.type}`),
      webpack: {
        prod: `${product}\\webpack\\prod.webpack.config.ts`,
        dev: `${product}\\webpack\\dev.webpack.config.ts`,
      },
      readme: `${product}\\README.md`,
      project: `${product}\\project.json`,
      babelrc: `${product}\\.babelrc`,
      npmrc: `${product}\\.npmrc`,
      tsconfig: `${product}\\tsconfig.json`,
      package: `${product}\\package.json`,
    };
  }

  // Cleanup the product directory
  async cleanup() {
    if (!this.paths.product) return;

    await removeDir(this.paths.product);
  }

  // Copy blueprint directory to product directory
  async blueprint() {
    if (!this.paths.blueprint) return;

    await copyDir(this.paths.blueprint, this.paths.product);
  }

  // Create product production webpack file
  async exportWebpackProd() {
    await this.webpacks.prod.export(this.paths.webpack.prod);
  }

  // Create product development webpack file
  async exportWebpackDev() {
    await this.webpacks.dev.export(this.paths.webpack.dev);
  }

  // Create product .babelrc file
  async exportBabelrc() {
    await writeJSONToFile(this.paths.babelrc, this.babelrc);
  }

  // Create product project.json file
  async exportProjectJson() {
    await writeJSONToFile(this.paths.project, {
      name: this.name,
      type: this.type,
    });
  }

  // Create product README.md file
  async exportReadme() {
    await writeToFile(this.paths.readme, `# ${this.name} - ${this.type}`);
  }

  // Create product tsconfig.json file
  async exportTsconfig() {
    await this.tsconfiguration.export(this.paths.tsconfig);
  }

  // Create product .npmrc file
  async exportNpmrc() {
    await writeToFile(
      this.paths.npmrc,
      `#!/bin/bash
    //npm.pkg.github.com/:_authToken=\${NPM_TOKEN}
    @tbarous:registry=https://npm.pkg.github.com`
    );
  }

  // Create product package.json file
  async createPackageJson() {}

  // Install dependencies on product
  async installDeps() {
    this.runCommand(
      `cd ${this.paths.product} && yarn`,
      'Installing dependencies...'
    );
  }

  // Build product
  async build() {
    this.runCommand(`cd ${this.paths.product} && yarn build`, 'Building...');
  }

  // Bump product's version
  async bumpVersion() {
    this.runCommand(
      `cd ${this.paths.product} && npm version minor`,
      'Bumping version...'
    );
  }

  // Publish product
  async publish() {
    this.runCommand(
      `cd ${this.paths.product} && npm publish`,
      'Publishing package...'
    );
  }

  // Run command
  async runCommand(command: string, message: string) {
    try {
      const { stdout, stderr } = await run(command);

      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  async create() {}
}

export default Construct;
