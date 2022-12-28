const fse = require('fs-extra');

export async function copyDir(srcDir, destDir, config: { overwrite: boolean }) {
  try {
    await fse.copySync(srcDir, destDir, config);

    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}
