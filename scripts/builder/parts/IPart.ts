interface IPart {
  export: (target: string) => Promise<void>;
  filename: string;
  setFilename: <T>(filename: string) => IPart;
  toJson: () => object;
}

export default IPart;
