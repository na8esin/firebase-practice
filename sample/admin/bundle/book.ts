import { getDb } from '../getInitializeAppOptions';
import { open } from 'fs/promises';

(async function () {
  const firestore = getDb();
  const bundleId = "latest-books";
  const bundle = firestore.bundle(bundleId);

  var docSnapshot = await firestore.doc('books/books').get();
  var querySnapshot = await firestore.collection('books').get();

  if (!docSnapshot.exists) {
    console.log('docSnapshot not exists');
    return;
  }

  // Build the bundle
  // Note how querySnapshot is named "latest-books-query"
  var bundleBuffer = bundle.add(docSnapshot) // Add a document
    .add('latest-books-query', querySnapshot) // Add a named query.
    .build();

  let filehandle;
  try {
    filehandle = await open('./public/latest-books-query.txt', 'a+');
    filehandle.write(bundleBuffer);
  } finally {
    await filehandle?.close();
  }
})();