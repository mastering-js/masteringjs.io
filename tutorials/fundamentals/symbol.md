[Symbols](http://thecodebarbarian.com/a-practical-guide-to-symbols-in-javascript.html) are a primitive data type in JavaScript, like `number`, `boolean`, or `null`. They're often used to avoid property name conflicts, or to simulate private values on JavaScript objects.

You can create a symbol by calling the global function `Symbol()`:

```javascript
const sym = Symbol();
```

The `Symbol()` function takes one parameter, a string `description` that
shows up when you print the symbol.

```javascript
const sym = Symbol('my description');

console.log(sym); // Prints "Symbol(my description)"
```

Key Features
------------

Symbols have two key features. The first key feature is that
**no two symbols are ever equal**. Even if two symbols have the same
description, they are not equal.

```javascript
Symbol() === Symbol(); // false

Symbol('test') === Symbol('test'); // false
```

The second key feature is that **object keys can be symbols**.
In general, object keys can only be symbols or strings.

```javascript
const test = Symbol('test');

const obj = {};
obj.test = 'hello';
obj[test] = 'world';

obj.test; // 'hello'
obj[test]; // 'world'
```

Since no two symbols are ever equal, you can't access a
symbol property unless you have access to the symbol. This makes
symbols convenient for creating hidden values that can only
be accessed within a certain function.

```javascript
function addSymbol(obj) {
  const sym = Symbol('test');
  obj[sym] = 'my hidden value';

  return obj;
}

const obj = addSymbol({});
// No way to access obj[sym] here, unless you explicitly look
// into `Object.getOwnPropertySymbols()`.
```

Symbols are also excluded from [`JSON.stringify()`](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript) output, which makes them ideal for storing program-only data that end users shouldn't see.