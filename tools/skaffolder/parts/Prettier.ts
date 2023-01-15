import IPart from './IPart';
import File from '../File';

class Prettier implements IPart {
  trailingComma = 'es5';
  tabWidth = 2;
  semi = true;
  singleQuote = true;
  filename = '.prettierrc.json';

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      trailingComma: this.trailingComma,
      tabWidth: this.tabWidth,
      semi: this.semi,
      singleQuote: this.singleQuote,
    };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }

  async export(target: string) {
    await File.createJson(target, this.toJson());
  }
}

export default Prettier;
