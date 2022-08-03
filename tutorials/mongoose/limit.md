Mongoose's `limit` option allows you to limit the amount of results from the query.
The easiest way to set the `limit` option is using the `limit()` method as follows.

```javascript
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: String
});

const Test = mongoose.model('Test', testSchema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017');
  for (let i = 0; i < 10; i++) {
    await Test.create({
      name: 'Test' + i
    });
  }
  console.log(await Test.find().limit(2)); // returns a maximum of two documents
}
run();
```

## Sorting

We recommend always using `limit()` with `sort()`.
If you don't specify `sort()`, the MongoDB server doesn't guarantee you'll get the results back in any particular order.
The MongoDB server applies `sort` _before_ `limit`, so MongoDB will sort the full result set and give you the first `limit` results in order.

```javascript
await Test.find().limit(5); // returns a maximum of 5 documents, could be in any order
await Test.find().sort({ createdAt: -1 }).limit(5); // returns the first 5 documents created
```

## Using callbacks

If you are using callbacks, make sure to call `limit()` **before** passing in a callback.
Failure to do so will result in the query executing without a limit as seen [here](https://stackoverflow.com/questions/49463518/sort-and-limit-not-working-in-mongoose-5-0-11).

