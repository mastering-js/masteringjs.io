You can use lodash's `cloneDeep()` function to recursively clone a value.

```javascript
const _ = require('lodash');

const obj = [{ a: 1, b: 2 }];

const copy = _.cloneDeep(obj);
console.log(copy); // [{ a: 1, b: 2 }];
```

## Other uses

`cloneDeep()` is also capable of copying classes.

```javascript
class MyClass {};
const obj  = new MyClass();

const copy = _.cloneDeep(obj);
copy instanceof MyClass; // true
```

## Warning: Proxies

`cloneDeep()` does not work well with Mongoose documents or reactive objects in Vue.
Avoid using in these cases.

```javascript

const _ = require('lodash');
const mongoose = require('mongoose');
async function run() {
  await mongoose.connect('mongodb://localhost:27017/test5');
  await mongoose.connection.dropDatabase();
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

  await newDoc.save(); // throws error
  console.log(newDoc);
}

run();
```



