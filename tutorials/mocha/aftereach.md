By default, [Mocha's BDD interface adds a global `afterEach()` function](https://mochajs.org/#bdd).
You can call `afterEach()` with a function, and Mocha will execute that function after every test in the suite.
You should use `afterEach()` to clean up any persistent state your test created, like entries saved in your database or calling `sinon.restore()`.

```javascript
afterEach(function() {
  console.log('Running afterEach!');
});

// Prints "Running afterEach!" after "test1"
it('test1', function() {
  console.log('test1');
});
// Prints "Running afterEach!" after "test2"
it('test2', function() {
  console.log('test2');
});
```

`afterEach()` is like [`beforeEach()`](/tutorials/mocha/beforeeach), but runs after every test rather than before.

## With `describe()`

`describe()` lets you scope `afterEach()` hooks.
If you define a `afterEach()` in a `describe()`, Mocha will not run that `afterEach()` on any tests outside of that `describe()`.

```javascript
afterEach(function() {
  console.log('Running global afterEach!');
});

describe('my test suite', function() {
  afterEach(function() {
    console.log('Running my test suite afterEach!');
  });

  // Prints both "Running afterEach!" and "Running my test suite afterEach!"
  it('test1', function() {});
  // Prints both "Running afterEach!" and "Running my test suite afterEach!"
  it('test2', function() {});
});

// Only prints "Running global afterEach!"
it('test3', function() {});
```

So a global `afterEach()` will run after every test, even tests within a `describe()`.
But a `afterEach()` hook within a `describe()` will not run on any test outside of that `describe()`.

## Skipped Tests

Mocha will **not** run `afterEach()` if there are no tests.
For example, if you [run a single Mocha test](./run-single-test) using `.only()`, Mocha will not execute the `afterEach()` hook in the following test file.

```javascript
describe('my test suite', function() {
  afterEach(function() {
    console.log('Running my test suite afterEach!');
  });

  it('test1', function() {});
  it('test2', function() {});
});

// Because of `.only()`, Node will **not** print
// "Running my test suite afterEach!"
it.only('test3', function() {});
```