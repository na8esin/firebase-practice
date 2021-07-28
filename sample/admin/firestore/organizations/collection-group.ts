import { getDb } from '../../getInitializeAppOptions';

const db = getDb();

// 普通に上のcollectionからたどって行けばwhereを使っても大丈夫
db.collection('organizations').doc('27FpmEohWywN8NzbXUMn')
  .collection('projects').where('name', '==', 'prj2').get()
  .then((snap) => snap.docs.forEach((e) => console.log(e.data())));

/*
FAILED_PRECONDITION: The query requires a COLLECTION_GROUP_ASC index for collection projects and field name. You can create it here: インデックスを作るのに便利なURL
*/
db.collectionGroup('projects').where('name', '==', 'prj2').get();
