The `unique` option tells Mongoose that each document must have a unique value for a given path.
For example, below is how you can tell Mongoose that a user's `email` must be unique.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true // `email` must be unique
  }
});
const User = mongoose.model('User', userSchema);
```

If you try to create two users with the same `email`, you'll get a [duplicate key error](/tutorials/mongoose/e11000-duplicate-key).

```javascript
// Throws `MongoError: E11000 duplicate key error collection...`
await User.create([
  { email: 'test@google.com' },
  { email: 'test@google.com' }
]);

const doc = new User({ email: 'test@google.com' });
// Throws `MongoError: E11000 duplicate key error collection...`
await doc.save();
```

Updates can also throw a duplicate key error. For example, if you create a user with a unique email address and then update their email address to a non-unique value, you'll get the same error.

```javascript
await User.create({ email: 'test2@google.com' });

// Throws `MongoError: E11000 duplicate key error collection...`
await User.updateOne({ email: 'test2@google.com' }, { email: 'test@google.com' });
```

Index, Not Validator
--------------------

A common gotcha is that the `unique` option tells Mongoose to define a [unique index](https://docs.mongodb.com/manual/core/index-unique/). That means Mongoose does **not** check uniqueness
when you use `validate()`.

```javascript
await User.create({ email: 'sergey@google.com' });

const doc = new User({ email: 'sergey@google.com' });
await doc.validate(); // Does not throw an error
```

The fact that `unique` defines an index as opposed to a validator is also important when
writing automated tests. If you drop the database the `User` model is connected to, you'll
also delete the `unique` index, and you will be able to save duplicates.

```javascript
await mongoose.connection.dropDatabase();

// Succeeds because the `unique` index is gone!
await User.create([
  { email: 'sergey@google.com' },
  { email: 'sergey@google.com' }
]);
```

In production you normally wouldn't drop the database, so this is rarely an issue in production.

When writing Mongoose tests, we normally recommend using [`deleteMany()`](https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany) to clear out data in between tests, rather than [`dropDatabase()`](https://mongoosejs.com/docs/api/connection.html#connection_Connection-dropDatabase). This ensures that you delete all documents, without clearing out database-level configuration, like indexes and collations. [`deleteMany()` is also much faster than `dropDatabase()`](https://mongoosejs.com/docs/api/connection.html#connection_Connection-dropDatabase).

However, if you choose to drop the database between tests, you can use the [`Model.syncIndexes()` function](https://thecodebarbarian.com/whats-new-in-mongoose-5-2-syncindexes) to rebuild all unique indexes.

```javascript
await mongoose.connection.dropDatabase();

// Rebuild all indexes
await User.syncIndexes();

// Throws `MongoError: E11000 duplicate key error collection...`
await User.create([
  { email: 'sergey@google.com' },
  { email: 'sergey@google.com' }
]);
```

Handling `null` Values
--------------------

Since [`null`](/tutorials/fundamentals/null) is a distinct value, you cannot save two users that have a `null` email. Similarly,
you cannot save two users that don't have an `email` property.

```javascript
// Throws because both documents have undefined `email`
await User.create([
  {},
  {}
]);

// Throws because both documents have null `email`
await User.create([
  { email: null },
  { email: null }
]);
```

One workaround is to make the `email` property `required`, which disallows `null` and `undefined`:

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // `email` must be unique
  }
});
```

If you need `email` to be unique _unless_ it is not defined, you can instead define a [sparse unique index](https://docs.mongodb.com/manual/core/index-sparse/) on `email` as shown below.

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // `email` must be unique, unless it isn't defined
    index: { unique: true, sparse: true }
  }
});
```

User-Friendly Duplicate Key Errors
---------------------------------

To make MongoDB E11000 error messages user-friendly, you should use the [mongoose-beautiful-unique-validation plugin](https://www.npmjs.com/package/mongoose-beautiful-unique-validation).

```javascript
[require:Mongoose.*E11000 plugin]
```