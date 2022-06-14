This error at its core is a result of not being able to connect to MongoDB.
It is triggered when you are executing an operation on a model whose connection is not connected to MongoDB.
Usually due to either registering models on a newly created connection but using `mongoose.connect()`:

```javascript
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String
});

async function run() {

const conn = await mongoose.createConnection();

conn.model('User', schema);

await mongoose.connect('mongodb://localhost:27017');

await conn.model('User').findOne(); // Error: buffering timed out ...
}

run();
```

Or by registering models using `mongoose.model()` but creating a separate connection:

```javascript
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String
});

async function run() {

const conn = await mongoose.createConnection('mongodb://localhost:27017/test').asPromise();

mongoose.model('User', schema);

await mongoose.model('User').findOne(); // Error: buffering timed out ...
}

run();
```