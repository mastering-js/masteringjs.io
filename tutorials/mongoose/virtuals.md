[Mongoose virtuals](https://mongoosejs.com/docs/guide.html#virtuals) are computed properties on [Mongoose documents](https://mongoosejs.com/docs/documents.html). They are not stored in MongoDB: a virtual property is computed whenever you access it.

Suppose you have a `BlogPost` model that stores the raw [markdown](https://www.markdownguide.org/) content of a blog post. You can create a virtual `html` that automatically calls a [markdown parser](http://npmjs.com/package/marked) for you whenever you access the `html` property.

```javascript
[require:Mongoose.*virtuals.*basic]
```

Why would you use a virtual instead of a [method](https://mongoosejs.com/docs/guide.html#methods)? Because you can configure Mongoose to include virtuals when [converting a Mongoose document to JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), including when using [Express' `res.json()` function](http://expressjs.com/en/4x/api.html#res.json).

```javascript
[require:Mongoose.*virtuals.*express]
```

The downside of virtuals is that, since they aren't stored in MongoDB, you can't use them in [queries](https://mongoosejs.com/docs/queries.html).