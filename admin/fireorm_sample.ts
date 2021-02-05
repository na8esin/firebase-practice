import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { Collection, getRepository, SubCollection, ISubCollection } from 'fireorm';

const home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];


var serviceAccount = require(`${home}/Downloads/practice-da34f-firebase-adminsdk-ueykj-053ff9bed4.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://practice-da34f.firebaseio.com"
});

const firestore = admin.firestore();
fireorm.initialize(firestore);

class Detail {
  id!: string;
  title?: string;
}

@Collection('publics')
class Public {
  id!: string;
  name?: string;

  @SubCollection(Detail, 'details')
  details?: ISubCollection<Detail>
}


async function main() {
  const publicRepository = getRepository(Public);

  // ここで一回リクエスト
  // ただサブコレクションはまだ問い合わせしてない
  const publics = await publicRepository.find();

  const detailsPending = publics.map((e) => {
    return e.details?.find();
  });

  // これで問い合わせされるが、public分が一回だけ余分
  const details = await Promise.all(detailsPending);
}

async function main2() {
  // この方法であれば、余分なpublicは呼ばなくてもよさそう
  const publicRepository = getRepository<Detail>('publics/0YPJmTVo631kHkpQgP47/details');
  const details = await publicRepository.find();
  console.log(details);
}
main2();