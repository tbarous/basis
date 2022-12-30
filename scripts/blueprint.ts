import { constructLibrary } from './construct/library';
import { constructMicrofrontend } from './construct/microfrontend';

const [recipe, name]: string[] = process.argv.slice(2, 4);
const recipes = ['microfrontend', 'microservices', 'react', 'library', 'app'];

async function blueprint() {
  if (!recipes.includes(recipe) || !name) return;

  const mapping: Record<string, (name: string) => Promise<void>> = {
    library: constructLibrary,
    microfrontend: constructMicrofrontend
  };

  await mapping[recipe](name);
}

blueprint();
