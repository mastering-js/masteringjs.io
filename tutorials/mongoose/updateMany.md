If you want to update several documents with one command in Mongoose, you should use the `updateMany()` function.
It takes up to three parameters:

1. **filter**: what documents it should find that match the filter. You can omit this parameter if you want to update all the documents in the model
2. **update**: a description of the updates to apply using [update operators](https://docs.mongodb.com/v4.0/reference/operator/update/)
3. **options**: other tuneable parameters


```javascript
const testSchema = new mongoose.Schema({
  name: String,
  location: String
});

const Test = mongoose.model('Test', testSchema);

await Test.create({ name: 'Test Testerson' });
await Test.create({ name: 'Mastering JS' });
await Test.create({ name: 'MeanIT' });

// Set `location` property on all documents
await Test.updateMany({}, { location: 'Florida' });

// Set `location` property on documents whose 'name' starts with 'M'
await Test.updateMany({ name: /^M/ }, { $set: { location: 'Miami' } });
```

## Return Value

`await Model.updateMany()` returns an object with 5 properties:

1. `acknowledged`: a boolean indicating whether the update operation was acknowledged by the server. See [write concerns](https://docs.mongodb.com/manual/reference/write-concern/).
2. `modifiedCount`: the number of documents that were updated.
Only documents that were updated will be included in this count.
For example, if you were changing the name of all the documents to `Test` but some documents already had the name `Test`, those documents would not be included in that count.
3. `upsertedId`: will either be `null` or contain an id if a document had to be upserted. 
4. `upsertedCount`: will reflect the number of documents that had to be upserted.
5. `matchedCount`: the number of documents that matched the filter.

```javascript
await Test.updateMany({}, { location: 'Florida' });
// { acknowledged: true, modifiedCount: 3, upsertedId: null, upsertedCount: 0, matchedCount: 3 }
```

`modifiedCount` will always be less than or equal to `matchedCount`.
`modifiedCount` may be less if some documents were unaffected by the update.
For example, if you run the above update twice, the second time `modifiedCount` will be 0 because all documents already have `location` set to 'Florida'.

```javascript
await Test.updateMany({}, { location: 'Florida' });

const res2 = await Test.updateMany({}, { location: 'Florida' });
res2.matchedCount; // 3
res2.modifiedCount; // 0, because no documents were changed
```