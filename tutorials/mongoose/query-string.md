Mongoose's `Model.find()` function is an important method to understand.
You may call it without any arguments and it will return all the documents in that model.
You may hone the search by passing in a `filter` which tells mongoose what to look for in the database.
This `filter` may be an `objectId` or an `object`.
When using `Model.find()`, you should explicitly list the parameters you are searching for in the model.
This is important when pulling filter parameters from a query string, but not necessarily important in all cases.

```javascript
const testSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nationality: String
});

const obj = {name: 'MasteringMongoose', age: 1, location: 'Florida'}

await Model.find(obj); // bad will return all documents
await Model.find({firstName: obj.name.firstName}); // good, will only return documents with firstName == null, letting you know something is wrong.
```

## Doing a Raw Model.find()

`Model.find()`'s default behavior is that it will return all documents in the model, so if none of the properties passed exist, you will instead get back all the documents.

```javascript
const testSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nationality: String
});

await Model.create({firstName: 'Test', lastName: 'Testerson'});
await Model.create({firstName: 'Masteringjs', lastName: '.io'});
req = {};
await Model.find(req.query); // will return all documents as req.query is empty
```

## sanitizeFilter

Mongoose 6 introduces a new `sanitizeFilter` option that defends against [query selector injection attacks](https://thecodebarbarian.com/2014/09/04/defending-against-query-selector-injection-attacks.html).
It simply wraps the filter in a `$eq` tag. If you have `sanitizeFilter` enabled but want to allow a query selector through, you may wrap the selector in a `mongoose.trusted()` function.

```javascript
// With `sanitizeFilter`, Mongoose converts the below query to
// `{ email, hashedPassword: { $eq: { $ne: null } } }`
const user = await User.find({ email: 'john@acme.com', hashedPassword: { $ne: null } }).setOptions({ sanitizeFilter: true });
```