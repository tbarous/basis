import IPart from '../parts/IPart';

interface IProduct {
  name: string;
  type: string;
  parts: IPart[];
  listParts: () => IPart[];
}

export default IProduct;
