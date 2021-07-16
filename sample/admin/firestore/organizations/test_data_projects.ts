import { getDb } from '../../getInitializeAppOptions';

const db = getDb();

const projectsRef
  = db
    .collection('organizations')
    .doc('27FpmEohWywN8NzbXUMn')
    .collection('projects');

const teams = 'teams';

(async function () {
  await projectsRef.doc()
    .set({ name: "prj1" });
  await projectsRef.doc()
    .set({ name: "prj2" });
})();