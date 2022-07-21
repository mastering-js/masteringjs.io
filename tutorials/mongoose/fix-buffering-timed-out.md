This error happens because you're trying to use a model whose connection hasn't connected to MongoDB.
Remember that, in Mongoose, every model has exactly one connection to MongoDB.
The buffering timeout is usually due to either registering models on a newly created connection but using `mongoose.connect()`:

```javascript
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String
});

async function run() {
  // Create a separate connection and register a model on it...
  const conn = mongoose.createConnection();
  conn.model('User', schema);

  // But call `mongoose.connect()`, which connects MongoDB's default
  // connection to MongoDB. `conn` is still disconnected.
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
  // Create a new connection and connect to MongoDB...
  const conn = await mongoose.
    createConnection('mongodb://localhost:27017/test').
    asPromise();

  // But register a model on Mongoose's default connection
  mongoose.model('User', schema);

  await mongoose.model('User').findOne(); // Error: buffering timed out
}

run();
```

To fix, make sure you call `mongoose.connect()` if you're defining models by calling `mongoose.model()`:

```javascript
async function run() {
  await mongoose.connect('mongodb://localhost:27017');
  mongoose.model('User', schema);

  await mongoose.model('User').findOne(); // Works!
}
```