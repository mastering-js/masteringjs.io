A `soft delete` means to set a flag on a document that signifies that the document was deleted, rather than actually deleting the document.

```javascript
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: String,
    isDeleted: Boolean
});
```

## Using middleware like a pro

You can use middleware to filter out documents that have `isDelted: true` so the only documents being returned on find operations are not delted documents.

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
    
    for(let i = 0; i < 10; i++) {
        await Test.create({
            name: 'Test'+i
        });
        await Test.create({
            name: 'HiddenTest'+i,
            isDeleted: true
        })
    }
    await Test.find(); // HiddenTest documents will not be shown
    await Test.findOne(); // Only a Test document will be retrieved
}

run();
```