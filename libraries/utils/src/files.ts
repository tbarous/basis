const fse = require('fs-extra');

export async function copyDir(
  srcDir: string,
  destDir: string,
  config: { overwrite: boolean; filter: (src: string, dest: string) => void }
) {
  try {
    await fse.copySync(srcDir, destDir, config);

    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

export async function moveDir(
  srcDir: string,
  destDir: string,
  config: { overwrite: boolean; filter: (src: string, dest: string) => void }
) {
  try {
    await fse.moveSync(srcDir, destDir, config);

    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}
