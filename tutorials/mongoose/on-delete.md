Mongoose lets you register [middleware](https://mongoosejs.com/docs/middleware.html) on delete functions.
This lets you add extra checks or other business logic that Mongoose executes every time someone calls a `deleteOne()` or `deleteMany()`.
To enable this feature, you must register them on the desired schema like so: 

```javascript
const aSchema = new mongoose.Schema({
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test'
  },
  name: String
});

aSchema.pre('deleteOne', function() {
  console.log('Before deleteOne');
});
aSchema.pre('deleteMany', function() {
  console.log('Before deleteMany');
});

const A = mongoose.model('A', aSchema);

await A.deleteOne(); // Prints "Before deleteOne"
await A.deleteMany(); // Prints "Before deleteMany"
```

### `this`

In `deleteOne()` and `deleteMany()` middleware, `this` is the Mongoose Query object, **not** the document(s) being deleted.

```javascript
aSchema.pre('deleteOne', function() {
  this instanceof mongoose.Query; // true
});
aSchema.pre('deleteMany', function() {
  this instanceof mongoose.Query; // true
});
```

Keep in mind that Mongoose registers `deleteOne()` and `deleteMany()` middleware on `Query.prototype.deleteOne()` and `Query.prototype.deleteMany()` by default.
That means `Document.prototype.deleteOne()` fires `deleteOne()` middleware, but only because `Document.prototype.deleteOne()` calls `Query.prototype.deleteOne()`.

```javascript
const testSchema = new mongoose.Schema({
  name: String
});
testSchema.pre('deleteOne', async function() {
  console.log(this instanceof mongoose.Query); // true
});
const Test = mongoose.model('Test', testSchema);

const doc = await Test.create({});

await doc.deleteOne(); // Prints "true"
```

You can make `deleteOne()` middleware fire with `this` as the document being deleted by setting the `{ document: true }` option on `pre()` and `post()` as shown below.
However, keep in mind that, if you set `{ document: true, query: false }`, your middleware will _only_ fire on `Document.prototype.deleteOne()`.
It won't fire on `Query.prototype.deleteOne()`.

```javascript
const testSchema = new mongoose.Schema({
  name: String
});
testSchema.pre('deleteOne', { document: true, query: false }, async function() {
  console.log(this instanceof mongoose.Document); // true
});
const Test = mongoose.model('Test', testSchema);

const doc = await Test.create({});

await doc.deleteOne(); // Prints "true"

await Test.deleteOne(); // Doesn't print anything
```

## Change Streams

Mongoose will only fire middleware if the delete operation goes through Mongoose.
For example, the previous section's middleware won't fire if someone deletes a document through the MongoDB shell, [Studio 3T](https://studio3t.com/), or an app written in Java.
You must use the change streams feature in order to detect changes from other apps as shown below:

```javascript
const testSchema = new mongoose.Schema({
  name: String
});

const Test = mongoose.model('Test', testSchema);

Test.watch().on('change', (data) => {
  // check if it is a delete operation
  if (data.operationType == 'delete') {
    // do stuff
  }
});
```

You must be connected to a MongoDB replica set or sharded cluster to use change streams.