In MongoDB, an [upsert](https://en.wiktionary.org/wiki/upsert) means an update that inserts a new document if no document matches the `filter`. To upsert a document in Mongoose, you should set the `upsert` option to the [`Model.updateOne()` function](https://mongoosejs.com/docs/api.html#model_Model.updateOne):

```javascript
[require:Mongoose.*upsert.*updateOne]
```

To get the upserted document, you should use the [`Model.findOneAndUpdate()` function](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate) instead of `Model.updateOne()`.

```javascript
[require:Mongoose.*upsert.*findOneAndUpdate]
```

Mongoose will insert at most one document. Even if you use [`Model.updateMany()`](https://mongoosejs.com/docs/api.html#model_Model.updateMany) with `upsert`, Mongoose will insert at most one document. To upsert multiple documents in bulk, you should use [the `Model.bulkWrite()` function](https://mongoosejs.com/docs/api.html#model_Model.bulkWrite).

```javascript
[require:Mongoose.*upsert.*bulkWrite]
```