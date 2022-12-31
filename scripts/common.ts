import path from 'path';

export const fromRoot = (location: string) =>
  path.resolve(path.resolve(__dirname, '../'), location);

export const libraryDir = fromRoot(`blueprints\\library`);
export const microfrontendDir = fromRoot(`blueprints\\microfrontend`);

export const npmrcPath = fromRoot('common/.npmrc');
export const readmePath = fromRoot('common/README.md');
export const babelRcPath = fromRoot('common/.babelrc');

export const jsTsReactRegex = '/.(js|jsx|tsx|ts)$/';
export const nodeModulesRegex = '/node_modules/';
