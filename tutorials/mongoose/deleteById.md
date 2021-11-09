There is currently no method called `deleteById()` in mongoose.
However, there is the `deleteOne()` method with takes a parameter, `filter`, which indicates what document to delete.
Simply pass the `_id` as the `filter` and the document will be deleted.

```javascript
const testSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', testSchema);


async function run() {
const entry = await Test.create({ name: 'Masteringjs.io' });
await Test.find();
await Test.deleteOne({_id: entry._id});
await Test.find();
}

run();
```