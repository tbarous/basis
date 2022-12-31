import * as Webpack from '../webpack';
import * as Package from '../package';
import {
  constructNpmrc,
  constructProjectJson,
  constructReadme,
  fromRoot,
  npmrcPath,
} from './../common';
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
  const path = fromRoot(`products\\libraries\\${name}`);

  await removeDir(path);
  await constructReadme(path, name);
  await constructProjectJson(path, name);
  await constructNpmrc(path);
  await copyDir(libraryDir, path);
  await constructLibraryWebpack(path, name);
  await constructLibraryPackageJson(path, name);
  await constructLibraryTsConfig(path);
  await installDeps(path);
  await buildDeps(path);
  // await publish(path);
}

export async function constructLibraryWebpack(path: string, name: string) {
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
      ...Package.scripts.unitTest,
    },
    dependencies: {},
    devDependencies: {
      ...Package.devDependencies.babelEssentials,
      ...Package.devDependencies.typescript,
      ...Package.devDependencies.nodeTypes,
      ...Package.devDependencies.webpackEssentials,
      ...Package.devDependencies.jest,
    },
  };

  await writeJSONToFile(`${path}\\package.json`, base);
}

export async function constructLibraryTsConfig(path: string) {
  await writeJSONToFile(`${path}\\tsconfig.json`, tsConfigs.frontend);
}
