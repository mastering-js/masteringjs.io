[Express' error handling middleware](http://expressjs.com/en/guide/error-handling.html) helps you handle errors without repeating yourself. Suppose you handle errors directly in your Express route handler:

```javascript
app.put('/User/:id', async function(req, res) {
  let user;
  try {
    user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
  return res.json({ user });
});
```

The above code works, but, if you have hundreds of endpoints, your error handling
logic becomes unmaintainable because it is duplicated hundreds of times. Enter
[error handling middleware](https://thecodebarbarian.com/80-20-guide-to-express-error-handling).

Introducing Error Handling Middleware
-------------------------------------

Express looks at the number of arguments a middleware function takes to determine
what type of middleware it is. A middleware function that takes 4 arguments is
defined as error handling middleware.

```javascript
[require:Express.*error handling.*basic]
```

Express automatically handles synchronous errors for you, like the `routeHandler()` function above. Express does **not** handle asynchronous errors though. If you
have an asynchronous error, like one in an [async function](http://thecodebarbarian.com/async-functions-in-javascript.html), you need to call `next()`.

```javascript
[require:Express.*error handling.*async]
```