import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Book } from './book';

@CustomRepository(Book)
export class BooksRepository extends BaseFirestoreRepository<Book> {
  async batchWrite(entities: Partial<Book>[]) {
    const batch = this.createBatch();
    entities.forEach((e) => {
      batch.create(e);
    });
    await batch.commit();
  }
}