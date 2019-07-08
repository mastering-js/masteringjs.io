There's some confusion about [how to make an object immutable in JavaScript](https://stackoverflow.com/questions/33124058/object-freeze-vs-const). The [ES6 `const` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) prevents you from overwriting an object, but it does **not** prevent you from changing an object's properties.

```javascript
[require:Fundamentals.*freeze.*vs const]
```

Freezing an Object
------------------

The [`Object.freeze()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) "freezes" an object. JavaScript prevents you from adding, removing, or modifying the properties of a frozen object.

```javascript
[require:Fundamentals.*freeze.*basic]
```

However, `Object.freeze()` is **not** recursive. You can still modify
nested object properties.

```javascript
[require:Fundamentals.*freeze.*nested]
```

There are numerous utilities for recursively freezing objects, including [deep-freeze](https://www.npmjs.com/package/deep-freeze).

Strict Mode
-----------

Be very careful relying on `Object.freeze()`: `Object.freeze()` does **not** throw an error outside of [strict mode](/tutorials/fundamentals/strict). Even if you `freeze()` an object in a function that uses strict mode, modifying that object
outside of strict mode won't throw an error.

```javacript
function strict() {
  'use strict';
  return Object.freeze({ answer: 42 });
}

function run() {
  const obj = strict();
  // No error because this function is not in strict mode
  ++obj.answer;

  obj.answer; // Still 42
}

run();
```