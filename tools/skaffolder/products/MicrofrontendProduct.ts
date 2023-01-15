import IProduct from './IProduct';
import IPart from '../parts/IPart';

class MicrofrontendProduct implements IProduct {
  public name: string;
  public type: string = 'frontend';
  public parts: IPart[] = [];

  constructor(name: string) {
    this.name = name;
  }

  listParts() {
    return this.parts;
  }
}

export default MicrofrontendProduct;
