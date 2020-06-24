[Mongoose](https://mongoosejs.com/) has 4 different ways to update a document. Here's a list:

* [`Document#save()`](https://mongoosejs.com/docs/api.html#document_Document-save)
* [`Model.updateOne()`](https://mongoosejs.com/docs/api.html#model_Model.updateOne) and [`updateMany()`](https://mongoosejs.com/docs/api.html#model_Model.updateMany)
* [`Document#updateOne()`](https://mongoosejs.com/docs/api.html#document_Document-updateOne)
* [`Model.findOneAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)

What's the difference between these 4 ways? Let's take a look at what each of these functions do.

Using `save()`
--------------

Below is an example of using `save()` to update Jon Snow's title.

```javascript
[require:Mongoose.*update.*using save]
```

This simple example has a couple nuances. First, `save()` is a method on a document, which means you must have a document to save. You need to either `create()` or use [`find()`](http://thecodebarbarian.com/how-find-works-in-mongoose.html) to get a document.

Second, Mongoose documents have change tracking. Under the hood, when you call `doc.save()`, Mongoose knows you set `title` and transforms your `save()` call into `updateOne({ $set: { title } })`. Try running [Mongoose with debug mode](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set) to see what queries Mongoose executes.

Using `Model.updateOne()` and `Model.updateMany()`
--------------------------------------------------

Using `Model.updateOne()` and `Model.updateMany()`, you can update the document without loading it from the database first. In the below example, the document with `name = 'Jon Snow'` is not in the Node.js process' memory when `updateOne()` is called.

```javascript
[require:Mongoose.*update.*model.*updateOne]
```

`updateMany()` is similar. The difference between these two functions is that `updateOne()` will update **at most one** document, whereas `updateMany()` will update every document that matches the filter.

You should use `save()` rather than `updateOne()` and `updateMany()` where possible. However, `Model.updateOne()` and `Model.updateMany()` have a few advantages:

* `updateOne()` is [atomic](https://docs.mongodb.com/manual/core/write-operations-atomicity/#atomicity). If you load a document using `find()`, it may change before you `save()` it.
* `updateOne()` doesn't require you to load the document into memory, which may give you better performance if your documents are huge.

Using `Document#updateOne()`
----------------------------

The `Document#updateOne()` function is syntactic sugar for `Model.updateOne()`. If you already have the document in memory, `doc.updateOne()` structures a `Model.updateOne()` call for you.

```javascript
[require:Mongoose.*update.*document.*updateOne]
```

Generally, `Document#updateOne()` is rarely useful. You're better off using `save()` and using `Model.updateOne()` for cases when `save()` is not flexible enough.

Using `Model.findOneAndUpdate()`
--------------------------------

The [`Model.findOneAndUpdate()` function](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate) or its variation [`Model.findByIdAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate) behave similarly to `updateOne()`: they atomically update the first document that matches the first parameter `filter`. Unlike `updateOne()`, it gives you back the updated document.

```javascript
[require:Mongoose.*update.*findOneAndUpdate]
```

Summary
-------

In general, you should use `save()` to update a document in Mongoose, unless you
need an atomic update. Here's a summary of the key features of all 4 ways to update a document:

<img src="/assets/mongoose_update.png">

