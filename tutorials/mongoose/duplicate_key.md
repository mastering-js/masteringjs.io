[MongoDB's E11000 error](https://docs.mongodb.com/manual/core/index-unique/#unique-index-and-missing-field) is a common source of confusion. This error occurs when two documents have the
same value for a field that's [defined as `unique` in your Mongoose schema](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator).

Mongoose models have an `_id` field that's [always unique](https://docs.mongodb.com/manual/core/index-single/). If you try to insert two documents with the same `_id`, you get the below error message.

```
MongoError: E11000 duplicate key error collection: test.customers index: _id_
dup key: { : ObjectId('5cc5ea092dca872442916cf5') }
```

The `test.customers` part represents the MongoDB collection that the error occurred in. The `_id_` string is the name of the unique index, and the `ObjectId()` is the duplicate value.

The below code is one way you might get the above error message. MongoDB collections always have a unique index on `_id`, so trying to insert a document
with a duplicate id will cause a duplicate key error.

```javascript
[require:Mongoose.*duplicate key errors]
```

This error is often caused by `null` or `undefined` field values. `null` and `undefined` count as distinct values, so if you declare a field `email` as unique, two documents cannot have `email = undefined`. The below example [creates](https://mongoosejs.com/docs/api.html#model_Model.create) two documents without an `email` property, which causes a duplicate key error.

```javascript
[require:Mongoose.*undefined keys]
```

To make MongoDB E11000 error messages user-friendly, you should use the [mongoose-beautiful-unique-validation plugin](https://www.npmjs.com/package/mongoose-beautiful-unique-validation).

```javascript
[require:Mongoose.*E11000 plugin]
```