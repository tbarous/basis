import { exec } from 'child_process';
import { promisify } from 'util';
import File from './File';

const run = promisify(exec);

class Commands {
  private target: string;
  private src: string;

  constructor(src: string, target: string) {
    this.src = src;
    this.target = target;
  }

  async blueprint() {
    if (!this.target) return;
    await File.copyDir(this.src, this.target);
  }

  async cleanup() {
    if (!this.target) return;
    await File.removeDir(this.target);
  }

  async installDeps() {
    await this.runCommand(
      `cd ${this.target} && yarn`,
      'Installing dependencies...'
    );
  }

  async build() {
    await this.runCommand(`cd ${this.target} && yarn build`, 'Building...');
  }

  async dev() {
    await this.runCommand(`cd ${this.target} && yarn dev`, '');
  }

  async run() {
    await this.runCommand(`cd ${this.target} && node dist/index.js`, '');
  }

  async test() {
    await this.runCommand(`cd ${this.target} && yarn test`, '');
  }

  async prettify() {
    await this.runCommand(`cd ${this.target} && prettier --write .`, '');
  }

  async bumpVersion() {
    await this.runCommand(
      `cd ${this.target} && npm version minor`,
      'Bumping version...'
    );
  }

  async publish() {
    await this.runCommand(
      `cd ${this.target} && npm publish`,
      'Publishing package...'
    );
  }

  async runCommand(command: string, message: string) {
    console.log(message);

    try {
      const { stdout, stderr } = await run(command);

      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }
}

export default Commands;
