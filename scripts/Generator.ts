import MicrofrontendConstruct from './construct/MicrofrontendConstruct';

const [recipe, name]: any[] = process.argv.slice(2, 4);

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
      microfrontend: new MicrofrontendConstruct(name),
    }[this.recipe];
  }

  async generate() {
    await this.mapping.create();
  }
}

new Generator(recipe, name).generate();
