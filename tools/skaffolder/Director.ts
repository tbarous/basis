import IBuilder from './builders/IBuilder';
import LibraryBuilder from './builders/LibraryBuilder';
import MicrofrontendBuilder from './builders/MicrofrontendBuilder';

class Director {
  private builder: IBuilder;

  public setBuilder(builder: IBuilder) {
    this.builder = builder;
    return this;
  }

  getBuilder(): IBuilder {
    return this.builder;
  }

  public produce() {
    if (this.builder instanceof LibraryBuilder) {
      this.produceLibrary();
    }

    if (this.builder instanceof MicrofrontendBuilder) {
      this.produceMicrofrontend();
    }

    return this;
  }

  public produceLibrary() {
    this.builder
      .produceBabel()
      .produceReadme()
      .producePackage()
      .produceProject()
      .produceNpmrc()
      .produceWebpack()
      .produceTsconfig()
      .producePrettier();

    return this;
  }

  public produceMicrofrontend() {
    this.builder
      .produceBabel()
      .produceReadme()
      .producePackage()
      .produceProject()
      .produceNpmrc()
      .produceWebpack()
      .produceTsconfig()
      .producePrettier();

    return this;
  }
}

export default Director;
