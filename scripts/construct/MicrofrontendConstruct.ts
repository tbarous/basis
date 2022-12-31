import Babel from '../Babel';
import Tsconfig from '../tsconfig';
import Webpack from '../webpack';
import Construct, { IConstruct } from './Construct';

class MicrofrontendConstruct extends Construct implements IConstruct {
  type = 'microfrontend';
  baseProductPath = 'products/microfrontends';

  async createWebpack(): Promise<void> {
    this.webpacks.prod.setReactEntry();
    this.webpacks.prod.setLibraryOutput();
    this.webpacks.prod.setTsModulesParsing();
    this.webpacks.prod.addHtmlWebpackPlugin();
    this.webpacks.prod.setTsResolves();
    this.webpacks.prod.setProduction();
    this.webpacks.prod.importHtmlWebpackPlugin();
    await this.exportWebpackProd();
    this.webpacks.dev.setDevelopment();
    this.webpacks.dev.addDevServer();
    this.webpacks.dev.setReactDemoEntry();
    await this.exportWebpackDev();
  }

  async createBabelrc() {
    this.babelrc.addReactPreset();
    this.babelrc.addTypescriptPreset();
    this.babelrc.addEnvPreset();
    this.exportBabelrc();
  }

  async tsconfig(): Promise<void> {
    this.tsconfiguration.addSourceMap();
    this.tsconfiguration.setNoImplicitAny();
    this.tsconfiguration.setES6Module();
    this.tsconfiguration.setNoEmit();
    this.tsconfiguration.setES5Target();
    this.tsconfiguration.setAllowJs();
    this.tsconfiguration.setNoAllowJs();
    this.tsconfiguration.setNodeModuleResolution();
    this.tsconfiguration.setEsModuleInterop();
    this.tsconfiguration.setAllowSyntheticDefaultImports();
    this.tsconfiguration.setDeclaration();
    this.tsconfiguration.setOutDirDist();
    this.tsconfiguration.setJsxReact();
    this.tsconfiguration.setTsNodeCommonJsModule();
    await this.exportTsconfig();
  }

  async createPackageJson(): Promise<void> {
    const config = {
      name: this.packageJson.names.github,
      version: PackageJson.versions.start,
      main: PackageJson.mains.distIndex,
      files: PackageJson.files,
      license: PackageJson.licenses.private,
      publishConfig: PackageJson.publishConfigs.github,
      scripts: {
        ...PackageJson.scripts.build,
        ...PackageJson.scripts.dev,
        ...PackageJson.scripts.unitTest,
      },
      dependencies: {
        ...PackageJson.dependencies.react,
        ...PackageJson.dependencies.styledComponents,
        ...PackageJson.dependencies.mobx,
      },
      devDependencies: {
        ...PackageJson.devDependencies.babelReact,
        ...PackageJson.devDependencies.typescript,
        ...PackageJson.devDependencies.reactTypes,
        ...PackageJson.devDependencies.styledComponentsTypes,
        ...PackageJson.devDependencies.nodeTypes,
        ...PackageJson.devDependencies.webpackReact,
      },
    };

    await writeJSONToFile(this.packageJsonPath, config);
  }

  async create(): Promise<void> {
    await this.cleanup();
    await this.copyBlueprint();
    await this.createBabelrc();
    await this.readme();
    await this.createPackageJson();
    await this.projectJson();
    await this.npmrc();
    await this.createWebpack();
    await this.tsconfig();
  }
}

export default MicrofrontendConstruct;
