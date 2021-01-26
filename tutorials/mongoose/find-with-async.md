The Mongoose `find(filter, callback)` function allows you to query for documents with the given key(s)/value(s) and it will return an array of documents that match the given filter. You can use this function with asynchronous calls as follows:

```javascript
[require:mongoose-find-async find]
```

If you omit the filter parameter in the `find()` call, it will [find all documents](/tutorials/mongoose/find-all).

```javascript
[require:mongoose-find-async nofind]
```
