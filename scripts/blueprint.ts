import { copyDir, moveDir } from '@tbarous/utils';
import path from 'path';

const root = path.resolve(__dirname, '../');
const fromRoot = (location: string) => path.resolve(root, location);

// Initializes a react project in a specified path
// e.g. yarn blueprint react packages/ui
function blueprint() {
  const recipes = ['microfrontend', 'microservices', 'react', 'library', 'app'];

  const [recipe, path] = process.argv.slice(2, 4);

  if (!recipes.includes(recipe) || !path) return;

  copyDir(fromRoot(`blueprints\\${recipe}`), fromRoot(path), {
    overwrite: true,
    filter: (src, dest) => src !== 'node_modules',
  });
}

blueprint();
