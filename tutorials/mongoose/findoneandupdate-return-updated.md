To make `findOneAndUpdate()` return the updated document, you need to use the `returnDocument` option.
`returnDocument` has two possible values: `'before'` and `'after'`.
The default behavior is `'before'`, which means returning the document as it was **before** the update was applied.

```javascript
const testSchema = new mongoose.Schema({
    name: String
});

await Test.create({name: 'Test Testerson'});

await Model.findOneAndUpdate({name: 'Test Testerson'}, {name: 'MasteringJS.io'}, {returnDocument: 'before'});
// {name: 'Test Testerson', _id: ... , __v: ...}
await Model.findOneAndUpdate({name: 'Test Testerson'}, {name: 'MasteringJS.io'}, {returnDocument: 'after'});
// {name: 'MasteringJS.io', _id: ... , __v: ...}
```

## The Time Before `returnDocument`

Before `returnDocument` was implemented, there were two similar options: `returnOriginal` or `new`.
Both were booleans that did what `returnDocument` does now.

```javascript
await Model.findOne(filter, update, {returnOriginal: false}); // equivalent to returnDocument: 'after'
await Model.findOne(filter, update, {new: true}); // equivalent to returnDocument: 'after'
```

**Note:** Mongoose still supports `returnOriginal` and `new`.
But `returnDocument` is the recommended approach. 