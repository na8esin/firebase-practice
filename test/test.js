const assert = require('assert');
const firebase = require('@firebase/rules-unit-testing');

const MY_PROJECT_ID = 'practice-da34f';

describe("Our social app", () => {
  it("Understands basic addition", () => {
    assert.strictEqual(2 + 2, 4);
  });

  it("Can read items in the read-only collection", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const testDoc = db.collection("examanations").doc('docA');
    await firebase.assertSucceeds(testDoc.get());
  })
});