Mongoose's delete functions have middleware that can be registered on the schema if you wish to perform other tasks in addition to your delete operation.
To enable this feature, you must register them on the desired schema like so: 

```javascript
const aSchema = new mongoose.Schema({
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    name: String
});
const Amodel = mongoose.model('A', aSchema);
const testSchema = new mongoose.Schema({
    name: String
});
testSchema.pre('deleteOne', {document: false, query: true}, async function() {
    await Amodel.deleteOne({testId: this._id});
});
testSchema.pre('deleteMany', {document: false, query: true}, async function() {
// do stuff
});
const Test = mongoose.model('Test');
```

Beware that this is different from doing a delete operation on a single document.
To enable the middleware on firing on a single document instance, you must pass an object in the middleware like so:

```javascript
const testSchema = new mongoose.Schema({
    name: String
});
testSchema.pre('deleteOne', {document:true, query:false}, async function() {
    // do stuff
});
const Test = mongoose.model('Test', testSchema);

const entry = await Test.create({});

const doc = await Test.findOne({}).deleteOne();

```

## Change Streams

The middleware described above will only fire if the operations are called through mongoose.
You must use the change streams feature in order to detect changes in other applications like so:

```javascript
const testSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', testSchema);

Test.watch().on('change', (data) => {
    // check if it is a delete operation
    if (data.operationType == 'delete') {
        // do stuff
    }
});
```

You must be connected to a MongoDB replica set or shared cluster to use change streams.
An error will be thrown if this is not the case.