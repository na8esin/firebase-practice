import * as admin from 'firebase-admin';
import { getDb } from '../getInitializeAppOptions';
const db = getDb();

/**
 * arrayUnionの検証。
 * updateするときに全く同じデータがある時はデータは変わらない
 */

/** とりあえずの型 */
type TokenDevice = {
  token: String, device: 'android' | 'apns' | 'webpush' | 'unknown'
};

const docRef = db
  .collection('publics')
  .doc('map_update_sample');

// データ登録
async function setup() {
  const tokens: TokenDevice[] =
    [
      { token: 'aaa', device: 'android' },
      { token: 'bbb', device: 'apns' }
    ]
  await docRef.set({ tokens });
}

// tokenがすでにあるけど、deviceが違うもの
// 現実にはないと思う。
async function tokenExistsDeviceIsDifferent() {
  await docRef
    .update({
      "tokens": admin.firestore.FieldValue.arrayUnion(
        { token: 'bbb', device: 'android' })
    });
}

// tokenが違うがデバイスはすでにある
async function deviceExistsTokenIsDifferent() {
  await docRef
    .update({
      "tokens": admin.firestore.FieldValue.arrayUnion(
        { token: 'ccc', device: 'android' })
    });
}

// tokenもデバイスも全く同じものがある
async function bothTokenAndDeviceExist() {
  await docRef
    .update({
      "tokens": admin.firestore.FieldValue.arrayUnion(
        { token: 'bbb', device: 'apns' })
    });
}

async function printData() {
  const data = (await docRef.get()).data();
  console.log(data ? data['tokens'] : "");
}

// mainのような部分
(async function () {
  await setup();
  await tokenExistsDeviceIsDifferent();
  await printData();
  /*
  [{ device: 'android', token: 'aaa' },
  { token: 'bbb', device: 'apns' },
  { device: 'android', token: 'bbb' }]
  */

  await setup();
  await deviceExistsTokenIsDifferent();
  await printData();
  /*
  [{ device: 'android', token: 'aaa' },
  { device: 'apns', token: 'bbb' },
  { token: 'ccc', device: 'android' }]
  */

  await setup();
  await bothTokenAndDeviceExist();
  await printData();
  /*
  [{ token: 'aaa', device: 'android' },
  { device: 'apns', token: 'bbb' }]
  */
  // 全く同じデータがあれば追加されないが、そもそもリクエストを飛ばしたくないかもしれない
})();

export { }