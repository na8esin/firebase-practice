import { getDb } from '../../getInitializeAppOptions';

const db = getDb();

const projectsRef
  = db
    .collection('organizations')
    .doc('27FpmEohWywN8NzbXUMn')
    .collection('projects');

(async function () {
  const prj = await projectsRef.get();
  prj.docs.map(async (e) => {
    await projectsRef.doc(e.id).collection('teams').doc()
      .set({ name: 'team1' });
    await projectsRef.doc(e.id).collection('teams').doc()
      .set({ name: 'team2' });
  });
})();