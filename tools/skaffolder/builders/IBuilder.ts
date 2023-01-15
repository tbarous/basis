import IProduct from '../products/IProduct';

interface IBuilder {
  produceReadme: () => IBuilder;
  produceProject: () => IBuilder;
  produceWebpack: () => IBuilder;
  produceNpmrc: () => IBuilder;
  produceBabel: () => IBuilder;
  produceTsconfig: () => IBuilder;
  producePackage: () => IBuilder;
  producePrettier: () => IBuilder;
  getProduct: () => IProduct;
}

export default IBuilder;
