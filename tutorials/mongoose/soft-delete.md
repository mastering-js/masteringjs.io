A soft delete means setting an `isDeleted` flag on the document to mark a document as deleted, rather than actually deleting the document.
This means you can keep the document for future analysis.

```javascript
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: String,
  isDeleted: Boolean
});
```

## Using Query Middleware

You can use middleware to filter out documents that have `isDeleted: true`, so Mongoose only returns documents that don't have `isDeleted: true`.

```javascript
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, defaults: false }
});

testSchema.pre('find', function() {
  this.where({ isDeleted: false });
});

testSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

const Test = mongoose.model('Test', testSchema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017');
  await mongoose.connection.dropDatabase();
  
  await Test.create({
    name: 'Test'
  });
  await Test.create({
    name: 'HiddenTest',
    isDeleted: true
  });

  // Only returns `Test` document, not `HiddenTest`
  const docs = await Test.find();
}

run();
```