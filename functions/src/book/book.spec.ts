import { fireormInitialize } from '../fireorm-initialize';
import { getRepository, getCustomRepository } from 'fireorm';
import { BooksRepository } from './books-repository';
import { Book } from './book';

// https://github.com/wovalle/fireorm/issues/232
BooksRepository.name;

fireormInitialize();

describe("book", () => {
  it("Get books", async () => {
    const repository = getRepository(Book);
    const books = await repository.find();
    console.log(books);
  });

  it("Batch write", async () => {
    const testdata = [{
      title: "Clean Architecture"
    },
    {
      title: "Readable Code"
    },
    ];

    const repository = getCustomRepository(Book) as BooksRepository;
    await repository.batchWrite(testdata);
  });
});
