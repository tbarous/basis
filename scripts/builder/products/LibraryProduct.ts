import path from 'path';
import IProduct from './IProduct';
import IPart from '../parts/IPart';

class LibraryProduct implements IProduct {
  public name: string;
  public source: string = path.resolve(__dirname, `../../blueprints/library`);
  public type: string = 'library';
  public parts: IPart[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get target() {
    return path.resolve(__dirname, `../../libraries/${this.name}`);
  }

  listParts() {
    return this.parts;
  }
}

export default LibraryProduct;
