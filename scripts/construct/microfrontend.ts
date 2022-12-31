import { presets } from './../babel';
import * as Webpack from '../webpack';
import * as Package from '../package';
import {
  microfrontendDir,
  npmrcPath,
  readmePath,
  babelRcPath,
  fromRoot,
  jsTsReactRegex,
  nodeModulesRegex,
} from './../common';
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
  await constructBabelRc(path);
  await constructReadme(path, name);
  await constructProjectJson(path, name);
  await constructNpmrc(path);
  await constructWebpackLibrary(path, name);
  await constructMicrofrontendPackageJson(path, name);
  await constructMicrofrontendTsConfig(path);
  // await installDeps(path);
  // await buildDeps(path);
  // await publish(path);
}

export async function constructWebpackLibrary(path: string, name: string) {
  const base = {
    entry: Webpack.entries(path).indexReact,
    output: Webpack.outputs.lib(name),
    module: Webpack.modules.ts,
    // plugins: [Webpack.plugins(path).htmlPlugin],
    resolve: Webpack.resolves.ts,
  };

  const prod = { ...base, mode: 'production' };
  const dev = { ...base, mode: 'development', ...Webpack.devServer(path) };

  await writeToFile(
    `${path}\\webpack\\prod.webpack.config.ts`,
    `export default ${JSON.stringify(prod)
      .replace(`"${jsTsReactRegex}"`, jsTsReactRegex)
      .replace(`"${nodeModulesRegex}"`, nodeModulesRegex)}`
  );

  await writeToFile(
    `${path}\\webpack\\dev.webpack.config.ts`,
    `export default ${JSON.stringify(dev)
      .replace(`"${jsTsReactRegex}"`, `${jsTsReactRegex}`)
      .replace(`"${nodeModulesRegex}"`, nodeModulesRegex)}}`
  );
}

export async function constructNpmrc(path: string) {
  await writeToFile(
    `${path}\\.npmrc`,
    `#!/bin/bash
//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}
@tbarous:registry=https://npm.pkg.github.com`
  );
}

export async function constructBabelRc(path: string) {
  const babelrc = {
    presets: [presets.react, presets.typescript, presets.env],
  };

  await writeJSONToFile(`${path}\\.babelrc`, babelrc);
}

export async function constructProjectJson(path: string, name: string) {
  await writeJSONToFile(`${path}\\.project.json`, { name });
}

export async function constructReadme(path: string, name: string) {
  await writeToFile(`${path}\\README.md`, `# ${name}`);
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
      ...Package.scripts.dev,
      ...Package.scripts.unitTest,
    },
    dependencies: {
      ...Package.dependencies.react,
      ...Package.dependencies.styledComponents,
      ...Package.dependencies.mobx,
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
