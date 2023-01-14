class Commands {
  async installDeps() {
    await this.runCommand(
      `cd ${this.paths.product} && yarn`,
      'Installing dependencies...'
    );
  }

  async build() {
    await this.runCommand(
      `cd ${this.paths.product} && yarn build`,
      'Building...'
    );
  }

  async bumpVersion() {
    await this.runCommand(
      `cd ${this.paths.product} && npm version minor`,
      'Bumping version...'
    );
  }

  async publish() {
    await this.runCommand(
      `cd ${this.paths.product} && npm publish`,
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
