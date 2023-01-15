import IBuilder from './builders/IBuilder';

class Director {
  private builder: IBuilder;

  public setBuilder(builder: IBuilder) {
    this.builder = builder;
    return this;
  }

  getBuilder(): IBuilder {
    return this.builder;
  }

  public produceLibrary() {
    this.builder
      .produceBabel()
      .produceReadme()
      .producePackage()
      .produceProject()
      .produceNpmrc()
      .produceWebpack()
      .produceTsconfig();

    return this;
  }
}

export default Director;
