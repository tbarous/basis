import IBuilder from './IBuilder';
import Readme from '../parts/Readme';
import Project from '../parts/Project';
import Npmrc from '../parts/Npmrc';
import Tsconfig from '../parts/Tsconfig';
import Package from '../parts/Package';
import Babel from '../parts/Babel';
import Webpack from '../parts/Webpack';
import IProduct from '../products/IProduct';
import MicrofrontendProduct from '../products/MicrofrontendProduct';

class MicrofrontendBuilder implements IBuilder {
  private product: MicrofrontendProduct;

  constructor(name: string) {
    this.product = new MicrofrontendProduct(name);
  }

  public produceReadme() {
    this.product.parts.push(
      new Readme().setTitle(this.product.name.toUpperCase())
    );
    return this;
  }

  public produceProject() {
    this.product.parts.push(new Project().setName(this.product.name));
    return this;
  }

  public produceNpmrc() {
    this.product.parts.push(
      new Npmrc()
        .setRegistry('//npm.pkg.github.com/')
        .setToken(this.product.name)
        .setUrl('https://npm.pkg.github.com')
        .setUsername('@tbarous')
    );
    return this;
  }

  public produceTsconfig() {
    this.product.parts.push(
      new Tsconfig()
        .addSourceMap()
        .setNoImplicitAny()
        .setES6Module()
        .setNoEmit()
        .setES5Target()
        .setAllowJs()
        .setNoAllowJs()
        .setNodeModuleResolution()
        .setEsModuleInterop()
        .setAllowSyntheticDefaultImports()
        .setDeclaration()
        .setOutDirDist()
        .setJsxReact()
        .setTsNodeCommonJsModule()
    );
    return this;
  }

  public producePackage() {
    this.product.parts.push(
      new Package()
        .setGithubName()
        .setStartingVersion()
        .setIndexMain()
        .setCommonFiles()
        .setPrivateLicense()
        .setGithubRegistry()
        .addBuildScript()
        .addDevScript()
        .addUnitTestScript()
        .addReact()
        .addReactDom()
        .addStyledComponents()
        .addMobx()
        .addReactBabel()
        .addTypescript()
        .addNodeTypes()
        .addReactWebpack()
    );
    return this;
  }

  public produceBabel() {
    this.product.parts.push(
      new Babel().addReactPreset().addTypescriptPreset().addEnvPreset()
    );
    return this;
  }

  public produceWebpack() {
    this.product.parts.push(
      new Webpack()
        .setFilename('prod.webpack.config.ts')
        .setName(this.product.name)
        .setReactEntry()
        .setLibraryOutput()
        .setTsModulesParsing()
        .addHtmlWebpackPlugin()
        .setTsResolves()
        .setProduction()
        .importHtmlWebpackPlugin()
    );

    this.product.parts.push(
      new Webpack()
        .setFilename('dev.webpack.config.ts')
        .setName(this.product.name)
        .setReactEntry()
        .setLibraryOutput()
        .setTsModulesParsing()
        .addHtmlWebpackPlugin()
        .setTsResolves()
        .importHtmlWebpackPlugin()
        .setDevelopment()
        .addDevServer()
        .setReactDemoEntry()
    );

    return this;
  }

  getProduct(): IProduct {
    return this.product;
  }
}

export default MicrofrontendBuilder;
