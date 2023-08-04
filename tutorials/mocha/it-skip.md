The [`it.skip()` function](https://mochajs.org/#inclusive-tests) tells Mocha to skip that particular test.
For example, in the following code, Mocha will **not** run `test2`.

```javascript
it('test1', function() {});
it.skip('test2', function() {});
it('test3', function() {});
```

Running Mocha on the above file will produce the following output.
Because test2 was skipped, Mocha will indicate that there's 1 "pending" test - "pending" tests are another word for skipped tests.

```
$ mocha ./test.js 


  ✓ test1
  - test2
  ✓ test3

  2 passing (4ms)
  1 pending

$ 
```

We recommend using `skip()` instead of commenting out tests.
The benefit of using `skip()` is that Mocha can tell you when there are tests skipped via the "pending" output, whereas Mocha can't tell you when there are commented out tests.

## With `describe()`

`.skip()` is the inverse of [`.only()`](./run-single-test): `skip()` skips the marked test, `only()` skips every test _other than_ the marked test.
Like `only()`, you can use `skip()` with `describe()` to skip a whole block of tests as follows.

```javascript
// Skip all tests in 'suite'
describe.skip('suite', function() {
  it('test1', function() {});
  it('test2', function() {});
});

it('test3', function() {});
```

The above script produces the following output.

```
$ mocha ./test.js 


  ✓ test3
  suite
    - test1
    - test2


  1 passing (3ms)
  2 pending

$ 
```