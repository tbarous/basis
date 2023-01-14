import File from '../../File';

class Project {
  public name: string = '';

  setName(name: string): Project {
    this.name = name;
    return this;
  }

  toString() {
    return JSON.stringify(this);
  }

  async export(target: string) {
    await File.createJson(target, this);
  }
}

export default Project;
