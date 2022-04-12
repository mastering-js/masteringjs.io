To filter object properties in mongoose, you can use the `select()` function on the query.
The `select()` function allows you to select the fields you wish to return.

```javascript
// will return all documents with just the age, name, and the _id properties on the documents.
await Model.find({}).select('name age');
```

## The _id property

MongoDB includes `_id` by default.
To exclude the `_id` when picking fields, you need to do `.find().select({ name: 1, _id: 0 })` or `.find().select('name -_id')`.
The minus and 0 indicates to ignore that field on the document when the query runs.

```javascript
await Model.find().select({ name: 1, _id: 0 });
```

Or

```javascript
await Model.find().select({'name -_id'});
```
