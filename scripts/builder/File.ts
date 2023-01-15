import fse from 'fs-extra';

class File {
  static async createDir(target: string) {
    await fse.ensureDir(target);
  }

  static async createFile(target: string, data: string) {
    await fse.outputFileSync(target, data);
  }

  static async createJson(target: string, json: object) {
    await fse.outputJsonSync(target, json, { spaces: '  ' });
  }

  static async copyDir(src: string, target: string) {
    await fse.copySync(src, target);
  }

  static async removeDir(target: string) {
    await fse.removeSync(target);
  }

  static async moveDir(src: string, target: string) {
    await fse.moveSync(src, target);
  }
}

export default File;
