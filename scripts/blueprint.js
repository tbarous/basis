const fse = require('fs-extra');
const path = require('path');

const root = path.resolve(__dirname, '../');
const fromRoot = (location) => path.resolve(root, location);

// Initializes a react project in a specified path
// e.g. yarn blueprint react packages/ui
function blueprint() {
  const recipes = ['react', 'typescript'];

  const [recipe, path] = process.argv.slice(2, 4);

  if (!recipes.includes(recipe) || !path) return;

  copyDir(fromRoot(`blueprints\\${recipe}`), fromRoot(path));
}

function copyDir(srcDir, destDir) {
  try {
    fse.copySync(srcDir, destDir, { overwrite: true | false });
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

blueprint();
