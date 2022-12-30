const fse = require('fs-extra');

export async function copyDir(
  srcDir: string,
  destDir: string,
  config?: { overwrite: boolean; filter: (src: string, dest: string) => void }
) {
  try {
    await fse.copySync(srcDir, destDir, {
      overwrite: true,
      filter: () => true,
    });

    console.log(`Copied ${srcDir} to ${destDir}`);
  } catch (err) {
    console.error(err);
  }
}

export async function removeDir(path: string) {
  try {
    await fse.removeSync(path);

    console.log(`Deleted ${path}`);
  } catch (err) {
    console.error(err);
  }
}

export async function writeJSONToFile(path: string, object: any) {
  try {
    await fse.outputJsonSync(path, object, { spaces: '  ' });

    console.log(`Created JSON file in ${path}`);
  } catch (err) {
    console.error(err);
  }
}

export async function writeToFile(path: string, data: any) {
  try {
    await fse.outputFileSync(path, data);

    console.log(`Created file in ${path}`);
  } catch (err) {
    console.error(err);
  }
}

export async function makeDir(path: string) {
  try {
    await fse.ensureDir(path);

    console.log(`Created directory in ${path}`);
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

    console.log(`Moved directory ${srcDir} to ${destDir}`);
  } catch (err) {
    console.error(err);
  }
}
