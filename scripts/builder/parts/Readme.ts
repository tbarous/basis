import File from '../../File';

class Readme {
  title: string = '';

  setTitle(title: string): Readme {
    this.title = title;
    return this;
  }

  toString() {
    return JSON.stringify(this);
  }

  async export(target: string) {
    await File.createFile(target, this.toString());
  }
}

export default Readme;
