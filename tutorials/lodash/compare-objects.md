Lodash has an [`isEqual()` function](https://lodash.com/docs/4.17.15#isEqual) that checks if two values are [deeply equal](/tutorials/fundamentals/shallow-copy). This function is different from the [`===` operator](/tutorials/fundamentals/equals), which only checks if two objects are the exact same reference:

```javascript
[require:lodash isEqual basic example$]
```

When comparing primitive values, the `isEqual()` function uses [SameValueZero semantics](/tutorials/fundamentals/equality), which means that `NaN` is considered equal to itself, and `+0` is considered equal to `-0`.

```javascript
_.isEqual({ x: NaN }, { x: NaN }); // true
_.isEqual({ x: +0 }, { x: -0 }); // true
```

Built-in Classes
----------------

In addition, `isEqual()` is smart enough to [compare arrays](/tutorials/fundamentals/compare-arrays), dates, `Number` instances, and other built-in classes:

```javascript
[require: lodash isEqual built-in classes$]
```

This makes `isEqual()` ideal for checking if two [POJOs](/tutorials/fundamentals/pojo) have the same data.

With [Classes](/tutorials/fundamentals/class)
--------------------------------------

The `isEqual()` function treats two objects as different if they are instances of different classes. For example,
even though the two objects in the below example have the same keys and values, they are different because `obj2`
is an instance of the `Character` class and `obj1` is not.

```javascript
[require: lodash isEqual using classes$]
```

Depending on your use case, this may be an issue. However, in general, you should only use `isEqual()` for
comparing POJOs as opposed to complex classes. In particular, if you want to compare [Mongoose documents](https://mongoosejs.com/docs/documents.html), you should convert the document to a POJO using `toObject()` first:

```javascript
const Character = mongoose.model('Character', Schema({
  _id: false,
  name: String,
  age: Number
}));
const doc = new Character({ name: 'Will Riker', age: 29 });

// false, because `doc` is a document, not a POJO
_.isEqual(doc, { name: 'Will Riker', age: 29 });

// true
_.isEqual(doc.toObject(), { name: 'Will Riker', age: 29 });
```