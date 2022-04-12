Mongoose throws a 'Query was already executed' error when a given query is executed twice.
The most common explanation for this is you're mixing `await` and callbacks.

```javascript
// Causes "MongooseError: Query was already executed" error. That's because passing callback and using `await` executes the query twice.
await Model.updateMany({}, { $inc: { count: 1 } }, function(err) { /* ... */ });
```

Or:

```javascript
// Causes "MongooseError: Query was already executed" error. That's because passing callback and using `then()` executes the query twice.
Model.updateMany({}, { $inc: { count: 1 } }, function(err) { /* ... */ }).then(() => { ... });
```

The solution is to skip passing a callback.

```javascript
await Model.updateMany({}, { $inc: { count: 1 } });
// or
Model.updateMany({}, { $inc: { count: 1 } }).then(() => { ... });
```

## But I want to execute it twice

If you're absolutely sure you want to execute the exact same query twice, you can use `clone()`

```javascript
let query = Model.findOne();

await query;

// Throws "MongooseError: Query was already executed" error.
await query;

// Works

await query.clone();
```
