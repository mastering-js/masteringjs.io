You can use lodash's `cloneDeep()` function to [deep copy](/tutorials/fundamentals/shallow-copy) a value.

```javascript
const _ = require('lodash');

const obj = [{ a: 1, b: 2 }];

const copy = _.cloneDeep(obj);
console.log(copy); // [{ a: 1, b: 2 }];
```

## With Classes

If you call `cloneDeep()` on an instance of a [class](/tutorials/fundamentals/class), `cloneDeep()` will also copy the class information.

```javascript
class MyClass {};
const obj  = new MyClass();

const copy = _.cloneDeep(obj);
copy instanceof MyClass; // true
```

## Warning: Proxies

`cloneDeep()` does not work well with [Mongoose documents](https://mongoosejs.com/docs/documents.html) or [reactive objects in Vue](/tutorials/vue/reactivity).
With Vue, the cloned object will not be reactive.
With Mongoose documents, you won't be able to save the cloned document.

```javascript
const _ = require('lodash');
const mongoose = require('mongoose');
async function run() {
  await mongoose.connect('mongodb://localhost:27017/test5');

  const arr2Schema = new mongoose.Schema({ _id: false, prop1: String });
  const arr1Schema = new mongoose.Schema({ _id: false, arr2: [arr2Schema] });
  const Test = mongoose.model(
    'Test',
    new mongoose.Schema({
      arr1: [arr1Schema],
      field: String,
    }),
  );

  let doc = new Test({ arr1: [{ arr2: [{ prop1: 'test' }] }] });
  await doc.save();

  const doc2 = await Test.findById(doc._id);
  const newDoc = _.cloneDeep(doc2).set({ field: 'test' });

  await newDoc.save(); // Mongoose-internal TypeError
}

run();
```

In general, we only recommend using `cloneDeep()` on POJOs.

