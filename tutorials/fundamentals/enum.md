Although `enum` is a reserved word in JavaScript, JavaScript has no support for traditional enums. However, it is
fairly easy to define [enums using objects in JavaScript](https://www.sohamkamani.com/javascript/enums/). For example,
[TypeScript has support for enums](https://www.typescriptlang.org/docs/handbook/enums.html):

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

At runtime, TypeScript compiles the above code into the below enum-like object:

```javascript
const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
};
```

This object has most of the features that you would expect from an enum:

1. Get all allowed enum values: `Object.keys(Direction)` returns an array `['Up', 'Down', 'Left', 'Right']`
2. Check if a value equals an enum value: `val === Direction.Up`
3. Check if a value is in the enum: [`Direction.hasOwnProperty('Up')`](/tutorials/fundamentals/hasownproperty)

However, there are a couple of limitations:

1. You can modify the enum after instantiation. For example, `Direction.sideways = 'sideways'`.
2. If `val === undefined`, then `val === Direction.notAnEnumValue` and `val === Direction.Downe`. So typos in enum properties can cause issues.
3. No guarantee that property values don't conflict. `Direction.Down = 'Up'` is valid.

You can [make JavaScript objects immutable using `Object.freeze()`](/tutorials/fundamentals/freeze). Using `Object.freeze()` and a function, you can work around limitations (1) and (3).

```javascript
function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

// { Up: 'Up', Down: 'Down', Left: 'Left', Right: 'Right' }
createEnum(['Up', 'Down', 'Left', 'Right']);
```

Class-Based Approach
--------------------

Dr. Axel Rauschmayer presents a much more sophisticated approach in [this blog post](https://2ality.com/2020/01/enum-pattern.html) using [JavaScript classes](/tutorials/fundamentals/class). His approach would look more like this:

```javascript
class Direction {
  static Up = new Direction('Up');
  static Down = new Direction('Down');
  static Left = new Direction('Left');
  static Right = new Direction('Right');

  constructor(name) {
    this.name = name;
  }
  toString() {
    return `Direction.${this.name}`;
  }
}
```

Here's how you can work with the `Direction` class:

1. Get all allowed enum values: `Object.keys(Direction)` returns an array `['Up', 'Down', 'Left', 'Right']`
2. Check if a value equals an enum value: `val === Direction.Up.name`
3. Check if a value is in the enum: `Direction.Up instanceof Direction`

This approach is interesting, and there's even a [enumify npm package](https://www.npmjs.com/package/enumify) that implements this basic approach along with additional syntactic sugar. This approach also has the neat benefit that `Direction.Downe.name` throws an error, which means you don't accidentally check `undefined === undefined` if you typo an enum property.

However, we generally recommend using `Object.freeze()` on a [POJO](/tutorials/fundamentals/pojo) to represent an enum. Enumify does offer advantages and some neat syntactic sugar, but we think a POJO gets you most of the advantages with much less overhead.
