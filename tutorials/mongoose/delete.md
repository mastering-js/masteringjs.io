Mongoose's delete functions have middleware that can be registered on the schema if you wish to perform other tasks in addition to your delete operation.
To enable this feature, you must register them on the desired schema like so: 

```javascript
const testSchema = new mongoose.Schema({
    name: String
});
testSchema.pre('deleteOne', {document: false, query: true}, async function() {
// do stuff
});
testSchema.pre('deleteMany', {document: false, query: true}, async function() {
// do stuff
});
testSchema.pre('remove', {document: false, query: true}, async function() {
// do stuff
});
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
testSchema.pre('deleteMany', {document: false, query: true}, async function() {
// do stuff
});
testSchema.pre('remove', {document: false, query: true}, async function() {
// do stuff
});
```

## Change Streams

The middleware described above will only fire if the operations are called through mongoose.
You must use the change streams feature in order to detect changes in other applications like so:

```javascript
const testSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', testSchema);

Test.watch().on('change', data => console.log(data));
```

You must be connected to a MongoDB replica set or shared cluster to use change streams.
An error will be thrown if this is not the case.