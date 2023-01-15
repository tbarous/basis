import File from '../../File';

class Tsconfig {
  compilerOptions = {};
  'ts-node': any = { compilerOptions: {} };
  filename = 'tsconfig.json';

  addSourceMap(): Tsconfig {
    this.compilerOptions['sourceMap'] = true;
    return this;
  }

  setNoImplicitAny(): Tsconfig {
    this.compilerOptions['noImplicitAny'] = true;
    return this;
  }

  setES6Module(): Tsconfig {
    this.compilerOptions['module'] = 'es6';
    return this;
  }

  setNoEmit(): Tsconfig {
    this.compilerOptions['noEmit'] = true;
    return this;
  }

  setES5Target(): Tsconfig {
    this.compilerOptions['target'] = 'es5';
    return this;
  }

  setAllowJs(): Tsconfig {
    this.compilerOptions['allowJs'] = true;
    return this;
  }

  setNoAllowJs(): Tsconfig {
    this.compilerOptions['allowJs'] = false;
    return this;
  }

  setNodeModuleResolution(): Tsconfig {
    this.compilerOptions['moduleResolution'] = 'node';
    return this;
  }

  setEsModuleInterop(): Tsconfig {
    this.compilerOptions['esModuleInterop'] = true;
    return this;
  }

  setAllowSyntheticDefaultImports(): Tsconfig {
    this.compilerOptions['allowSyntheticDefaultImports'] = true;
    return this;
  }

  setDeclaration(): Tsconfig {
    this.compilerOptions['declaration'] = true;
    return this;
  }

  setOutDirDist(): Tsconfig {
    this.compilerOptions['outDir'] = 'dist';
    return this;
  }

  setJsxReact(): Tsconfig {
    this.compilerOptions['jsx'] = 'react';
    return this;
  }

  setTsNodeCommonJsModule(): Tsconfig {
    this['ts-node'].compilerOptions['module'] = 'CommonJS';
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      compilerOptions: this.compilerOptions,
      'ts-node': this['ts-node'],
    };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }

  async export(target: string) {
    await File.createJson(target, this.toJson());
  }
}

export default Tsconfig;
