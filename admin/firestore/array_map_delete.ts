import * as admin from 'firebase-admin';
// serviceAccountを取得
import { getInitializeAppOptions } from '../getInitializeAppOptions';

admin.initializeApp(getInitializeAppOptions());
const firestore = admin.firestore();
const docRef = firestore
  .collection('publics')
  .doc('map_delete_sample');
main();

async function setup() {
  await
    docRef.set({
      tokens: [
        { token: 'aaa', device: 'android' },
        { token: 'bbb', device: 'apns' }
      ]
    });
}

async function main() {
  await setup();
  await docRef
    .update({
      "tokens": admin.firestore.FieldValue.arrayRemove({ token: 'bbb', device: 'apns' })
    });
  console.log((await docRef.get()).data());
  // { tokens: [ { token: 'aaa', device: 'android' } ] }
}

export { }