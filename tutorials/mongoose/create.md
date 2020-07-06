Mongoose models have a [`create()` function](https://mongoosejs.com/docs/api/model.html#model_Model.create) that is often used to create new documents.

```javascript
[require:Mongoose create basic example$]
```

The `create()` function is a thin wrapper around the [`save()` function](/tutorials/mongoose/save).
The above `create()` call is equivalent to:

```javascript
const doc = new User({ email: 'bill@microsoft.com' });
await doc.save();
```

The most common reason for using `create()` is that you can conveniently `save()` multiple
documents with a single function call by passing an array of objects:

```javascript
[require:Mongoose create multiple$]
```

With Sessions and Transactions
----------------------------

In addition to passing an array of objects, `create()` also supports passing in a single
object, or a spread of objects. For example, below is another way you can create multiple documents.

```javascript
// Saves two new documents.
await User.create({ email: 'sergey@google.com' }, { email: 'bill@microsoft.com' });
```

The spread syntax unfortunately leads to syntactic ambiguity if you want to pass options to
the `create()` function, like if you want to use [transactions](https://mongoosejs.com/docs/transactions.html). For example, the below code will attempt to create two documents, rather
than treating the 2nd parameter as an `options` object.

```javascript
const session = await User.startSession();

await session.withTransaction(async () => {
  // Be careful, the below does **not** work! Instead of creating one document with the
  // associated session, it creates two documents with no session!
  await User.create({ email: 'sergey@google.com' }, { session });
});
```

Because of this, if you want to use `create()` in a transaction, you **must** pass the
documents as an array, even if you're only creating one document.

```javascript
const session = await User.startSession();

await session.withTransaction(async () => {
  // Creates one document with the given session. Note the `[]`!
  await User.create([{ email: 'sergey@google.com' }], { session });
});
```

Versus `insertMany()`
-------------------

Models also have an [`insertMany()` function](https://mongoosejs.com/docs/api/model.html#model_Model.insertMany) that is syntactically similar to `create()`.

```javascript
[require:Mongoose create insertMany$]
```

The biggest difference is that `insertMany()` ends up as one atomic `insertMany()` command
that Mongoose sends to the MongoDB server, but `create()` ends up as a bunch
of separate `insertOne()` calls. While this means `insertMany()` is usually faster,
it also means `insertMany()` is more susceptible to [slow trains](https://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs). Because of this, we recommend using `create()` instead of
`insertMany()`, unless you're willing to risk slowing down other operations to make your bulk insert fast.

Another difference is that `create()` triggers `save()` [middleware](https://mongoosejs.com/docs/middleware.html), because `create()` calls `save()` internally. `insertMany()` does not trigger `save()` middleware, but it does trigger `insertMany()` middleware.