import fse from 'fs-extra';

class File {
  static async createDir(path: string, message: string) {
    await fse.ensureDir(path);
  }

  static async createFile(target: string, string: string) {
    await fse.outputFileSync(target, string);
  }

  static async createJson(target: string, object: object) {
    await fse.outputJsonSync(target, object, { spaces: '  ' });
  }

  static async copy(srcDir: string, destDir: string, message: string) {
    await File.invoker(
      async () => await fse.copySync(srcDir, destDir),
      message
    );
  }

  static async remove(path: string, message: string) {
    await File.invoker(async () => await fse.removeSync(path), message);
  }

  static async moveDirectory(srcDir: string, destDir: string, message: string) {
    await File.invoker(
      async () => await fse.moveSync(srcDir, destDir),
      message
    );
  }

  static async invoker(fn: any, message: string) {
    try {
      await fn();

      console.log(message);
    } catch (err) {
      console.error(err);
    }
  }
}

export default File;
