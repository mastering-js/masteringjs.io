Suppose you have a [Mongoose model](https://mongoosejs.com/docs/models.html) `User`
that contains all your app's users. To get a list of all users in the collection, call [`User.find()`](https://mongoosejs.com/docs/api/model.html#model_Model.find) with an empty object as the first parameter:

```javascript
[require:Mongoose.*find all.*basic]
```

Equivalently, you can call `User.find()` with no arguments and get the same result.

```javascript
await User.find();
```

## Cursors

Suppose your app is very popular and you have millions of users. Loading all your
users into memory at once just won't work. To loop through all users one at a time without loading them all into memory at once, use a [cursor](https://mongoosejs.com/docs/api/query.html#query_Query-cursor).

```javascript
[require:Mongoose.*find all.*cursor]
```

Alternatively, you can use [async iterators](http://thecodebarbarian.com/getting-started-with-async-iterators-in-node-js).

```javascript
for await (const doc of User.find()) {
  // use `doc`
}
```