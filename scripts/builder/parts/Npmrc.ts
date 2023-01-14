import IPart from './IPart';
import File from '../../File';
import { chainable } from '../../Decorators';

class Npmrc implements IPart {
  registry: string;
  token: string;
  username: string;
  url: string;

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
