import File from '../../File';

class Project {
  public name: string = '';
  filename = 'project.json';

  setName(name: string): Project {
    this.name = name;
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      name: this.name,
    };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }

  async export(target: string) {
    await File.createJson(target, this.toJson());
  }
}

export default Project;
