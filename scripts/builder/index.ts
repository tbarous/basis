import LibraryBuilder from './builders/LibraryBuilder';
import Director from './Director';

const director = new Director();
director.setBuilder(new LibraryBuilder('test'));
director.produceLibrary();
console.log(director.getBuilder().getProduct().listParts());

director.getBuilder().getProduct().listParts().map(part=>{
    part.export()
})
