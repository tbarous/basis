import IPart from './IPart';
import File from '../../File';
import { chainable } from '../../Decorators';

class Npmrc implements IPart {
  registry: string;
  token: string;
  username: string;
  url: string;
  filename = '.npmrc';

  setRegistry(registry: string): Npmrc {
    this.registry = registry;
    return this;
  }

  setToken(token: string): Npmrc {
    this.token = token;
    return this;
  }

  setUsername(username: string): Npmrc {
    this.username = username;
    return this;
  }

  setUrl(url: string): Npmrc {
    this.url = url;
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }

  toJson() {
    return {
      registry: this.registry,
      token: this.token,
      username: this.username,
      url: this.url,
    };
  }

  toString() {
    return `#!/bin/bash
    ${this.registry}:_authToken=${this.token}
    ${this.username}:registry=${this.url}`;
  }

  async export(target: string) {
    await File.createFile(target, this.toString());
  }
}

export default Npmrc;
