This issue typically happens when the dev uses `await` and passes a callback.
This is a problem because this executes the query twice!

```javascript
// Causes "query was already executed" error. That's because passing callback and using `await` executes the query twice.
await Model.updateMany({}, { $inc: { count: 1 } }, function(err) { /* ... */ });
```

Or:

```javascript
// Causes "query was already executed" error. That's because passing callback and using `then()` executes the query twice.
Model.updateMany({}, { $inc: { count: 1 } }, function(err) { /* ... */ }).then(() => { ... });
```

The workaround is to not pass a callback at all.

## But I want to execute it twice

If you're absolutely sure you want to execute the exact same query twice, you can use `clone()`

```javascript
let query = Model.findOne();

await query;

// Throws "query was already executed"
await query;

// Works

await query.clone();
```
