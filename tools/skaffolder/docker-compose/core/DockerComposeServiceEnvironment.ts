export class DockerComposeServiceEnvironment {
  key
  value

  setKey(key) {
    this.key = key;
    return this;
  }

  setValue(value) {
    this.value.push(value);
    return this;
  }

  export() {
    return this.variables;
  }
}
