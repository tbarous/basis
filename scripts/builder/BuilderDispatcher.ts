import LibraryConstruct from '../LibraryConstruct';
import MicrofrontendConstruct from '../MicrofrontendConstruct';

class Generator {
  static recipes = [
    'microfrontend',
    'microservices',
    'react',
    'library',
    'app',
  ];

  recipe: string;
  name: string;

  constructor(
    recipe: 'microfrontend' | 'microservices' | 'library' | 'app',
    name: string
  ) {
    if (!Generator.recipes.includes(recipe)) {
      throw new Error('Invalid recipe');
    }

    if (!name) {
      throw new Error('Invalid name');
    }

    this.recipe = recipe;
    this.name = name;
  }

  get mapping() {
    return {
      microfrontend: new MicrofrontendConstruct(this.name),
      library: new LibraryConstruct(this.name),
    }[this.recipe];
  }

  async generate() {
    await this.mapping.create();
  }
}

export default Generator