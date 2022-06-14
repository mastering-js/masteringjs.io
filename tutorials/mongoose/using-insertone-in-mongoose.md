Mongoose does not have an `insertOne()` method, you should use the `create()` function instead.

```javascript
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: String
});
const testModel = mongoose.model('Test', schema);

async function run() {
    await mongoose.connect('mongodb://localhost:27017');
    await testModel.create({
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
const testModel = mongoose.model('Test', schema);

async function run() {
    await mongoose.connect('mongodb://localhost:27017');
    await testModel.collection.insertOne({ name: 'Test Testerson' });
}
run();
```

**Note:** Be warned that doing so bypasses Mongoose, which means no schema validation and no hooks will be called/fired.