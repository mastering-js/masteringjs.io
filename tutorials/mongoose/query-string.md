Mongoose's `Model.find()` function is an important method to understand.
You may call it without any arguments and it will return all the documents in that model.
You may hone the search by passing in a `filter` which tells mongoose what to look for in the database.
This `filter` may be an `objectId` or an `object`.
When using `Model.find()`, you should explicitly list the parameters you are searching for in the model.
`Model.find()`'s default behavior is that it will return all documents in the model, so if none of the properties
passed exist, you will instead get back all the documents.

```javascript
const testSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nationality: String
});

const obj = {name: 'MasteringMongoose', age: 1, location: 'Florida'}

await Model.find(obj); // bad will return all documents
await Model.find({firstName: obj.name.firstName}); // good, will throw an error stating that firstName is undefined, letting you know something is wrong
```

## sanitizeFilter

Mongoose 6 introduces a new `sanitizeFilter` option that defends against [query selector injection attacks](https://thecodebarbarian.com/2014/09/04/defending-against-query-selector-injection-attacks.html).
It simply wraps the filter in a `$eq` tag. If you have `sanitizeFilter` enabled but want to allow a query selector through, you may wrap the selector in a `mongoose.trusted()` function.