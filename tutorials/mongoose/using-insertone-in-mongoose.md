Mongoose models do not have an `insertOne()` method, you should use the `create()` function instead.

```javascript
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String
});
const TestModel = mongoose.model('Test', schema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017');
  await TestModel.create({
    name: 'Test Testerson'
  });
}
run();
```

If you are adamant about using `insertOne()`, you will need to call the function on the collection itself:

```javascript
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String
});
const TestModel = mongoose.model('Test', schema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017');
  await TestModel.collection.insertOne({ name: 'Test Testerson' });
}
run();
```

**Note:** All methods on `TestModel.collection` bypass Mongoose entirely. So `TestModel.collection.insertOne()` bypasses schema validation, middleware, getters/setters, and all other Mongoose features.