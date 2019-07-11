In Mongoose, the [`Model.findById()` function](https://mongoosejs.com/docs/api/model.html#model_Model.findById) is used to
find one document by its `_id`. The `findById()` function takes in a single
parameter, the document id. It returns a promise that resolves to the
[Mongoose document](https://mongoosejs.com/docs/documents.html) if MongoDB found 
a document with the given `id`, or `null` if no document was found.

```javascript
[require:Mongoose.*findById.*basic]
```

When you call `findById(_id)`, Mongoose calls `findOne({ _id })` under the hood.
That means `findById()` triggers [`findOne()` middleware](https://mongoosejs.com/docs/middleware.html).

```javascript
[require:Mongoose.*findById.*findOne]
```

[Mongoose casts queries to match your schema](https://mongoosejs.com/docs/tutorials/query_casting.html). That means if your
`_id` is a [MongoDB ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/), you can pass the `_id` as a string and Mongoose will convert it to an ObjectId for you.

```javascript
[require:Mongoose.*findById.*ObjectId]
```