import LibraryBuilder from './builders/LibraryBuilder';
import Director from './Director';
import Commands from './Commands';
import MicrofrontendBuilder from './builders/MicrofrontendBuilder';
import path from 'path';

// maybe use visitor pattern

const [recipe, name]: any[] = process.argv.slice(2, 4);

const builder = {
  lib: new LibraryBuilder(name),
  micro: new MicrofrontendBuilder(name),
}[recipe];

const source = path.resolve(__dirname, `blueprints/${builder.product.type}`);
const target = path.resolve(
  __dirname,
  `../../projects/${builder.product.type}s/${builder.product.name}`
);

const director = new Director();
const commands = new Commands(source, target);

(async () => {
  await commands.cleanup();
  await commands.blueprint();

  const parts = director
    .setBuilder(builder)
    .produce()
    .getBuilder()
    .getProduct()
    .listParts();

  parts.map(async (part) => await part.export(target + '/' + part.filename));

  await commands.prettify();
  await commands.installDeps();
  await commands.build();

  try {
    await commands.run();
  } catch (e) {}

  try {
    await commands.test();
  } catch (e) {}

  try {
    await commands.dev();
  } catch (e) {}
})();
