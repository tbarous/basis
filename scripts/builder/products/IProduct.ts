import IPart from '../parts/IPart';

interface IProduct {
  name: string;
  source: string;
  type: string;
  parts: IPart[];
  target: string;
  listParts: () => IPart[];
}

export default IProduct;
