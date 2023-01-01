import Construct, { IConstruct } from './Construct';

class MicrofrontendConstruct extends Construct implements IConstruct {
  type = 'microfrontend';

  constructor(name: string) {
    super(name, 'products/microfrontends');
  }

  async createWebpack(): Promise<void> {
    this.webpacks.prod.setReactEntry();
    this.webpacks.prod.setLibraryOutput();
    this.webpacks.prod.setTsModulesParsing();
    this.webpacks.prod.addHtmlWebpackPlugin();
    this.webpacks.prod.setTsResolves();
    this.webpacks.prod.setProduction();
    this.webpacks.prod.importHtmlWebpackPlugin();
    await this.exportWebpackProd();

    this.webpacks.dev.setReactEntry();
    this.webpacks.dev.setLibraryOutput();
    this.webpacks.dev.setTsModulesParsing();
    this.webpacks.dev.addHtmlWebpackPlugin();
    this.webpacks.dev.setTsResolves();
    this.webpacks.dev.importHtmlWebpackPlugin();
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

  async createTsconfig(): Promise<void> {
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
    this.packageJson.setGithubName();
    this.packageJson.setStartingVersion();
    this.packageJson.setIndexMain();
    this.packageJson.setCommonFiles();
    this.packageJson.setPrivateLicense();
    this.packageJson.setGithubRegistry();
    this.packageJson.addBuildScript();
    this.packageJson.addDevScript();
    this.packageJson.addUnitTestScript();
    this.packageJson.addReact();
    this.packageJson.addReactDom();
    this.packageJson.addStyledComponents();
    this.packageJson.addMobx();
    this.packageJson.addReactBabel();
    this.packageJson.addTypescript();
    this.packageJson.addNodeTypes();
    this.packageJson.addReactWebpack();
    this.exportPackageJson();
  }

  async create(): Promise<void> {
    await this.cleanup();
    await this.blueprint();
    await this.createBabelrc();
    await this.exportReadme();
    await this.createPackageJson();
    await this.exportProjectJson();
    await this.exportNpmrc();
    await this.createWebpack();
    await this.createTsconfig();
    await this.installDeps();
    await this.build();
  }
}

export default MicrofrontendConstruct;
