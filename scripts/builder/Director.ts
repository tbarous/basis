import IBuilder from './builders/IBuilder';

class Director {
  private builder: IBuilder;

  public setBuilder(builder: IBuilder) {
    this.builder = builder;
  }

  getBuilder(): IBuilder {
    return this.builder;
  }

  public produceLibrary() {
    this.builder.produceBabel();
    this.builder.produceReadme();
    this.builder.producePackage();
    this.builder.produceProject();
    this.builder.produceNpmrc();
    this.builder.produceWebpack();
    this.builder.produceTsconfig();
  }
}

export default Director;
