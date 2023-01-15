import File from '../../File';

class Readme {
  title: string = '';
  filename = 'README.md';

  setTitle(title: string): Readme {
    this.title = title;
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      name: this.title,
    };
  }

  toString() {
    return `# ${this.title}`;
  }

  async export(target: string) {
    await File.createFile(target, this.toString());
  }
}

export default Readme;
