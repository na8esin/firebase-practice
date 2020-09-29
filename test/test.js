const assert = require('assert');
const firebase = require('@firebase/rules-unit-testing');

const MY_PROJECT_ID = 'practice-da34f';
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = { uid: myId, email: "abc@gmail.com" };

function getFirestore(auth) {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth }).firestore();
}

describe("Our social app", () => {
  it("Understands basic addition", () => {
    assert.strictEqual(2 + 2, 4);
  });

  it("Can read items in the read-only collection", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("examanations").doc('docA');
    await firebase.assertSucceeds(testDoc.get());
  });

  it("Can't write items in the read-only collection", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("examanations").doc('docB');
    await firebase.assertFails(testDoc.set({ foo: "bar" }));
  });

  it("Can write to a user document with the same ID as our user", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testDoc.set({ foo: "bar" }));
  });

  it("Can't write to a user document with a differnt ID as our user", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(theirId);
    await firebase.assertFails(testDoc.set({ foo: "bar" }));
  });

  it("Can read posts marked public", async () => {
    const db = getFirestore(null);
    const testQuery = db.collection("posts").where("visibility", "==", "public");
    await firebase.assertSucceeds(testQuery.get());
  });

  it("Can't query all posts", async () => {
    const db = getFirestore(myAuth);
    const testQuery = db.collection("posts");
    await firebase.assertFails(testQuery.get());
  })
});