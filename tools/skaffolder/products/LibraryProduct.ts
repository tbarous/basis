import path from 'path';
import IProduct from './IProduct';
import IPart from '../parts/IPart';

class LibraryProduct implements IProduct {
  public name: string;
  public type: string = 'lib';
  public parts: IPart[] = [];

  constructor(name: string) {
    this.name = name;
  }

  listParts() {
    return this.parts;
  }
}

export default LibraryProduct;
