import Construct, { IConstruct } from './Construct';

class LibraryConstruct extends Construct implements IConstruct {
  type = 'library';

  constructor(name: string) {
    super(name, 'products/libraries');
  }

  async createWebpack(): Promise<void> {
    this.webpacks.prod.setTypescriptEntry();
    this.webpacks.prod.setLibraryOutput();
    this.webpacks.prod.setTsModulesParsing();
    this.webpacks.prod.setTsResolves();
    this.webpacks.prod.setProduction();
    await this.exportWebpackProd();

    this.webpacks.dev.setTypescriptEntry();
    this.webpacks.dev.setLibraryOutput();
    this.webpacks.dev.setTsModulesParsing();
    this.webpacks.dev.setTsResolves();
    this.webpacks.dev.setDevelopment();
    await this.exportWebpackDev();
  }

  async createBabelrc() {
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
    this.packageJson.addUnitTestScript();
    this.packageJson.addEssentialBabel();
    this.packageJson.addEssentialWebpack();
    this.packageJson.addTypescript();
    this.packageJson.addNodeTypes();
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

export default LibraryConstruct;
