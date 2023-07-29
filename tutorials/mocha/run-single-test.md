There are two ways to run a single test in [Mocha](https://mochajs.org/):

1. Use the `-g` flag from the command line to search for tests to run
2. Mark the test with `.only()`, like `it.only('my test')`

From CLI Using `-g`
-------------------

The `-g` flag in Mocha takes in a regular expression (as a string) and runs test that match that regular expression.

Keep in mind that if you are running Mocha via `npm test`, you need to add a `--`.
So `mocha -g "test 1"` works fine with the Mocha CLI, but if you run the Mocha CLI via `npm test` you need to use `npm test -- -g "test 1"`.

For example, consider the following test file.

```javascript
describe('suite', function() {
  it('test 1', function() {});
  it('test 2', function() {});
});

it('test 3', function() {});
```

To run just "test 1", run `mocha test.js -g "test 1"`.
You'll get the following output.

```
$ ./node_modules/.bin/mocha ./test.js -g "test 1"


  suite
    ✓ test 1


  1 passing (3ms)

$
```

To run just "test 2", you can use `-g "test 2"`.

The `-g` flag searches for the entire test name, including parent `describe()` blocks.
So, for example, to run every test in the "suite" `describe()` block, you can use `-g "suite"`.
You'll get the following output:

```
$ ./node_modules/.bin/mocha ./test.js -g "suite"


  suite
    ✓ test 1
    ✓ test 2


  2 passing (3ms)

$
```

To avoid conflicting test names, we add unique snippets to test names, like the GitHub issue number or JIRA issue number.
That way you can run `npm test -- -g "13262"` to run the tests related to GitHub issue #13262, or `npm test -- -g "MVP-123"` to run tests related to JIRA issue `MVP-123`.

If all else fails, we sometimes add `XYZ` or some other string that is unlikely to occur in a test name to make the test easy to target with `-g`.

```javascript
describe('suite', function() {
  it('test 1 XYZ', function() {}); // <-- Add XYZ for easier `-g`
  it('test 2', function() {});
});

it('test 3', function() {});
```

The `XYZ` trick is not elegant, but it gets the job done, and the cost of accidentally committing `XYZ` in a test name is very low for most projects.

From Code Using `.only()`
-------------------------

The other approach for running just one test is using `.only()`.
For example, the following test code will _only_ run "test 1", regardless of CLI options.

```javascript
describe('suite', function() {
  it.only('test 1', function() {});
  it('test 2', function() {});
});

it('test 3', function() {});
```

Below is the output.

```
$ ./node_modules/.bin/mocha ./test.js


  suite
    ✓ test 1


  1 passing (3ms)

$ 
```

You can also add `.only()` to `describe()` calls.
For example, the following test code will run all tests underneath "suite".

```javascript
// Only run tests under `suite`, ignore other tests
describe.only('suite', function() {
  it('test 1', function() {});
  it('test 2', function() {});
});

it('test 3', function() {});
```

In general, we do **not** recommend using `.only()`.
If you commit code that uses `.only()`, you will skip the rest of the test suite, which can lead CI tools to think that your entire test suite passed, when reality only one test passed.

You can be very careful to avoid committing `.only()`, but [we've accidentally committed it before](https://github.com/Automattic/mongoose/issues/8596), and that taught us how easy it is for `only()` to slip through the cracks.
If you use `only()`, we recommend using the [eslint-mocha-no-only ESLint plugin](https://www.npmjs.com/package/eslint-plugin-mocha-no-only), which will throw an error if you accidentally commit `.only()`.