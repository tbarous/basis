import path from 'path';
import IProduct from './IProduct';
import IPart from '../parts/IPart';

class MicrofrontendProduct implements IProduct {
  public name: string;
  public source: string = path.resolve(
    __dirname,
    `../../../blueprints/microfrontend`
  );
  public type: string = 'microfrontend';
  public parts: IPart[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get target() {
    return path.resolve(__dirname, `../../../microfrontends/${this.name}`);
  }

  listParts() {
    return this.parts;
  }
}

export default MicrofrontendProduct;
