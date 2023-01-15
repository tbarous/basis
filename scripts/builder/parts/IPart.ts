interface IPart {
  export: (target: string) => Promise<void>;
  // Maybe id is better
  filename: string;
  setFilename: <T>(filename: string) => IPart;
  toJson: () => object;
}

export default IPart;
