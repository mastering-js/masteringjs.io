[Mongoose's `Array` class](https://mongoosejs.com/docs/schematypes.html#arrays) extends
vanilla JavaScript arrays with additional Mongoose functionality.
For example, suppose you have a blog post schema with an array of `tags`.

```javascript
const blogPostSchema = Schema({
  title: String,
  tags: [String]
});
```

When you create a new `BlogPost` document, the `tags` property is
an instance of the vanilla [JavaScript array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html) class. But it also has
some special properties.

```javascript
[require:Mongoose Array instanceof$]
```

For example, Mongoose intercepts `push()` calls on the `tags` array,
and is smart enough to update the document using `$push` when you `save()` the document.

```javascript
mongoose.set('debug', true);

doc.tags.push('web development');
// Because of 'debug' mode, will print:
// Mongoose: blogposts.updateOne({ _id: ObjectId(...) }, { '$push': { tags: { '$each': [ 'web development' ] } } }, { session: null })
await doc.save();
```

Document Arrays
--------------

The `tags` example is an array of primitives. Mongoose also supports
arrays of subdocuments. Here's how you can define an array of
`members`, each with a `firstName` and `lastName` property.

```javascript
const groupSchema = Schema({
  name: String,
  members: [{ firstName: String, lastName: String }]
});
```

`doc.members` is an instance of a vanilla JavaScript array, so it
has all the usual functions, like `slice()` and `filter()`. But
it also has some Mongoose-specific functionality baked in.

```javascript
[require:Mongoose Array doc array instanceof$]
```

For example, if you set the 0th member's `firstName`, Mongoose will translate that to a set 
on `member.0.firstName` when you call `save()`.

```javascript
[require:Mongoose Array doc array modify$]
```

Caveat With Setting Array Indexes
-------------------------

Mongoose has a [known issue with setting array indexes directly](https://mongoosejs.com/docs/faq.html#array-changes-not-saved). For example, if you set `doc.tags[0]`,
Mongoose change tracking won't pick up that change.

```javascript
[require:Mongoose Array direct index set$]
```

To work around this caveat, you need to inform Mongoose's change
tracking of the change, either using the [`markModified()` method](https://mongoosejs.com/docs/api/document.html#document_Document-markModified) or by explicitly calling [`MongooseArray#set()`](https://mongoosejs.com/docs/api/array.html#mongoosearray_MongooseArray-set) on the array element as shown below.

```javascript
[require:Mongoose Array direct index workaround$]
```