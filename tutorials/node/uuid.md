As of Node v14.17, [Node's built-in `crypto` module has a `randomUUID()` function](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) that you can use to generate a new v4 UUID.
`crypto.randomUUID()` returns the UUID as a string.

```javascript
const crypto = require('crypto');

crypto.randomUUID(); // '8fb2a405-503e-4344-8543-6e8d93f4c9ee'
typeof crypto.randomUUID(); // 'string'
```

Other UUID Versions
------------------

Node.js' built-in UUID functionality only supports UUID v4.
For other UUID versions, or older versions of Node that don't support UUIDs, you should use the [uuid npm module](https://www.npmjs.com/package/uuid).

```javascript
const uuid = require('uuid');

// '2ebcdfa0-cd6e-11ed-9477-575477630084'
uuid.v1();

// '546b33ef-f0d6-5810-8089-573a2a506dd5'
uuid.v5('test', '2ebcdfa0-cd6e-11ed-9477-575477630084');
```

UUID Alternatives
-----------------

UUIDs are just one alternative for quickly generating probably unique ids.
Other alternatives include [MongoDB ObjectIds](/tutorials/mongoose/objectid) and [nanoid](https://www.npmjs.com/package/nanoid).
MongoDB ObjectIds are shorter and generally work better with MongoDB, and nanoids are even shorter.

```javascript
const mongoose = require('mongoose');

new mongoose.Types.ObjectId(); // '6422ef942841d91d8c6ca631'
```

```javascript
const nanoid = require('nanoid');
```

With [Mongoose](https://mongoosejs.com/)
-------------

[Mongoose has basic support for UUIDs](https://mongoosejs.com/docs/schematypes.html#uuid), including UUID as a schema type.
The key detail to note is that, while Mongoose converts UUIDs to strings in Node.js, Mongoose stores UUIDs using MongoDB's native UUID type.

```javascript
const authorSchema = new Schema({
  _id: Schema.Types.UUID, // Can also do `_id: 'UUID'`
  name: String
});

const Author = mongoose.model('Author', authorSchema);

const author = new Author({ name: 'J.R.R. Tolkien' });
console.log(typeof author._id); // 'string'

await author.save();

const doc = await Author.collection.findOne({ _id: author._id });
doc._id; // 'new UUID("09190f70-3d30-11e5-8814-0f4df9a59c41")'
doc._id.constructor.name; // 'UUID'
```