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
  });

  it("Can't write items in the read-only collection", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const testDoc = db.collection("examanations").doc('docB');
    await firebase.assertFails(testDoc.set({ foo: "bar" }));
  });

  it("Can write to a user document with the same ID as our user", async () => {
    const myAuth = { uid: "user_abc", email: "abc@gmail.com" };
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth }).firestore();
    const testDoc = db.collection("users").doc('user_abc');
    await firebase.assertSucceeds(testDoc.set({ foo: "bar" }));
  });

  it("Can't write to a user document with a differnt ID as our user", async () => {
    const myAuth = { uid: "user_abc", email: "abc@gmail.com" };
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth: myAuth }).firestore();
    const testDoc = db.collection("users").doc('user_xyz');
    await firebase.assertFails(testDoc.set({ foo: "bar" }));
  });
});