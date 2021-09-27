To make `findOneAndUpdate()` return the updated document, you need to use the `returnDocument` option.
`returnDocument` has two options, `'before'` and `'after'`, with the default behavior being it gives the document before the update.

```javascript
await Model.findOneAndUpdate(filter, update, {returnDocument: 'after'});
```

## The Time Before returnDocument

Before `returnDocument` was implemented, the choices available were to use either `returnOriginal` or `new`.
Both were booleans that did what `returnDocument` does now.

```javascript
await Model.findOne(filter, update, {returnOriginal: false});
await Model.findOne(filter, update, {new: true});
```