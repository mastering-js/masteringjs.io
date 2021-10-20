If you want to update several documents with one command in Mongoose, you should use the `updateMany()` function.
It takes up to four parameters:

1. **filter**, what documents it should find that match the filter.
You can omit this parameter if you want to update all the documents in the model.
2. **update**, what the documents that are being updated should now contain.
3. **options**, modifications that can be made to the process of the function call.


```javascript
const testSchema = new mongoose.Schema({
    name: String,
    location: String
});

const Test = mongoose.model('Test', testSchema);

await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Masteringjs'});
await Test.create({name: 'MeanIT'});

await mongoose.updateMany({},{location: 'Florida'});
```

## Return Value

Mongoose will return five properties from the `updateMany()` call:

1. `acknowledged`, a boolean indicating whether everything went smoothly.
2. `modifiedCount`, the number of documents that were updated.
Only documents that were updated will be included in this count.
For example, if you were changing the name of all the documents to `Test` but some documents already had the name `Test`, those documents would not be included in that count.
3. `upsertedId`, will either be `null` or contain an id if a document had to be upserted. 
4. `upsertedCount`, will reflect the number of documents that had to be upserted..
5. `matchedCount`, the number of documents that matched the filter.

```javascript
await mongoose.updateMany({}, {location: 'Florida'});
// { acknowledged: true, modifiedCount: 3, upsertedId: null, upsertedCount: 0, matchedCount: 3 }
```
