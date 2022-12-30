import * as Webpack from '../webpack';
import * as Package from '../package';
import { fromRoot, microfrontendDir, npmrcPath } from './../common';
import {
  copyDir,
  moveDir,
  removeDir,
  writeToFile,
  writeJSONToFile,
} from '@tbarous/utils';
import { buildDeps, installDeps, publish } from '../commands';
import { tsConfigs } from '../tsconfig';

export async function constructMicrofrontend(name: string) {
  const path = fromRoot(`products\\microfrontends\\${name}`);

  await removeDir(path);
  await copyDir(microfrontendDir, path);
  await copyDir(npmrcPath, `${path}/.npmrc`);
  await constructWebpackLibrary(path, name);
  await constructMicrofrontendPackageJson(path, name);
  await constructMicrofrontendTsConfig(path);
  await installDeps(path);
  await buildDeps(path);
  await publish(path);
}

export async function constructWebpackLibrary(path: string, name: string) {
  const base = {
    entry: Webpack.entries(path).indexReact,
    output: Webpack.outputs.lib(name),
    module: Webpack.modules.ts,
    plugins: [Webpack.plugins(path).htmlPlugin],
    resolve: Webpack.resolves.ts,
  };

  const prod = { ...base, mode: 'production' };
  const dev = { ...base, mode: 'development', ...Webpack.devServer(path) };

  await writeToFile(
    `${path}\\webpack\\prod.webpack.config.ts`,
    `export default ${JSON.stringify(prod)}`
  );

  await writeToFile(
    `${path}\\webpack\\dev.webpack.config.ts`,
    `export default ${JSON.stringify(dev)}`
  );
}

export async function constructMicrofrontendPackageJson(
  path: string,
  name: string
) {
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
    dependencies: {
      ...Package.dependencies.react,
      ...Package.dependencies.styledComponents,
    },
    devDependencies: {
      ...Package.devDependencies.babelReact,
      ...Package.devDependencies.typescript,
      ...Package.devDependencies.reactTypes,
      ...Package.devDependencies.styledComponentsTypes,
      ...Package.devDependencies.nodeTypes,
      ...Package.devDependencies.webpackReact,
    },
  };

  await writeJSONToFile(`${path}\\package.json`, base);
}

export async function constructMicrofrontendTsConfig(path: string) {
  await writeJSONToFile(`${path}\\tsconfig.json`, tsConfigs.frontend);
}
