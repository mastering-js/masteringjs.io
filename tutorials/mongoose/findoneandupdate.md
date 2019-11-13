[Mongoose's `findOneAndUpdate()` function](https://mongoosejs.com/docs/tutorials/findoneandupdate.html) finds the first document that matches a given `filter`, applies an `update`, and returns the document. Unlike `updateOne()`, `findOneAndUpdate()`
returns the updated document. Unlike `save()`,
`findOneAndUpdate()` is atomic: the document can't
change between when MongoDB finds the document and when MongoDB applies the update.

Getting Started
---------------

You need at least 2 parameters to call `findOneAndUpdate()`: `filter`
and `update`. MongoDB finds the first document that matches `filter`
and applies `update`. By default, `findOneAndUpdate()` returns the
document as it was **before** MongoDB applied `update`.

```javascript
[require:Mongoose findOneAndUpdate.*getting started$]
```

To return the document as it was **after** MongoDB applied the given
`update`, you need to set the `new` option to `true`:

```javascript
[require:Mongoose findOneAndUpdate.*new option$]
```

Upserts
-------

There are several other options for `findOneAndUpdate()`. For example,
you can set the [`upsert` option](/tutorials/mongoose/upsert) to insert a new document if there isn't one that matches `filter`.

```javascript
[require:Mongoose findOneAndUpdate.*upsert$]
```

Middleware
----------

Mongoose has dedicated [middleware](https://mongoosejs.com/docs/middleware.html) for `findOneAndUpdate()`. Calling `findOneAndUpdate()`
does **not** fire `findOne`, `updateOne`, or `save` middleware. But it
does fire `findOneAndUpdate` middleware.

```javascript
[require:Mongoose findOneAndUpdate.*middleware$]
```