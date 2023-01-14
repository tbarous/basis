import IProduct from "../products/IProduct";

interface IBuilder {
  produceReadme: () => void;
  produceProject: () => void;
  produceWebpack: () => void;
  produceNpmrc: () => void;
  produceBabel: () => void;
  produceTsconfig: () => void;
  producePackage: () => void;
  getProduct: () => IProduct;
}

export default IBuilder;
