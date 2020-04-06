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