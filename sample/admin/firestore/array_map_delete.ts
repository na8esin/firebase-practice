import * as admin from 'firebase-admin';
// serviceAccountを取得
import { getInitializeAppOptions } from '../getInitializeAppOptions';

/** とりあえずの型 */
type TokenDevice = {
  token: String, device: 'android' | 'apns' | 'webpush' | 'unknown'
};

admin.initializeApp(getInitializeAppOptions());
const firestore = admin.firestore();
const docRef = firestore
  .collection('publics')
  .doc('map_delete_sample');
main();

async function setup() {
  const tokens: TokenDevice[] =
    [
      { token: 'aaa', device: 'android' },
      { token: 'bbb', device: 'apns' }
    ]

  await docRef.set({ tokens });
}

async function main() {
  await setup();
  await docRef
    .update({
      // { token: 'bbb' } だけだと削除できない
      // 引数にundefinedを入れると例外が発生する
      // Error: Element at index 0 is not a valid array element. Cannot use "undefined" as a Firestore value
      "tokens": admin.firestore.FieldValue.arrayRemove(
        { token: 'bbb', device: 'apns' })
    });
  console.log((await docRef.get()).data());
  // { tokens: [ { token: 'aaa', device: 'android' } ] }
}

export { }