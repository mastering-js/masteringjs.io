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
    await Test.countDocuments(); // 1
    await Test.deleteOne({_id: entry._id});
    await Test.countDocuments(); // 0
}

run();
```

## Using an Instance Method

You could also define a `deleteById()` method on the schema and as a result have it as a useable method on the model.

```javascript
const testSchema = new mongoose.Schema({
    name: String
});

testSchema.statics.deleteById = function(_id) {
    return this.deleteOne({_id: _id})
};

const Test = mongoose.model('Test', testSchema);

async function run() {
    const entry = await Test.create({ name: 'Masteringjs' });
    await Test.countDocuments(); // 1
    await Test.deleteById(entry._id);
    await Test.countDocuments(); // 0
    
}
```
