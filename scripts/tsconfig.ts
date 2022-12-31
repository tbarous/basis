import { writeJSONToFile } from '@tbarous/utils';

class Tsconfig {
  compilerOptions = {};
  'ts-node': any = { compilerOptions: {} };

  addSourceMap() {
    this.compilerOptions['sourceMap'] = true;
  }

  setNoImplicitAny() {
    this.compilerOptions['noImplicitAny'] = true;
  }

  setES6Module() {
    this.compilerOptions['module'] = 'es6';
  }

  setNoEmit() {
    this.compilerOptions['noEmit'] = true;
  }

  setES5Target() {
    this.compilerOptions['target'] = 'es5';
  }

  setAllowJs() {
    this.compilerOptions['allowJs'] = true;
  }

  setNoAllowJs() {
    this.compilerOptions['allowJs'] = false;
  }

  setNodeModuleResolution() {
    this.compilerOptions['moduleResolution'] = 'node';
  }

  setEsModuleInterop() {
    this.compilerOptions['esModuleInterop'] = true;
  }

  setAllowSyntheticDefaultImports() {
    this.compilerOptions['allowSyntheticDefaultImports'] = true;
  }

  setDeclaration() {
    this.compilerOptions['declaration'] = true;
  }

  setOutDirDist() {
    this.compilerOptions['outDir'] = 'dist';
  }

  setJsxReact() {
    this.compilerOptions['jsx'] = 'react';
  }

  setTsNodeCommonJsModule() {
    this['ts-node'].compilerOptions['module'] = 'CommonJS';
  }

  async export(path: string) {
    await writeJSONToFile(path, this);
  }
}

export default Tsconfig;
