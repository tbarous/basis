

// Initializes a react project in a specified path
// e.g. yarn blueprint react packages/ui
function blueprint() {
  const recipes = ['react', 'typescript'];

  const [recipe, path] = process.argv.slice(2, 4);

  if (!recipes.includes(recipe) || !path) return;

  copyDir(fromRoot(`blueprints\\${recipe}`), fromRoot(path));
}

blueprint();
