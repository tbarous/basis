import LibraryBuilder from './builders/LibraryBuilder';
import Director from './Director';
import Commands from './Commands';
import MicrofrontendBuilder from './builders/MicrofrontendBuilder';

// maybe use visitor pattern

const [recipe, name]: any[] = process.argv.slice(2, 4);
const libraryBuilder = new LibraryBuilder(name);
const microfrontendBuilder = new MicrofrontendBuilder(name);

const builder = {
  lib: libraryBuilder,
  micro: microfrontendBuilder,
}[recipe];

const director = new Director();
const commands = new Commands(
  builder.getProduct().source,
  builder.getProduct().target
);

(async () => {
  await commands.cleanup();
  await commands.blueprint();

  const parts = director
    .setBuilder(builder)
    .produceLibrary()
    .getBuilder()
    .getProduct()
    .listParts();

  parts.map(
    async (part) =>
      await part.export(builder.getProduct().target + '/' + part.filename)
  );

  await commands.installDeps();
  await commands.build();
})();
