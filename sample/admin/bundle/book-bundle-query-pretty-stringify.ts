import { getDb } from '../getInitializeAppOptions';
import { open } from 'fs/promises';

(async function () {
  const firestore = getDb();
  const bundleId = "latest-books";
  const bundle = firestore.bundle(bundleId);

  var querySnapshot = await firestore.collection('books').get();

  // Build the bundle
  // Note how querySnapshot is named "latest-books-query"
  var bundleBuffer = bundle
    .add('latest-books-query', querySnapshot) // Add a named query.
    .build();

  const first = bundleBuffer.toString().replace(/\}\d{3}\{/ig, '},{');
  const second = first.replace(/\d{3}\{/i, '[{');
  const third = second + ']';

  const obj = JSON.parse(third);

  let filehandle;
  try {
    filehandle = await open(`${__filename}.txt`, 'w');
    filehandle.write(JSON.stringify(obj, null, 2));
  } finally {
    await filehandle?.close();
  }
})();
