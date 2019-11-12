In Mongoose, [populate](https://mongoosejs.com/docs/populate.html) lets you pull
in referenced documents from another collection. Populate is similar to a
[left outer join in SQL](https://www.dofactory.com/sql/left-outer-join), but
the difference is that populate happens in your Node.js application rather than
on the database server. Mongoose executes a separate query under the hood to load
the referenced documents.

Basic Populate
--------------

Suppose you have two [Mongoose models](https://mongoosejs.com/docs/models.html):
`Movie` and `Person`. Movie documents have a `director` and an array of `actors`.

```javascript
const Person = mongoose.model('Person', mongoose.Schema({
  name: String
}));

// `ref` tells Mongoose populate what model to query
const Movie = mongoose.model('Movie', mongoose.Schema({
  title: String,
  director: {
    type: mongoose.ObjectId,
    ref: 'Person'
  },
  actors: [{
    type: mongoose.ObjectId,
    ref: 'Person'
  }]
}));
```

Mongoose queries have a [`populate()` function](https://mongoosejs.com/docs/api/query.html#query_Query-populate) that lets you load a movie and its corresponding
`director` and `actors` in one line:

```javascript
[require:Mongoose Populate.*basic with query$]
```

Populate On Existing Documents
------------------------------

[Mongoose documents also have a `populate()` function](https://mongoosejs.com/docs/api/document.html#document_Document-populate). Given an existing `movie` document, you
can `populate()` any number of paths. Just remember to call [`Document#execPopulate()`](https://mongoosejs.com/docs/api/document.html#document_Document-execPopulate) to actually execute the `populate()` call.

```javascript
[require:Mongoose Populate.*basic with document$]
```

Edge Cases
----------

If you're populating a single document and the referenced document doesn't exist,
Mongoose will set the populated property to `null`.

```javascript
[require:Mongoose Populate.*missing docs$]
```

If you're populating an array and one of the referenced documents doesn't exist,
Mongoose will filter that value out of the array by default, returning a shorter
array. You can override this with the `retainNullValues` option.

```javascript
[require:Mongoose Populate.*missing array$]
```