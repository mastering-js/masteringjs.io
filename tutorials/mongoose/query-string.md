Mongoose's `Model.find()` function is an important method to understand.
You may call it without any arguments and it will return all the documents in that model.
You can pass in a `filter` which tells Mongoose what to look for in the database.
This `filter` may be an `objectId` or an `object`.
When using `Model.find()`, you should explicitly list the parameters you are searching for in the model.
This is important when pulling filter parameters from a query string.

```javascript
const testSchema = new mongoose.Schema({
  name: String,
  location: String
});

const obj = { name: 'Mastering JS', location: 'Florida' };

// In request handler
await Model.find({ firstName: req.query.firstName });
```

## `Model.find()` with an empty object

`Model.find()`'s default behavior is that it will return all documents in the model, so if none of the properties passed exist, you will instead get back all the documents.

```javascript
// Do **not** do this! `req.query` may be an empty object,
// in which case the query will return **every** document.
await Model.find(req.query);
```

## sanitizeFilter

Mongoose 6 introduces a new `sanitizeFilter` option that defends against [query selector injection attacks](https://thecodebarbarian.com/2014/09/04/defending-against-query-selector-injection-attacks.html).
It simply wraps the filter in a `$eq` tag, which prevents [query selector injection attacks](https://thecodebarbarian.com/2014/09/04/defending-against-query-selector-injection-attacks.html).

Using `sanitizeFilter` is especially important if you're using Express.
Express can parse objects from query strings by default, and Express query strings are the use case that inspired the [original blog post on query selector injections](https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html).

```javascript
// With `sanitizeFilter`, Mongoose converts the below query to
// `{ email, hashedPassword: { $eq: { $ne: null } } }`
const user = await User.find({ email: 'john@acme.com', hashedPassword: { $ne: null } }).setOptions({ sanitizeFilter: true });
```