There is currently no method called `deleteById()` in mongoose.
However, there is the `deleteOne()` method with takes a parameter, `filter`, which indicates which document to delete.
Simply pass the `_id` as the `filter` and the document will be deleted.

```javascript
const testSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', testSchema);

async function run() {
  const entry = await Test.create({ name: 'Masteringjs.io' });
  console.log(await Test.countDocuments({ _id: entry._id })); // 1

  // Delete the document by its _id
  await Test.deleteOne({ _id: entry._id });

  console.log(await Test.countDocuments({ _id: entry._id })); // 0
}

run();
```

## Using an Instance Method

You could also make `deleteById()` a [Mongoose static](https://mongoosejs.com/docs/guide.html#statics) on your schema, which will make `deleteById()` a function on your model as shown below.

```javascript
const testSchema = new mongoose.Schema({
  name: String
});

testSchema.statics.deleteById = function(_id) {
  return this.deleteOne({ _id: _id })
};

const Test = mongoose.model('Test', testSchema);

async function run() {
  const entry = await Test.create({ name: 'Masteringjs' });
  console.log(await Test.countDocuments({ _id: entry._id })); // 1

  await Test.deleteById(entry._id);
  
  console.log(await Test.countDocuments({ _id: entry._id })); // 0  
}
```
