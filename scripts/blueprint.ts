import { constructLibrary } from './construct/library';

const [recipe, name]: string[] = process.argv.slice(2, 4);
const recipes = ['microfrontend', 'microservices', 'react', 'library', 'app'];

async function blueprint() {
  if (!recipes.includes(recipe) || !name) return;

  const mapping: Record<string, (name: string) => Promise<void>> = {
    library: constructLibrary,
  };

  await mapping[recipe](name);
}

blueprint();
