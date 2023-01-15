import LibraryBuilder from './builders/LibraryBuilder';
import Director from './Director';
import path from 'path';

const [recipe, name]: any[] = process.argv.slice(2, 4);

const director = new Director();
director.setBuilder(new LibraryBuilder('test'));
director.produceLibrary();
console.log(director.getBuilder().getProduct().listParts());

director
  .getBuilder()
  .getProduct()
  .listParts()
  .map((part) => {
    part.export(
      path.resolve(__dirname, `../../libraries/${name}/${part.filename}`)
    );
  });
