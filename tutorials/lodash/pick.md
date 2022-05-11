Given an object `obj` and an array of string `paths`, [Lodash's `pick()` function](https://lodash.com/docs/4.17.15#pick) returns a new object
with just the keys `paths` from `obj`.

```javascript
[require:lodash pick basic example$]
```

The `pick()` function also supports dotted paths and any other syntax that
[Lodash's `get()` function](/tutorials/lodash/get) supports. For example,
if `name` is a nested object with 2 properties, `first` and `last`, you
can pick just `name.last` and omit `name.first`.

```javascript
[require:lodash pick dotted$]
```

`pick()` is permissive when it comes to missing properties. If you try
to `pick()` a dotted property whose parent is undefined, Lodash will
just ignore that path.

```javascript
[require:lodash pick no errors$]
```

Several other frameworks have analogous `pick()` functions. For example,
[Mongoose schemas have a `pick()` function](https://mongoosejs.com/docs/api/schema.html#schema_Schema-pick) that creates a new schema a subset of the original schema's paths.

### Vanilla JS Alternatives

There are a couple of different patterns you can use to approximate Lodash's `pick()` function in vanilla JavaScript.
Our favorite is to use an [IIFE](/tutorials/fundamentals/iife) as shown below:

```javascript
const obj = {
  name: 'Will Riker',
  rank: 'Commander',
  age: 29
};

// Looks tricky, but the idea is that you're calling an anonymous arrow
// function that returns just the `name` and `rank` properties of the passed
// in object.
const picked = (({ name, rank }) => ({ name, rank }))(obj);
picked.name; // 'Will Riker'
picked.rank; // 'Commander'
picked.age; // undefined
```

Below is an easier to read, but less concise, way of doing the same thing:

```javascript
const pickNameRank = ({ name, rank }) => ({ name, rank });
const picked = pickNameRank(obj);
```

This IIFE approach has a few downsides:

1. You need to know the property names ahead of time. It would be tricky to extend this pattern to operate on an array of keys.
2. No support for dotted keys. You can't do something like `({ 'name.first' }) => ...`.

Another approach we like is defining a function with a `for` loop that creates a new object as shown below.
This approach is less concise, but more flexible.

```javascript
function pick(obj, keys) {
  const ret = {};
  for (const key of keys) {
    ret[key] = obj[key];
  }
  return ret;
}
```