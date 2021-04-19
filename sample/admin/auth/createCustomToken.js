import admin from 'firebase-admin';
/*
とりあえず、createCustomToken()をやってみるだけのサンプル
*/

// firebaseの基本のUIDは下記のような28文字
// k1K3IRRneSeJPY5O1O66MtT3eCs1
// それなら、uuidの方がいいか？
// 既存のシステムでuuidのライブラリが使えればいいが。。
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