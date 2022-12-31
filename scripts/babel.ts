import { writeJSONToFile } from '@tbarous/utils';

class Babel {
  presets = [];

  addReactPreset() {
    this.presets.push('@babel/react');
  }

  addTypescriptPreset() {
    this.presets.push('@babel/typescript');
  }

  addEnvPreset() {
    this.presets.push(['@babel/env', { modules: false }]);
  }

  async export(path: string) {
    await writeJSONToFile(path, this);
  }
}

export default Babel;
