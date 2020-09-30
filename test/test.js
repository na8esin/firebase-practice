const assert = require('assert');
const firebase = require('@firebase/rules-unit-testing');

const MY_PROJECT_ID = 'practice-da34f';
const myId = "user_abc";
const theirId = "user_xyz";
const modId = "user_mod";
const myAuth = { uid: myId, email: "abc@gmail.com" };
const modAuth = { uid: modId, email: "mod@gmail.com", isModerator: true };

function getFirestore(auth) {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth }).firestore();
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
})

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

  it("Can query personal posts", async () => {
    const db = getFirestore(myAuth);
    const testQuery = db.collection("posts").where("authorId", "==", myId);
    await firebase.assertSucceeds(testQuery.get());
  });

  it("Can't query all posts", async () => {
    const db = getFirestore(myAuth);
    const testQuery = db.collection("posts");
    await firebase.assertFails(testQuery.get());
  });

  it("Can read a single public post", async () => {
    const admin = getAdminFirestore();
    const postId = "public_post";
    const setupDoc = admin.collection("posts").doc(postId);
    await setupDoc.set({ authorId: theirId, visibility: "public" });

    const db = getFirestore(null);
    const testRead = db.collection("posts").doc(postId);
    await firebase.assertSucceeds(testRead.get());
  });

  it("Can read a private post belonging to the user", async () => {
    const admin = getAdminFirestore();
    const postId = "private_post";
    const setupDoc = admin.collection("posts").doc(postId);
    await setupDoc.set({ authorId: myId, visibility: "private" });

    const db = getFirestore(myAuth);
    const testRead = db.collection("posts").doc(postId);
    await firebase.assertSucceeds(testRead.get());
  });

  it("Can't read a private post belonging to another user", async () => {
    const admin = getAdminFirestore();
    const postId = "private_post";
    const setupDoc = admin.collection("posts").doc(postId);
    await setupDoc.set({ authorId: theirId, visibility: "private" });

    const db = getFirestore(myAuth);
    const testRead = db.collection("posts").doc(postId);
    await firebase.assertFails(testRead.get());
  });

  it("Allows a user to edit their own post", async () => {
    const postId = "post_123";
    const admin = getAdminFirestore();
    await admin.collection("posts").doc(postId).set({ content: "before", authorId: myId });

    const db = getFirestore(myAuth);
    const testDoc = db.collection("posts").doc(postId);
    await firebase.assertSucceeds(testDoc.update({ content: "after" }));
  });

  it("Doesn't allow a user to edit somebody else's post", async () => {
    const postId = "post_123";
    const admin = getAdminFirestore();
    await admin.collection("posts").doc(postId).set({ content: "before", authorId: theirId });

    const db = getFirestore(myAuth);
    const testDoc = db.collection("posts").doc(postId);
    await firebase.assertFails(testDoc.update({ content: "after" }));
  });

  it("Allows a moderator to edit somebody else's post", async () => {
    const postId = "post_123";
    const admin = getAdminFirestore();
    await admin.collection("posts").doc(postId).set({ content: "before", authorId: theirId });

    const db = getFirestore(modAuth);
    const testDoc = db.collection("posts").doc(postId);
    await firebase.assertSucceeds(testDoc.update({ content: "after" }));
  });

  it("Allows a user to edit their own room post", async () => {
    const postPath = "/rooms/room_abc/posts/post_123";
    const admin = getAdminFirestore();
    await admin.doc(postPath).set({ content: "before", authorId: myId });

    const db = getFirestore(myAuth);
    const testDoc = db.doc(postPath);
    await firebase.assertSucceeds(testDoc.update({ content: "after" }));
  });

  it("Won't a user to edit somebody else's room post", async () => {
    const postPath = "/rooms/room_abc/posts/post_123";
    const admin = getAdminFirestore();
    await admin.doc(postPath).set({ content: "before", authorId: theirId });

    const db = getFirestore(myAuth);
    const testDoc = db.doc(postPath);
    await firebase.assertFails(testDoc.update({ content: "after" }));
  });

  it("Allows a room mod to edit another person's room post", async () => {
    const roomPath = "rooms/room_abc";
    const postPath = `${roomPath}/posts/post_123`;
    const admin = getAdminFirestore();
    await admin.doc(roomPath).set({ topic: "Unit testers", roomMods: [myId, "dummyUser"] });
    await admin.doc(postPath).set({ content: "before", authorId: theirId });

    const db = getFirestore(myAuth);
    const testDoc = db.doc(postPath);
    await firebase.assertSucceeds(testDoc.update({ content: "after" }));
  });

  it("Allows a user to create a post when they list themselves as the author", async () => {
    const postPath = "/posts/post_123";
    const db = getFirestore(myAuth);
    const testDoc = db.doc(postPath);
    await firebase.assertSucceeds(testDoc.set({ authorId: myId, content: "lorem ipsum" }));
  });

  it("Doesn't let a user create a post when they list somebody else as the author", async () => {
    const postPath = "/posts/post_123";
    const db = getFirestore(myAuth);
    const testDoc = db.doc(postPath);
    await firebase.assertFails(testDoc.set({ authorId: theirId, content: "lorem ipsum" }));
  });
});

after(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
})