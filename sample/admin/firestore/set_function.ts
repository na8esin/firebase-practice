import { getDb } from '../getInitializeAppOptions';

/**
 * https://github.com/android/play-billing-samples/blob/08dea908eac051ed36c3711d347f15925696a10c/ClassyTaxiServer/src/play-billing/internal/purchases_impl.ts#L29-L35
 * のコードを理解するためのサンプル
 */

const db = getDb();
const docRef = db
  .collection('publics')
  .doc('set_function');

interface SetFunction {
  x: number;
  y: number;
  isXLarger(): boolean;
}

class Impl implements SetFunction {
  x = 1;
  y = 2;
  isXLarger() { return this.x > this.y }
}

// データ登録
async function setup() {
  const impl = new Impl();
  const fObj: any = {};
  // ここでメソッドが消える
  Object.assign(fObj, impl);
  await docRef.set(fObj);
}

// mainのような部分
(async () => {
  await setup();
})();