[Mongoose has built-in support for promises](https://mongoosejs.com/docs/promises.html). In Mongoose 5, async operations like `.save()` and
`.find().exec()` return a promise **unless** you pass a callback.

```javascript
[require:Mongoose promise basic example$]
```

The `mongoose.Promise` Property
-------------------------------

The Mongoose singleton has a [`Promise` property](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-Promise) that you can use to set the promise library Mongoose uses. For example, you can make Mongoose use the popular [Bluebird promise library](https://www.npmjs.com/package/bluebird):

```javascript
const Bluebird = require('bluebird');

// Make Mongoose use Bluebird instead of built-in promises.
mongoose.Promise = Bluebird;

const doc = new Model({ name: 'Neo' });

const promise = doc.save();
promise instanceof Promise; // false
promise instanceof Bluebird; // true
```

If you haven't upgraded to Mongoose 5 yet, you might see the below
deprecation warning in Mongoose 4.x:

```
WARNING: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead
```

To resolve that deprecation warning, you would add the below code:

```javascript
mongoose.Promise = global.Promise;
```

That's because one of the breaking changes in Mongoose 5 was switching to
using Node.js' native promises. Mongoose 4 was released before ES6, so it
had its own promise implementation that was slightly different from native [JavaScript promises](/tutorials/fundamentals/promise).

If you see `mongoose.Promise = global.Promise` in code that uses Mongoose 5,
please delete it. Mongoose 5 uses native promises by default, so that code
does nothing in Mongoose 5.

Queries are not Promises
------------------------

While `save()` returns a promise, functions like [Mongoose's `find()`](/tutorials/mongoose/find) return a [Mongoose `Query`](https://mongoosejs.com/docs/queries.html).

```javascript
const query = Model.find();

query instanceof Promise; // false
query instanceof mongoose.Query; // true
```

Mongoose queries are [thenables](https://en.wiktionary.org/wiki/thenable).
In other words, queries have a [`then()` function](https://mongoosejs.com/docs/api/query.html#query_Query-then) that behaves similarly to the [Promise `then()` function](/tutorials/fundamentals/then). So you can use queries with [promise chaining](/tutorials/fundamentals/then#chaining) and [async/await](/tutorials/fundamentals/async-await).

```javascript
// Using queries with promise chaining
Model.findOne({ name: 'Mr. Anderson' }).
  then(doc => Model.updateOne({ _id: doc._id }, { name: 'Neo' })).
  then(() => Model.findOne({ name: 'Neo' })).
  then(doc => console.log(doc.name)); // 'Neo'

// Using queries with async/await
const doc = await Model.findOne({ name: 'Neo' });
console.log(doc.name); // 'Neo'
```