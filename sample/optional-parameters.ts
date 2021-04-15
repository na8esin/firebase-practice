function f(x?: number, y?: number) { }
function f2(option: { x?: number, y?: number }) { }

class Point {
  x?: number;
  y?: string;
  s?: string;
  // Overloads
  constructor(x?: number, y?: string);
  constructor(s: string);
  // 最後の定義は今までの定義を網羅しないといけない
  // 引数の位置と言うのは絶対的な物
  // xsとは要するに x or sと言うこと
  constructor(xs?: number | string, y?: string) {
    if (typeof (xs) == "number") {
      this.x = xs;
    } else {
      this.s = xs;
    }
    this.y = y;
  }

  // こんな感じのファクトリメソッドがあってもいいかも
  static onlyYFactory(y: string) {
    const instance = new this(undefined, y);
    return instance;
  }
}

// dartみたいな感じではできない
f(0, 10);
f(10);
f2({ x: 10 })
f2({ y: 10 })

const p1 = new Point(1, "a");
console.log(`${p1.x} ${p1.y} ${p1.s}`);
const p2 = new Point("b");
console.log(`${p2.x} ${p2.y} ${p2.s}`);
const p3 = Point.onlyYFactory('i am y.');
console.log(`${p3.x} ${p3.y} ${p3.s}`);

export { };