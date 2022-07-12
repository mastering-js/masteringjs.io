Mongoose's `limit()` function / option allows you to reduce the amount of results from the query.

```javascript
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', testSchema);

async function run() {
    await mongoose.connect('mongodb://localhost:27017');
    for (let i = 0 ; i < 10; i++) {
        await Test.create({
            name: 'Test'+i
        });
    }
    await Test.find().limit(2); // returns a maximum of two documents
}
run();
```

## Best Application of Limit

`limit()` is best used with `sort()`, because otherwise there is no guarantee of the order of the results.


```javascript
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model('Test', testSchema);

async function run() {
    await mongoose.connect('mongodb://localhost:27017');
    for (let i = 0 ; i < 10; i++) {
        await Test.create({
            name: 'Test'+i
        });
    }
    await Test.find().limit(5); // returns a maximum of 5 documents, could be in any order
    await Test.find().sort({ createdAt: -1 }).limit(5); // returns the first 5 documents created
}
run();
```

## Using callbacks

If you are using callbacks, make sure to call `limit()` **before** passing in a callback.
Failure to do so will result in the query executing without a limit as seen [here](https://stackoverflow.com/questions/49463518/sort-and-limit-not-working-in-mongoose-5-0-11).

