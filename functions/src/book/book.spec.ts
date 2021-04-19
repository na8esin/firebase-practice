import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { getRepository, getCustomRepository } from 'fireorm';
import { fireormInitialize } from '../fireorm-initialize';
import { BooksRepository } from './books-repository';
import { Book } from './book';

chai.use(chaiAsPromised);
const assert = chai.assert;

// https://github.com/wovalle/fireorm/issues/232
BooksRepository.name;

fireormInitialize();

describe("book", () => {
  const bookRepository = getRepository(Book);
  it("Get books", async () => {

    const books = await bookRepository.find();
    console.log(books);
  });

  it("Batch write", async () => {
    const testdata = [{
      title: "Clean Architecture"
    },
    {
      title: "Readable Code"
    },];

    // batchWriteの内部でtestdataが変更されるので
    // ディープコピー
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#deep_clone
    const copyTestdata = JSON.parse(JSON.stringify(testdata));

    const repository = getCustomRepository(Book) as BooksRepository;
    await repository.batchWrite(testdata);
    const books = await repository.find();
    const bookTitles = books.map((e) => { return { "title": e.title ?? "" } })
      .sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });

    assert.deepEqual(copyTestdata, bookTitles);
  });

  after(async () => {
    const books = await bookRepository.find();
    books.forEach(async (e) => await bookRepository.delete(e.id));
  });
});
