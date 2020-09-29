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

describe("Our social app", () => {
  // clearFirestoreData()を外しても、エミュレータにデータが作られなかったときに
  // 試しに作ったやつ。オチはただitがifになってただけ
  it("Allows a room mod to edit another person's room post", async () => {
    const roomPath = "rooms/room_abc";
    const postPath = `${roomPath}/posts/post_123`;
    const admin = getAdminFirestore();
    await admin.doc(roomPath).set({ topic: "Unit testers", roomMod: myId });
    await admin.doc(postPath).set({ content: "before", authorId: theirId });

    const db = getFirestore(myAuth);
    const testDoc = db.doc(postPath);
    await firebase.assertSucceeds(testDoc.update({ content: "after" }));
  });
});