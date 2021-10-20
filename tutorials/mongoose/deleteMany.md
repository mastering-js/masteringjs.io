The `deleteMany()` function is how you can delete multiple documents from a collection using Mongoose.
It takes up to two parameters:
1. **condition**, what a document should contain to be eligible for deletion.
You can omit this property to delete all documents in the model.
2. **options**, how to modify the deletion process.


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