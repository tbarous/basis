import * as Webpack from '../webpack';
import * as Package from '../package';
import { fromRoot, npmrcPath } from './../common';
import {
  copyDir,
  moveDir,
  removeDir,
  writeToFile,
  writeJSONToFile,
} from '@tbarous/utils';
import { libraryDir } from '../common';
import { buildDeps, installDeps, publish } from '../commands';
import { tsConfigs } from '../tsconfig';

export async function constructLibrary(name: string) {
  const path = fromRoot(`libraries\\${name}`);

  await removeDir(path);
  await copyDir(libraryDir, path);
  await copyDir(npmrcPath, `${path}/.npmrc`);
  await constructWebpackLibrary(path, name);
  await constructLibraryPackageJson(path, name);
  await constructLibraryTsConfig(path);
  await installDeps(path);
  await buildDeps(path);
  //   await publish(path);
}

export async function constructWebpackLibrary(path: string, name: string) {
  const base = {
    entry: Webpack.entries(path).indexTypescript,
    output: Webpack.outputs.lib(name),
    module: Webpack.modules.ts,
    resolve: Webpack.resolves.ts,
  };

  const prod = { ...base, mode: 'production' };
  const dev = { ...base, mode: 'development' };

  await writeToFile(
    `${path}\\webpack\\prod.webpack.config.ts`,
    `export default ${JSON.stringify(prod)}`
  );

  await writeToFile(
    `${path}\\webpack\\dev.webpack.config.ts`,
    `export default ${JSON.stringify(dev)}`
  );
}

export async function constructLibraryPackageJson(path: string, name: string) {
  const base = {
    name: `@tbarous/${name}`,
    version: '0.0.1',
    main: Package.mains.distIndex,
    files: Package.files,
    license: Package.licenses.private,
    publishConfig: Package.publishConfig,
    scripts: {
      ...Package.scripts.build,
    },
    dependencies: Package.dependencies.frontend,
    devDependencies: Package.devDependencies,
  };

  await writeJSONToFile(`${path}\\package.json`, base);
}

export async function constructLibraryTsConfig(path: string) {
  await writeJSONToFile(`${path}\\tsconfig.json`, tsConfigs.frontend);
}
