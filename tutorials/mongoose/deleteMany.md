If you wish to delete several documents in mongoose, use the `deleteMany()` function.
It takes up to three parameters:
- **condition**, what a document should contain to be eligible for deletion.
You can omit this property to delete all documents in the model.
- **options**, how to modify the deletion process.
- **A callback function(err,res)**, use this if you are not using `async/await`.

```javascript
const testSchema = new mongoose.Schema({
    name: String
});
const Test = mongoose.model('Test', testSchema);

await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Masteringjs'});
await Test.create({name: 'MeanIT'});

await Test.deleteMany({name: 'Test Testerson'});
await Test.find(); // will return Masteringjs and MeanIT documents
```

## Return Value

Once the documents are deleted, it will return an object with a property, `deletedCount`, containing the number of documents deleted.

```javascript
const testSchema = new mongoose.Schema({
    name: String
});
const Test = mongoose.model('Test', testSchema);

await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Test Testerson'});
await Test.create({name: 'Masteringjs'});
await Test.create({name: 'MeanIT'});

await Test.deleteMany({name: 'Test Testerson'}); // {deletedCount: 3}
```