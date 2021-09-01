import * as admin from 'firebase-admin';
import { getDb } from '../getInitializeAppOptions';
const db = getDb();

const docRef = db.collection('publics').doc('document-does-not-exist');

(async () => {
  const snap = await docRef.get();
  console.log(snap.data());
  // undefined
})();