Mongoose throws a 'Query was already executed' error when a given query is executed twice.
The most common explanation for this is you're mixing `await` and callbacks.

```javascript
// Causes "MongooseError: Query was already executed" error. That's because Mongoose
// executes a query when it receives a callback _or_ when you `await`. If you
// `await` and pass a callback, this query executes twice.
await Model.updateMany({}, { $inc: { count: 1 } }, function(err) { /* ... */ });
```

Or:

```javascript
// Causes "MongooseError: Query was already executed" error. This query executes
// twice. Once because of the callback, and once because of `then()`.
Model.updateMany({}, { $inc: { count: 1 } }, function(err) { /* ... */ }).then(() => { ... });
```

The solution is to skip passing a callback.
You don't need callbacks in Mongoose, because [Mongoose supports promises](/tutorials/mongoose/promise) and [async/await](/tutorials/mongoose/find-async).

```javascript
await Model.updateMany({}, { $inc: { count: 1 } });
// or
Model.updateMany({}, { $inc: { count: 1 } }).then(() => { ... });
```

## But I want to execute a query twice twice

If you're absolutely sure you want to execute the exact same query twice, you can use `clone()`

```javascript
let query = Model.findOne();

await query;

// Throws "MongooseError: Query was already executed" error.
await query;

// Works
await query.clone();
```
