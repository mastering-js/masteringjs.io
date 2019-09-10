[The Mocha test framework](https://www.npmjs.com/package/mocha) has excellent support for async tests. Generally speaking, there are 3 ways to structure async tests with Mocha:

- [async/await](http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html)
- [promise chaining](http://thecodebarbarian.com/the-80-20-guide-to-promises-in-node-js.html)
- callbacks

In this tutorial, you'll learn how to write Mocha tests using each of these 3 paradigms.

Setup
-----

Suppose you have an asynchronous function that makes an HTTP request using [Axios](https://www.npmjs.com/package/axios).

```javascript
[require:Mocha.*axios example]
```

The function `get()` takes one parameter, a URL, and returns a [promise](/tutorials/fundamentals/promise). Let's test this function with Mocha, 3 different ways.

Async Functions
---------------

[Mocha supports async functions out of the box](http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose#mocha), no plugins or configuration needed. You can pass an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to `it()`, and Mocha will handle any errors that occur.

```javascript
describe('get()', function() {
  it('works', async function() {
    const res = await get('http://httpbin.org/get?answer=42');
    assert.equal(res.data.args.answer, 42);
  });
});
```

Promises
--------

You might be surprised to know that [Mocha has supported async functions since 2014](https://github.com/mochajs/mocha/blob/master/CHANGELOG.md#1180--2014-03-13). Async functions were only introduced in 2017, but async functions return promises, and Mocha has supported promises since before they were formally introduced into JavaScript.

In other words, if you return a promise or promise from your `it()` function, Mocha will handle it for you.

```javascript
describe('get()', function() {
  it('works', function() {
    return get('http://httpbin.org/get?answer=42').
      then(res => assert.equal(res.data.args.answer, 42));
  });
});
```

Callbacks using `done()`
------------------------

In older codebases, you may see callback-based tests using [Mocha's `done()` function](https://mochajs.org/#asynchronous-code). This style is a bit archaic since promises have been a part of JavaScript since 2015 and async/await since 2017, but you may run into it at some point.

Mocha inspects the function you pass to `it()`. If that function takes a parameter, Mocha assumes that parameter is a `done()` callback that you will call to indicate your test is done. Here's how you would test the `get()` function using Mocha's `done()` callback.

```javascript
describe('get()', function() {
  it('works', function(done) {
    get('http://httpbin.org/get?answer=42').
      then(res => {
        assert.equal(res.data.args.answer, 42);
        // `done()` with no parameters means the test succeeded
        done();
      }).
      // If you pass a parameter to `done()`, Mocha considers that an error
      catch(err => done(err));
  });
});
```

If you call `done()` with no arguments, you're telling Mocha that your test succeeded. If you pass a parameter, Mocha assumes that parameter is an error.

Make sure you call `done()`! If you don't call `done()`, your Mocha test will time out. You'll see the below error:

```
Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called
```

If you see this error, either you need to [increase your Mocha test timeout](https://mochajs.org/#test-level) or there's some bug in your code that's preventing `done()` from getting called.