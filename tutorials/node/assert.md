Node.js' `assert.equal(a, b)` function will throw an error if `a != b`.
`assert.equal(a, b)` is equivalent `assert(a, b)`.
Asserts are most commonly used for testing, but can also be used as a more concise alternative to an `if` statement in your code.

```javascript
const assert = require('assert');

const a = 1;
const b = 2;
assert.equal(a, b); // Throws
assert(a, b); // Throws
assert.equal(a, a); // Succeeds
assert(a, a); // Succeeds
```

## strictEqual()

While `equal(a,b)` throws an error if `a != b`, `strictEqual(a, b)` throws an error if `a !== b`.
[Here's more on the difference between `!==` and `!=` in JavaScript](/tutorials/fundamentals/equals)

```javascript
const assert = require('assert');

const a = 1;
const b = '1';

assert.equal(a, b); // Succeeds
assert.strictEqual(a, b); // Fails
```

## deepEqual() && deepStrictEqual()

These functions do a deep comparison of objects to make sure they have the same keys and values.
Only use these functions with [POJOs](/tutorials/fundamentals/pojo.md), this will not work with MongoDB ObjectIds.

```javascript
const assert = require('assert');

const obj = { a: 1, b: 2, c: 3};
const pojo = { a: '1', b: '2', c: '3'};
const entry = { a: 1, b: 2, c: 3 };

assert.deepEqual(obj, pojo); // passes
assert.deepStrictEqual(obj, entry); // passes
assert.deepStrictEqual(obj, pojo); // fails
```

## throws()

Use this function when you want to assert that the function you are testing should throw an error with a specific `message`.
The first parameter is a function and the second parameter is a regular expression that you want the error message to match.

```javascript
const assert = require('assert');

function run() {
  assert.throws(() => { test(); }, /TypeError: Wrong Value/);
}

function test() {
  throw new TypeError('Wrong Value');
}

run();
```

## rejects()

This functions similarly to `throws()`, but is used with promises.
Use this with async functions.

```javascript
const assert = require('assert');

async function run() {
 await assert.rejects(async () => { await test(); }, /TypeError: Wrong Value/);
}

async function test() {
  throw new TypeError('Wrong Value')
}

run();
```
