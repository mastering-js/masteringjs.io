[Mongoose's `save()` function](https://mongoosejs.com/docs/api/model.html#model_Model-save)
is one way to save the changes you made to a document to the database. There are several
ways to [update a document in Mongoose](/tutorials/mongoose/update), but `save()` is the
most fully featured. You should use `save()` to update a document unless you have a good reason not to.

Working with `save()`
---------------------

`save()` is a method on a [Mongoose document](https://mongoosejs.com/docs/documents.html).
The `save()` method is asynchronous, so it returns a promise that you can
[`await`](/tutorials/fundamentals/async-await) on.

When you create an instance of a [Mongoose model](https://mongoosejs.com/docs/models.html) using `new`, calling `save()` makes Mongoose insert a new document.

```javascript
[require:Mongoose save insert new document$]
```

If you load an existing document from the database and modify it, `save()` updates the existing document instead.

```javascript
[require:Mongoose save update existing$]
```

Mongoose's change tracking sends a minimal update to MongoDB based on
the changes you made to the document. You can set [Mongoose's debug mode](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-set) to see the operations Mongoose sends to MongoDB.

```javascript
mongoose.set('debug', true);

person.rank = 'Captain';
// Prints:
// Mongoose: people.updateOne({ _id: ObjectId("...") }, { '$set': { rank: 'Captain' } })
await person.save();
```

Validation
----------

Mongoose _validates_ modified paths before saving. If you set a field to an
invalid value, Mongoose will throw an error when you try to `save()` that document.

```javascript
[require:Mongoose save validation$]
```

Middleware
----------

[Mongoose middleware](https://mongoosejs.com/docs/middleware.html) lets you tell Mongoose to execute a function every time `save()` is called. For example, calling `pre('save')` tells Mongoose to execute a function _before_ executing `save()`.

```javascript
[require:Mongoose save pre save$]
```

Similarly, `post('save')` tells Mongoose to execute a function _after_ calling `save()`. For example, you can combine `pre('save')` and `post('save')` to print out how long `save()` took.

```javascript
[require:Mongoose save post save$]
```

`save()` middleware is recursive, so calling `save()` on a parent document also triggers
`save()` middleware for subdocuments.

```javascript
[require:Mongoose save child middleware$]
```
