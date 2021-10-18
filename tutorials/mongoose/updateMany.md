If you wish to update several documents in your model with mongoose, you should use the `updateMany()` function.
It takes up to four parameters:

- **filter**, what documents it should find that match the filter.
You can omit this parameter if you want to update all the documents in the model.
- **update**, what the documents that are being updated should now contain.
- **options**, modifications that can be made to the process of the function call.
- **A callback function(err, res)**, where `res` has five properties: `acknowledged`, `modifiedCount`, `upsertedId`, `upsertedCount`, and `matchedCount`.
Add this argument if you are not using `async/await`.

```javascript
const testSchema = new mongoose.Schema({
    name: String,
    location: String
});

const Test = mongoose.model('Test', testSchema);

await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Masteringjs'});
await Test.create({name: 'MeanIT'});

await mongoose.updateMany({},{location: 'Florida'},{}) // {acknowledged, modifiedCount, upsertedId, upsertedCount, matchedCount}
```

## Return Value

Mongoose will return five properties from the `updateMany()` call: `acknowledged`, `modifiedCount`, `upsertedId`, `upsertedCount`, and `matchedCount`.
`matchedCount` is the number of documents that matched the filter, while `modifiedCount` is the number of documents that were updated.
Documents that did not have need the change being applied will not be included in this count. For example, if you were changing the name
of all the documents to `Test` but some documents already had the name `Test`, those documents would not be included in that count.
`acknowledged` is a boolean indicating whether everything went smoothly, `upsertedId` will either be `null` or contain an id if a document had to be upserted, and `upsertedCount` will reflect the number of documents that had to be upserted. 

```javascript
await mongoose.updateMany({}, {location: 'Florida'});
// { acknowledged: true, modifiedCount: 3, upsertedId: null, upsertedCount: 0, matchedCount: 3 }
```
