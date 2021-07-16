import { getDb } from '../../getInitializeAppOptions';

const db = getDb();

const organizationsRef = db.collection('organizations');

(async function () {
  const ret = await organizationsRef.doc()
    .set({ name: "org1" });
})();