import admin from 'firebase-admin';
/*
とりあえず、createCustomToken()をやってみるだけのサンプル
*/


// アプリからhttpsで送られてくる
const email = 'watanabe@example.com';
const password = 'password';

// 既存の認証apiに対してリクエストを飛ばす。

// tokenとユーザ情報が返却されたら
// uidをセットする。auth.uidになるから、emailだとだめ。
// そうなると、uidって保存する必要ある？
// firebaseの基本のUIDは下記のような28文字
// k1K3IRRneSeJPY5O1O66MtT3eCs1
// それなら、uuidの方がいいか。
const uid = 'some-uid';

admin.initializeApp();

admin.auth().createCustomToken(uid)
  .then(function (customToken) {
    // Send token back to client
    console.log(customToken);
  })
  .catch(function (error) {
    console.log('Error creating custom token:', error);
  });