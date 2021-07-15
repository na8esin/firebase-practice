import { getDb } from '../getInitializeAppOptions';

/*
  https://firebase.google.com/docs/firestore/bundles
  上記に記載がある
  firestore.doc('stories/stories').get();
  ってbundleだけで使える特殊な記法？と思ってやってみたけど、not exists.
*/

const db = getDb();
const docRef = db.doc('books/books');

(async function () {
  // Commit the batch
  const data = await docRef.get();
  console.log(data.exists);
})();