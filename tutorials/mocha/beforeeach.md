By default, [Mocha's BDD interface adds a global `beforeEach()` function](https://mochajs.org/#bdd).
You can call `beforeEach()` with a function, and Mocha will execute that function before every test in the suite.

```javascript
beforeEach(function() {
  console.log('Running beforeEach!');
});

// Prints "Running beforeEach!"
it('test1', function() {});
// Prints "Running beforeEach!"
it('test2', function() {});
```

## With `describe()`

`describe()` lets you scope `beforeEach()` hooks.
If you define a `beforeEach()` in a `describe()`, Mocha will not run that `beforeEach()` on any tests outside of that `describe()`.

```javascript
beforeEach(function() {
  console.log('Running global beforeEach!');
});

describe('my test suite', function() {
  beforeEach(function() {
    console.log('Running my test suite beforeEach!');
  });

  // Prints both "Running beforeEach!" and "Running my test suite beforeEach!"
  it('test1', function() {});
  // Prints both "Running beforeEach!" and "Running my test suite beforeEach!"
  it('test2', function() {});
});

// Only prints "Running global beforeEach!"
it('test3', function() {});
```

So a global `beforeEach()` will run on every test, even tests within a `describe()`.
But a `beforeEach()` hook within a `describe()` will not run on any test outside of that `describe()`.

## Working Around Linters

By default, linters like [ESLint](/eslint) complain that `beforeEach()` is not defined.
There are a couple of workarounds.
First, you can explicitly import `beforeEach()` from Mocha:

```javascript
const { beforeEach } = require('mocha');
```

Or, you can set the [ESLint Mocha environment](https://eslint.org/docs/latest/use/configure/language-options#specifying-environments) in a `.eslintrc.js` in your `test` folder as follows.
For example, [Mongoose uses this approach to avoid having to explicitly import Mocha hooks](https://github.com/Automattic/mongoose/blob/587983eb0e88f841b5fea5064a978ee5da544cb2/test/.eslintrc.yml#L1-L2).

```javascript
// .eslintrc.js
module.exports = {
  env: {
    mocha: true
  }
};
```