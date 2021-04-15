function f(x?: number, y?: number) { }
function f2(option: { x?: number, y?: number }) { }

// dartみたいな感じではできない
f(0, 10);
f(10);
f2({ x: 10 })
f2({ y: 10 })

export { };