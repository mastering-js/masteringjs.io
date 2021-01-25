The Mongoose `find(filter,callback)` function allows you to query for documents with the given key(s)/value(s) and it will return an array of documents that match the given filter. You can use this function with asynchronous calls as follows:

```javascript
[require:mongoose-find-async find]
```

If you omit the filter parameter in the `find()` call, it will just return all documents in the form of an array.

```javascript
[require:mongoose-find-async nofind]
```
