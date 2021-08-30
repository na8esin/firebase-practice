import * as admin from 'firebase-admin';
admin.initializeApp();

// 再帰的にコレクションを作ることはできる
// けど、中間のコレクションは無いも等しいのでどんな意味があるだろうか？

const colRef = admin.firestore().collection('sample/sample1/noexist');

(async () => {
  await colRef.add({ name: '1' });
  await admin.firestore().doc('sample/sample1').get();
})();