import * as path from 'path';
import { ImporterService } from './importer.service';
import { fireormInitialize } from '../fireorm-initialize';

fireormInitialize();

describe('ImportService', () => {
  const dummyMetadata = {
    // name以外はいいかげん
    kind: 'storage#object',
    id: 'id',
    bucket: 'bucket',
    storageClass: 'storageClass',
    size: 'size',
    timeCreated: 'timeCreated',
    updated: 'updated',
    name: 'books_new.csv'
  };

  describe("import", () => {
    it("shouldn't smoke", async () => {
      await ImporterService.import(dummyMetadata);
    });
  });

  describe("tempFileBatchWrite", () => {
    it("shouldn't smoke", async () => {
      await ImporterService.tempFileBatchWrite(path.join(__dirname, './books_new.csv'));
    });
  });

  after(() => {
    // Do cleanup tasks.
    //test.cleanup();
    // Reset the database.
    //admin.database().ref('messages').remove();
  });
});