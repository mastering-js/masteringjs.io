If you wish to update several documents in your model with mongoose, you should use the `updateMany()` function.
It takes up to four parameters:

- **filter**, what documents it should find that match the filter.
You can omit this parameter if you want to update all the documents in the model.
- **update**, what the documents that are being updated should now contain.
- **options**, modifications that can be made to the process of the function call.
- **A callback function(err, res)**, where `res` has three properties: `n`, `nModified`, and `ok`.

```javascript
const testSchema = new mongoose.Schema({
    name: String,
    location: String
});

const Test = mongoose.model('Test', testSchema);

await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Masteringjs'});
await Test.create({name: 'MeanIT'});

await mongoose.updateMany({},{location: 'Florida'},{},(err, res) => {
    res; // {n, nModified, ok}
});
```

## Return Value

Mongoose will return three properties from the `updateMany()` call: `n`, `nModified`, and `ok`.
`n` is the number of documents that matched the filter, while `nModified` is the number of documents that were updated.
Documents that did not have need the change being applied will not be included in this count. For example, if you were changing the name
of all the documents to `Test` but some documents already had the name `Test`, those documents would not be included in that count.

```javascript
await mongoose.updateMany({}, {age: 'Florida'}); // {n, nModified, ok}
```
