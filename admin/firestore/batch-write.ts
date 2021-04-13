// https://firebase.google.com/docs/firestore/manage-data/transactions?hl=ja#batched-writes

import * as admin from 'firebase-admin';
// serviceAccountを取得
import { getInitializeAppOptions } from '../getInitializeAppOptions';

const data = [
  { last_name: 'Smith', first_name: 'Michael' },
  { last_name: 'Johnson', first_name: 'Christopher' },
];

admin.initializeApp(getInitializeAppOptions());
const db = admin.firestore();

const publicsRef = db.collection('publics');

// Get a new write batch
const batch = db.batch();

// Set the values
data.forEach((e) => batch.set(publicsRef.doc(), e));

(async function () {
  // Commit the batch
  await batch.commit();
})();