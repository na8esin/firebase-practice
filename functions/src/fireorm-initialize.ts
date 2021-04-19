import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export function getInitializeAppOptions() {
  const home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  const serviceAccount = require(`${home}/Downloads/practice-da34f-firebase-adminsdk-ueykj-053ff9bed4.json`);
  return {
    credential: admin.credential.cert(serviceAccount),
  };
}

export function fireormInitialize() {
  admin.initializeApp(getInitializeAppOptions());
  const firestore = admin.firestore();
  fireorm.initialize(firestore);
}
