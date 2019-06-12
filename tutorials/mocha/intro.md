[Mocha](https://www.npmjs.com/package/mocha) is one of the most popular testing
frameworks for JavaScript. In particular, Mocha has been the test runner of choice in
the Node.js community essentially since it was first introduced in 2011.

Writing Your First Mocha Test
-----------------------------

By default, you define Mocha tests using `describe()` and `it()`. Mocha calls this [the BDD (short for "behavior-driven development") test interface](https://mochajs.org/#bdd). The `describe()` function defines a suite of tests, and the `it()` function defines an individual test. Suppose you have a simple function that adds two numbers:

```javascript
function sum(a, b) {
  return a + b;
}
```

Here's how you might write a Mocha test `test.js` for this function.

```javascript
// Node.js' built-in assertion library
const assert = require('assert');

const sum = require('./sum');

describe('sum()', function() {
  it('adds two numbers', function() {
    assert.equal(sum(2, 4), 6);
  });

  it('ignores additional arguments', function() {
    assert.equal(sum(2, 4, 6), 6);
  });
});
```

The `describe()` and `it()` functions are globals that the Mocha test runner creates. You can't run the above test using `node`. You instead need to `npm install mocha` and then run `./node_modules/.bin/mocha test.js`.

<img src="https://i.imgur.com/U86yp6T.png" style="width: 400px">

If you try to run `node test.js`, you will get the below error message:

```
ReferenceError: describe is not defined
```

Assertion Libraries
-------------------

Unlike many other test frameworks, Mocha doesn't come with a built-in assertion library. The previous example used [Node.js' built-in `assert` library](https://nodejs.org/api/assert.html). Many popular JavaScript libraries and frameworks, like [Express](https://github.com/expressjs/express/blob/e1b45ebd050b6f06aa38cda5aaf0c21708b0c71e/test/Router.js), use Mocha and Node.js `assert` for tests.

At its most basic level, an assertion library throws an error if a certain condition is not met. For example, the below code will throw an `AssertionError`:

```javascript
// Throws "AssertionError [ERR_ASSERTION]: false == true"
assert.ok(false);
```

There is nothing special about an `AssertionError` in Mocha. Mocha will treat _any_ uncaught error as a test failure, so you could theoretically write the `test.js` test suite without any assertion library:

```javascript
describe('sum()', function() {
  it('adds two numbers', function() {
    const res = sum(2, 4);
    if (res !== 6) {
      throw new Error('Incorrect result: ' + res);
    }
  });

  it('ignores additional arguments', function() {
    const res = sum(2, 4, 6);
    if (res !== 6) {
      throw new Error('Incorrect result: ' + res);
    }
  });
});
```

However, just because you can, doesn't mean you should. Most test suites involve a lot of assertions, so a good assertion framework can make your test suite much more concise and readable.

[Chai](https://www.npmjs.com/package/chai) is another popular assertion library that many projects use in conjunction with Mocha.

Async Tests
-----------

[Mocha has excellent support for promises and async functions](http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose#mocha). For example, the below `test.js` file works as expected:

```javascript
describe('sum()', function() {
  it('adds two numbers', function() {
    return Promise.resolve().then(() => {
      assert.equal(sum(2, 4), 6);
    });
  });

  it('ignores additional arguments', async function() {
    assert.equal(sum(2, 4, 6), 6);
  });
});
```

For older, callback-based libraries, you may see [Mocha's `done()` callback](https://mochajs.org/#detects-multiple-calls-to-done). Mocha passes an optional callback `done()` to the function you pass to `it()`.

```javascript
it('callback-style test', function(done) {
  setTimeout(() => done(), 50);
});
```

How Does Mocha Compare?
-----------------------

- [Jest](https://www.npmjs.com/package/jest): Jest is primarily for testing browser apps from Node.js. It comes with a lot more features than Mocha, like built-in assertions and automatic [jsdom](https://www.npmjs.com/package/jsdom) scaffolding using [jsdom-global](https://www.npmjs.com/package/jsdom-global). Unfortunately, this comes with a lot of quirks and [makes Jest unsuitable for testing server-side JavaScript](https://mongoosejs.com/docs/jest.html) without careful setup.

- [Ava](https://www.npmjs.com/package/ava): Ava is another popular testing framework primarily for Node.js applications. Ava has two big advantages over Mocha. First, Ava doesn't add implicit globals like `describe()` and `it()` by default. To declare a test in Ava, you need to do `const test = require('ava')`. Second, Ava allows running tests in parallel, something that [Mocha doesn't support without plugins](https://www.npmjs.com/package/mocha-parallel-tests). However, for many developers, these advantages aren't significant enough to justify switching off of Mocha.

- [Jasmine](https://www.npmjs.com/package/jasmine): Jasmine and Mocha have essentially equivalent syntax. The major differences are that Jasmine includes a [built-in assertion library](https://devhints.io/jasmine) and a [built-in `spyOn()` function](https://jasmine.github.io/2.0/introduction.html#section-Spies). To get similar functionality in Mocha, you'd need to include libraries like [chai](http://npmjs.com/package/chai) and [sinon](https://www.npmjs.com/package/sinon). However, chai and sinon have additional features that Jasmine's built-in assertions and spies do not.