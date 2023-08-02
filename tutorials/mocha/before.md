By default, [Mocha's BDD interface adds a global `before()` function](https://mochajs.org/#bdd) that registers a function Mocha will run before any tests.
`before()` is similar to [`beforeEach()`](./beforeeach); the key difference is that `before()` will run at most once, `beforeEach()` will run once before every test.

```javascript
// Prints "Running before!"
before(function() {
  console.log('Running before!');
});

it('test1', function() {});
it('test2', function() {});
```

`before()` is typically used to set up any logic that is too slow to execute before every test, like establishing a database connection or starting an HTTP server.
You can use `beforeEach()` instead of `before()` in most cases.

## With `describe()`

You can also call `before()` in a `describe()`.
That tells Mocha to run the `before()` function before any tests in the `describe()`.

```javascript
// Prints "Running before!"
describe('suite', function() {
  before(function() {
    console.log('Running before!');
  });

  it('test1', function() {});
  it('test2', function() {});
});
```

Mocha is smart enough to skip the `before()` hook if there's no tests to run in your `describe()`.
For example, if you [run a single test](./run-single-test) using `.only()`, the `before()` hook in the following example will **not** run.

```javascript
// Does **not** print "Running before!"
describe('suite', function() {
  before(function() {
    console.log('Running before!');
  });

  it('test1', function() {});
  it('test2', function() {});
});

it.only('test3', function() {});
```

## Working Around Linters

By default, linters like [ESLint](/eslint) complain that `before()` is not defined.
There are a couple of workarounds.
First, you can explicitly import `before()` from Mocha:

```javascript
const { before } = require('mocha');
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