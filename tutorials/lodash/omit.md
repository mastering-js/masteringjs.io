Given an object `obj` and an array of strings `paths`, [Lodash's `pick()` function](https://lodash.com/docs/4.17.15#pick) returns a new object
with all the keys in `obj` that are **not** in `paths`.
`omit()` is the opposite of [Lodash's `pick()` function](/tutorials/lodash/pick).

```javascript
[require:lodash omit basic example$]
```

`omit()` will not throw any errors if you try to omit paths that don't exist.

```javascript
[require:lodash omit non-existent paths$]
```

### Dotted Paths

Like `pick()`, `omit()` supports dotted paths and other syntaxes that [Lodash's `get()` function](/tutorials/lodash/get) supports.
You can omit properties underneath objects, and even individual array elements.

```javascript
[require:lodash omit dotted$]
```

### Vanilla JS Alternatives

If all you want to do is omit some top-level keys from an object, you might not need Lodash.
There are several ways to replicate `omit()` without Lodash, excluding dotted paths and other advanced functionality.

The most concise way is to use an anonymous [arrow function](/tutorials/fundamentals/arrow) combined with the [spread operator](/tutorials/fundamentals/spread) as follows.

```javascript
const obj = {
  name: 'Will Riker',
  rank: 'Commander',
  age: 29
};
// Looks tricky, but the idea is that you're calling an anonymous arrow
// function that uses the spread operator to get all properties _other than_
// `rank` and `age`.
const newObj = (({ rank, age, ...rest }) => rest)(obj);

newObj === obj; // false
newObj.name; // 'Will Riker'
newObj.rank; // undefined
newObj.age; // undefined
```

The above approach is concise, but hard to read, especially for beginners.
You can also implement a short helper function as follows.

```javascript
function omit(obj, keys) {
  const ret = {};
  keys = new Set(keys);

  const keysToCopy = Object.keys(obj).filter(key => !keys.has(key));
  for (const key of keysToCopy) {
    ret[key] = obj[key];
  }
  return ret;
}
```