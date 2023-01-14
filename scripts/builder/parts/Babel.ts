import IPart from './IPart';
import File from '../../File';

class Babel implements IPart {
  presets = [];

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

  toString() {
    return JSON.stringify(this);
  }

  async export(target: string) {
    await File.createFile(target, this.toString());
  }
}

export default Babel;
