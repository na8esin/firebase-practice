import admin from 'firebase-admin';

/* 
   UIDを既存のRDSに(laravel経由で)保存しなくても、
   emailで橋渡しすればfirebaseのカスタム認証を利用できる
   と思ったけど、既存のシステムでemailが変更されたことを検知するのが大変
   なのでこのサンプルコードは実用性は微妙
 */

admin.initializeApp();

const email = "foo@example.co.jp";

main();

async function main() {
  if (true) { // 既存の認証を行う
    try {
      // 既存の認証が成功した場合
      const createdUser = await getUserByEmailOrCreateUser(email);

      const uid = createdUser.uid;
      console.log("uid = " + uid);

      const customToken = await admin.auth().createCustomToken(uid);
      console.log(customToken);
    } catch (error) {
      console.log('Error creating custom token:', error);
    }
  }
}

// 存在しない場合は、その旨をレスポンスする。
// そして、アプリ側では新規会員登録を促す

/**
 * emailでfirebaseを検索して、存在しなければ、userの情報を諸々作成
 * @param {*} email 
 */
async function getUserByEmailOrCreateUser(email) {
  let createdUser = null;
  try {
    // 既存アプリでの認証が成功した場合、firebase上に存在するか確認する
    const userRecord = await admin.auth().getUserByEmail(email);
    createdUser = userRecord;
  } catch (e) {
    console.log('User not found. So user creating.');

    // 存在しない場合作成する
    createdUser = await admin.auth().createUser({
      email,
    });

    // このタイミングで、firestoreのusersにもレコードを作る必要がある
    const db = admin.firestore();
    const setupDoc = db.collection("users").doc(createdUser.uid);
    await setupDoc.set({ name: "foo", qualification: "資格1級", role: 5 });
  }
  return createdUser;
}