Node.js' `assert.equal(a, b)` function will throw an error if `a != b`.
This is equivalent to simply doing `assert(a,b)`.

```javascript
const assert = require('assert');

const a = 1;
const b = 2;
assert.equal(a,b)
assert(a,b);
assert.equal(a,a);
assert(a,a)
```

## strictEqual()

While `equal(a,b)` throws an error if `a != b`, `strictEqual(a,b)` throws an error if `a !== b`.

```javascript
const assert = require('assert');

const a = 1;
const b = '1';

assert.strictEqual(a,b); // fails assertion
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

Use this function when you want to assert that the function you are testing should be throwing a specific error.
The first parameter is a function and the second parameter is a regular expression that you want the error message to match.

```javascript
const assert = require('assert');

function run() {
  assert.throws(() => { test(); }, /TypeError: Wrong Value/)
}

function test() {
  throw new TypeError('Wrong Value')
}

run();
```

## rejects()

This functions similarly to `throws()`, but is used with promises.
Use this with async functions.

```javascript
const assert = require('assert');

async function run() {
 await assert.rejects(async () => { await test(); }, /TypeError: Wrong Value/)
}

async function test() {
  throw new TypeError('Wrong Value')
}

run();

```
