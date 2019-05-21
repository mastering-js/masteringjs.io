[Express](http://expressjs.com/) doesn't support promises or async/await in middleware or routes. In the below example, the Express endpoint will never
send a response because of an [unhandled promise rejection](https://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html).

```javascript
[require:Express.*promises.*promise errors]
```

In order to make sure your Express app doesn't hang forever, you need to make sure your middleware functions call `next()` and your route handlers call [`res.send()`](http://expressjs.com/en/4x/api.html#res.send) or [`res.json()`](http://expressjs.com/en/4x/api.html#res.json). The easiest way to do this is with the [`@awaitjs/express` library](https://www.npmjs.com/package/@awaitjs/express).

```javascript
[require:Express.*promises.*wrapper]
```

If you don't want to use an outside library, you can handle errors yourself. With async/await, you can wrap your logic in a `try/catch` to make sure errors are caught. Just make sure your `catch` block doesn't throw an error.

```javascript
[require:Express.*promises.*try.*catch]
```

If you're using promise chaining, you should use [the `Promise#catch()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch).

```javascript
[require:Express.*promises.*Promise catch]
```
