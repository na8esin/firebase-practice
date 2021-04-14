import { getDb } from '../getInitializeAppOptions';

const db = getDb();
const docRef = db.collection('publics').doc('763fznZQsyE0DmiUzeMZ');

(async function () {
  // Commit the batch
  const data = await docRef.get();
  console.log(data.createTime);
  console.log(data.updateTime);
})();