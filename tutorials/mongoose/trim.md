Mongoose has a `trim()` [SchemaType option](https://mongoosejs.com/docs/schematypes.html#schematype-options) that registers a [setter](https://mongoosejs.com/docs/tutorials/getters-setters.html) which automatically [trims](/tutorials/fundamentals/trim-string) leading and trailing whitespace from the given string.
[Whitespace](https://developer.mozilla.org/en-US/docs/Glossary/Whitespace) includes spaces, newlines `\n`, tabs `\t`, carriage return `\r`, and others.

```javascript
const userSchema = new Schema({
  name: {
    type: String,
    trim: true // Registers a setter which calls `trim()` automatically
  }
});
const UserModel = mongoose.model('User', userSchema);

const user = new User({ name: '  da Vinci  ' });
user.name; // 'da Vinci', without leading and trailing spaces
```

Whenever you set `user.name` in the above example, Mongoose will automatically call `trim()` to trim leading and trailing whitespace from the user's `name`.
This ensures that any new `name` properties you save to your database will have no leading or trailing whitespace.

Mongoose will also `trim()` the `name` property in your query filters by default.
So if you run a query by `name`, Mongoose will `trim()` the name by default.

```javascript
// The following is equivalent to querying by `{ name: 'da Vinci' }`
// because Mongoose will `trim()` the `name` property.
await UserModel.findOne({ name: '  da Vinci  ' });
```

## Caveat: `trim` is Setter Only, No Getter

`trim()` is a setter, so if you have existing documents in your database with leading or trailing whitespace, Mongoose will not `trim()` that whitespace when loading the document from MongoDB.

```javascript
const _id = new mongoose.Types.ObjectId();
// Insert a document with leading and trailing whitespace, bypassing Mongoose
await UserModel.collection.insertOne({ _id, name: '  da Vinci  ' });

const doc = await UserModel.findById(_id);
doc.name; // '  da Vinci  ', with leading and trailing whitespace
```

To apply the setter, you can set the document's `name` to itself as follows.

```javascript
// The following triggers Mongoose's setters, so will apply `trim()`.
doc.name = doc.name;

doc.name; // 'da Vinci', no leading or trailing whitespace
await doc.save(); // Persist the document's new `name`
```