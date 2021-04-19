import * as admin from 'firebase-admin';

export function getInitializeAppOptions() {
  const home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  const serviceAccount = require(`${home}/Downloads/practice-da34f-firebase-adminsdk-ueykj-053ff9bed4.json`);

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'practice-da34f.appspot.com'
  });
}
