import path from 'path';

export const fromRoot = (location: string) =>
  path.resolve(path.resolve(__dirname, '../'), location);

export const libraryDir = fromRoot(`blueprints\\library`);

export const npmrcPath = fromRoot('common/.npmrc');
