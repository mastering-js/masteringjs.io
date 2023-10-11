One of the most common criticisms of Mocha is that it doesn't include any assertion tools.
It is impossible to write meaningful tests without some sort of assertions.
The idea is that [Node's built-in `assert` module](/tutorials/node/assert) is good enough for most use cases.

```javascript
const assert = require('assert');

describe('add', function() {
  it('adds two numbers', function() {
    assert.equal(add(1, 2), 3);
  });

  it('concatenates strings', function() {
    assert.equal(add('hello ', 'world'), 'hello world');
  });
});

function add(a, b) {
  return a + b;
}
```

We recommend using Node's built-in `assert` module with Mocha tests by default.
`assert.ok()`, `assert.equal()`, `assert.strictEqual()`, `assert.throws()`, `assert.rejects()`, and `assert.deepStrictEqual()` cover every assertion we've wanted to write over the last several years.

Alternative Approach: Chai
----------

[Chai](/tutorials/mocha/chai) is an assertion library that is commonly used with Mocha.
Chai exports several different flavors of assertions.
The [`expect`](https://www.chaijs.com/api/bdd/) flavor is the most common.

```javascript
const { expect } = require('chai');

describe('sum()', function() {
  it('adds two numbers', function() {
    // `expect()` takes in a parameter value and returns what Chai calls
    // a "chain"
    expect(add(2, 4)).to.equal(6);
  });

  it('ignores additional arguments', function() {
    expect(add(2, 4, 6)).to.equal(6);
  });
});

function add(a, b) {
  return a + b;
}
```

Chai's assertions are popular because they read more like English.
You can write expectations like the following:

```javascript
expect([1, 2]).to.be.an('array').that.does.not.include(3);
```

This syntax can be neat, especially for non-technical readers.
However, Chai syntax is fairly verbose, and can be difficult to write without practice.
We recommend using `assert` because `assert`'s API is simpler: you can get by with just 6 functions.