import * as admin from 'firebase-admin';
import { getDb } from '../getInitializeAppOptions';
const db = getDb();

/**
 * mapの検索って普通にできる？
 * https://firebase.google.com/docs/firestore/solutions/index-map-field#map_field_and_subfields
 * 
 * 特にインデックスを貼る必要もなくできる
 */

const colRef = db.collection('publics');

(async () => {
  // データセット
  await colRef.doc('map_where').set({ map_filed: { name: 'John' } });
  await colRef.doc('map_where2').set({ map_filed: { name: 'Paul' } });

  const snap = await colRef.where('map_filed.name', '==', 'Paul').get();
  console.log(Array.from(snap.docs.map(e => e.data())));
})();