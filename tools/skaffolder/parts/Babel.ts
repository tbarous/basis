import IPart from './IPart';
import File from '../File';

class Babel implements IPart {
  presets = [];
  filename = '.babelrc';

  addReactPreset(): Babel {
    this.presets.push('@babel/react');
    return this;
  }

  addTypescriptPreset(): Babel {
    this.presets.push('@babel/typescript');
    return this;
  }

  addEnvPreset(): Babel {
    this.presets.push(['@babel/env', { modules: false }]);
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      presets: this.presets,
    };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }

  async export(target: string) {
    await File.createFile(target, this.toString());
  }
}

export default Babel;
