import IBuilder from './IBuilder';
import LibraryProduct from '../products/LibraryProduct';
import Readme from '../parts/Readme';
import Project from '../parts/Project';
import Npmrc from '../parts/Npmrc';
import Tsconfig from '../parts/Tsconfig';
import Package from '../parts/Package';
import Babel from '../parts/Babel';
import Webpack from '../parts/Webpack';
import IProduct from '../products/IProduct';

class LibraryBuilder implements IBuilder {
  private product: LibraryProduct;

  constructor(name: string) {
    this.product = new LibraryProduct(name);
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
        .setName(this.product.name)
        .setGithubName()
        .setStartingVersion()
        .setIndexMain()
        .setCommonFiles()
        .setPrivateLicense()
        .setGithubRegistry()
        .addBuildScript()
        .addUnitTestScript()
        .addEssentialBabel()
        .addEssentialWebpack()
        .addTypescript()
        .addNodeTypes()
    );
    return this;
  }

  public produceBabel() {
    this.product.parts.push(new Babel().addTypescriptPreset().addEnvPreset());
    return this;
  }

  public produceWebpack() {
    this.product.parts.push(
      new Webpack()
        .setFilename('prod.webpack.config.ts')
        .setName(this.product.name)
        .setTypescriptEntry()
        .setLibraryOutput()
        .setTsModulesParsing()
        .setTsResolves()
        .setProduction()
    );

    this.product.parts.push(
      new Webpack()
        .setFilename('dev.webpack.config.ts')
        .setName(this.product.name)
        .setTypescriptEntry()
        .setLibraryOutput()
        .setTsModulesParsing()
        .setTsResolves()
        .setDevelopment()
    );

    return this;
  }

  getProduct(): IProduct {
    return this.product;
  }
}

export default LibraryBuilder;
