'use strict';

const assert = require('assert');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const opts = { useNewUrlParser: true };

describe('Mongoose', function() {
  before(() => mongoose.connect('mongodb://localhost:27017/test', opts));

  beforeEach(() => mongoose.connection.dropDatabase());
  beforeEach(() => mongoose.deleteModel(/.*/));

  after(() => mongoose.disconnect());

  it('duplicate key errors', async function() {
    const CharacterModel = mongoose.model('Character',
      new Schema({ name: String }));

    const doc = await CharacterModel.create({ name: 'Jon Snow' });

    doc._id; // Something like "5cc5e9be172acd237a893610"
    // acquit:ignore:start
    assert.ok(doc._id);
    let _error;
    // acquit:ignore:end

    try {
      // Try to create a document with the same `_id`. This will always fail
      // because MongoDB collections always have a unique index on `_id`.
      await CharacterModel.create(Object.assign({}, doc.toObject()));
    } catch (error) {
      // MongoError: E11000 duplicate key error collection: test.characters
      // index: _id_ dup key: { : ObjectId('5cc5ea092dca872442916cf5') }
      error.message;
      // acquit:ignore:start
      _error = error;
      // acquit:ignore:end
    }
    // acquit:ignore:start
    assert.ok(_error);
    assert.ok(_error.message.includes('E11000'));
    // acquit:ignore:end
  });

  it('E11000 with undefined keys', async function() {
    const UserModel = mongoose.model('User', new Schema({
      name: String,
      email: {
        type: String,
        unique: true
      }
    }));

    // Wait for the index to build. The index name will be `email_1`
    await UserModel.init();

    // Create a document with no `email` set
    await UserModel.create({ name: 'user 1' });
    // acquit:ignore:start
    let _error;
    // acquit:ignore:end

    try {
      await UserModel.create({ name: 'user 2' });
    } catch (error) {
      // E11000 duplicate key error collection: test.users index: email_1
      // dup key: { : null }
      error.message;
      // acquit:ignore:start
      _error = error;
      // acquit:ignore:end
    }
    // acquit:ignore:start
    assert.ok(_error);
    assert.ok(_error.message.includes('E11000'), _error.message);
    // acquit:ignore:end
  });

  it('E11000 plugin', async function() {
    const schema = new Schema({ name: String });
    schema.plugin(require('mongoose-beautiful-unique-validation'));

    const CharacterModel = mongoose.model('Character', schema);

    const doc = await CharacterModel.create({ name: 'Jon Snow' });
    // acquit:ignore:start
    let _error;
    // acquit:ignore:end

    try {
      // Try to create a document with the same `_id`. This will always fail
      // because MongoDB collections always have a unique index on `_id`.
      await CharacterModel.create(Object.assign({}, doc.toObject()));
    } catch (error) {
      // Path `_id` (5cc60c5603a95a15cfb9204d) is not unique.
      error.errors['_id'].message;
      // acquit:ignore:start
      _error = error;
      // acquit:ignore:end
    }
    // acquit:ignore:start
    assert.ok(_error);
    assert.ok(_error.errors['_id'].message.includes('is not unique'), _error.message);
    // acquit:ignore:end
  });

  describe('update', function() {
    let CharacterModel;

    beforeEach(async function() {
      mongoose.deleteModel(/^Character$/);
      const schema = new mongoose.Schema({ name: String, title: String });
      CharacterModel = mongoose.model('Character', schema);

      await CharacterModel.deleteMany({});
      await CharacterModel.create({
        name: 'Jon Snow',
        title: `Lord Commander of the Night's Watch`
      });
    });

    it('using save', async function() {
      // acquit:ignore:start
      mongoose.deleteModel(/^Character$/);
      // acquit:ignore:end
      const schema = new mongoose.Schema({ name: String, title: String });
      const CharacterModel = mongoose.model('Character', schema);

      const doc = await CharacterModel.create({
        name: 'Jon Snow',
        title: `Lord Commander of the Night's Watch`
      });

      // Update the document by setting a property and calling `save()`
      doc.title = 'King in the North';
      await doc.save();
    });

    it('using model `updateOne()`', async function() {
      // Update the document using `updateOne()`
      await CharacterModel.updateOne({ name: 'Jon Snow' }, {
        title: 'King in the North'
      });

      // Load the document to see the updated value
      const doc = await CharacterModel.findOne();
      doc.title; // "King in the North"
      // acquit:ignore:start
      assert.equal(doc.title, 'King in the North');
      // acquit:ignore:end
    });

    it('using document `updateOne()`', async function() {
      // Load the document
      const doc = await CharacterModel.findOne({ name: 'Jon Snow' });

      // Update the document using `Document#updateOne()`
      // Equivalent to `CharacterModel.updateOne({ _id: doc._id }, update)`
      const update = { title: 'King in the North' };
      await doc.updateOne(update);

      const updatedDoc = await CharacterModel.findOne({ name: 'Jon Snow' });
      updatedDoc.title; // "King in the North"
      // acquit:ignore:start
      assert.equal(updatedDoc.title, 'King in the North');
      // acquit:ignore:end
    });

    it('using findOneAndUpdate', async function() {
      const doc = await CharacterModel.findOneAndUpdate(
        { name: 'Jon Snow' },
        { title: 'King in the North' },
        // If `new` isn't true, `findOneAndUpdate()` will return the
        // document as it was _before_ it was updated.
        { new: true }
      );

      doc.title; // "King in the North"
      // acquit:ignore:start
      assert.equal(doc.title, 'King in the North');
      // acquit:ignore:end
    });
  });

  describe('virtuals', function() {
    let BlogPost;
    let doc;

    before(function() {
      // Markdown parser
      const marked = require('marked');

      const blogPostSchema = new Schema({ content: String });

      // A _virtual_ is a schema property that is **not** stored in MongoDB.
      // It is instead calculated from other properties in the document.
      blogPostSchema.virtual('html').get(function() {
        // In the getter function, `this` is the document. Don't use arrow
        // functions for virtual getters!
        return marked(this.content);
      });
      BlogPost = mongoose.model('BlogPost', blogPostSchema);

      doc = new BlogPost({ content: '# Hello' });
    });

    it('basic example', async function() {
      // Markdown parser
      const marked = require('marked');

      const blogPostSchema = new Schema({ content: String });

      // A _virtual_ is a schema property that is **not** stored in MongoDB.
      // It is instead calculated from other properties in the document.
      blogPostSchema.virtual('html').get(function() {
        // In the getter function, `this` is the document. Don't use arrow
        // functions for virtual getters!
        return marked(this.content);
      });
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);

      const doc = new BlogPost({ content: '# Hello' });
      doc.html; // "<h1 id="hello">Hello</h1>"
      // acquit:ignore:start
      assert.equal(doc.html, '<h1 id="hello">Hello</h1>\n');
      // acquit:ignore:end
    });

    it('with express', async function() {
      const app = require('express')();
      const axios = require('axios');

      // Make Mongoose attach virtuals whenever calling `JSON.stringify()`,
      // including using `res.json()`
      mongoose.set('toJSON', { virtuals: true });

      app.get('*', function(req, res) {
        // Mongoose will automatically attach the `html` virtual
        res.json(doc);
      });

      const server = await app.listen(3000);

      // "<h1 id="hello">Hello</h1>"
      await axios.get('http://localhost:3000').then(res => res.data.html);
      // acquit:ignore:start
      const res = await axios.get('http://localhost:3000');
      assert.equal(res.data.html, '<h1 id="hello">Hello</h1>\n');
      server.close();
      // acquit:ignore:end
    });

    it('queries', async function() {
      await doc.save();

      // `count` will be 0, because the `html` property is a virtual, and
      // thus not stored in MongoDB.
      const count = await BlogPost.countDocuments({ html: { $exists: true } });
      // acquit:ignore:start
      assert.strictEqual(count, 0);
      // acquit:ignore:end
    });
  });

  describe('find all', function() {
    it('basic', async function() {
      const User = mongoose.model('User', Schema({
        name: String,
        email: String
      }));
      // acquit:ignore:start
      await User.deleteMany({});
      await User.create({ name: 'Test', email: 'test@gmail.com' });
      // acquit:ignore:end

      // Empty `filter` means "match all documents"
      const filter = {};
      const all = await User.find(filter);
      // acquit:ignore:start
      assert.equal(all.length, 1);
      assert.equal(all[0].name, 'Test');
      // acquit:ignore:end
    });

    it('cursor', async function() {
      const User = mongoose.model('User', Schema({
        name: String,
        email: String
      }));
      // acquit:ignore:start
      await User.deleteMany({});
      await User.create({ name: 'Test', email: 'test@gmail.com' });
      let docs = [];
      // acquit:ignore:end

      // Note no `await` here
      const cursor = User.find().cursor();

      for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        // Use `doc`
        // acquit:ignore:start
        docs.push(doc);
        // acquit:ignore:end
      }
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      assert.equal(docs[0].name, 'Test');
      // acquit:ignore:end
    });
  });

  describe('Query', function() {
    let Character;

    before(async function() {
      Character = mongoose.model('Character', Schema({
        name: String,
        age: Number
      }));
    });

    beforeEach(async function() {
      await Character.deleteMany({});
      await Character.create({ name: 'Jean-Luc Picard', age: 59 });
    });

    it('query class', async function() {
      const Character = mongoose.model('Character', Schema({
        name: String,
        age: Number
      }));

      const query = Character.find();
      query instanceof mongoose.Query; // true
      // acquit:ignore:start
      assert.ok(query instanceof mongoose.Query);
      // acquit:ignore:end

      // Execute the query
      const docs = await query;
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      // acquit:ignore:end
    });

    it('chaining', async function() {
      let docs = await Character.find().
        // `where()` specifies the name of the property
        where('name').
        // and then the query helper `in()` specifies that `name`
        // must be one of the 2 values in the array
        in(['Jean-Luc Picard', 'Will Riker']);
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      // acquit:ignore:end

      // Equivalent query, but with the filter expressed as an object rather
      // than using chaining
      docs = await Character.find({
        name: { $in: ['Jean-Luc Picard', 'Will Riker'] }
      });
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      // acquit:ignore:end
    });

    it('getFilter', async function() {
      const query = Character.find().
        where('name').in(['Jean-Luc Picard', 'Will Riker']);
      // `{ name: { $in: ['Jean-Luc Picard', 'Will Riker'] } }`
      query.getFilter(); 
      // acquit:ignore:start
      assert.deepEqual(query.getFilter(), {
        name: { $in: ['Jean-Luc Picard', 'Will Riker'] }
      });
      // acquit:ignore:end
    });

    it('multiple', async function() {
      const docs = await Character.find().
        // `name` must match the regular expression
        where('name').regex(/picard/i).
        // `age` must be between 29 and 59
        where('age').gte(29).lte(59);
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      // acquit:ignore:end
    });

    it('exec()', async function() {
      const promise = Character.find().exec();
      promise instanceof Promise; // true
      promise instanceof mongoose.Query; // false
      // acquit:ignore:start
      assert.ok(promise instanceof Promise);
      assert.ok(!(promise instanceof mongoose.Query));
      // acquit:ignore:end

      const docs = await promise;
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      // acquit:ignore:end
    });

    it('then()', async function() {
      return Character.find().then(docs => {
        docs; // List of docs
        // acquit:ignore:start
        assert.equal(docs.length, 1);
        // acquit:ignore:end
      });
    });
  });

  describe('upsert', function() {
    let Character;

    before(async function() {
      Character = mongoose.model('Upsert', new Schema({
        name: String,
        age: Number
      }));

      await Character.deleteMany({});
    });

    it('updateOne', async function() {
      const res = await Character.updateOne(
        { name: 'Jean-Luc Picard' },
        { $set: { age: 59 } },
        { upsert: true } // Make this update into an upsert
      );

      // Will be 1 if MongoDB modified an existing document, or 0
      // if MongoDB inserted a new document.
      res.nModified;
      // Contains an array of descriptions of the documents inserted,
      // including the `_id` of all inserted docs.
      res.upserted;
      // acquit:ignore:start
      assert.equal(res.nModified, 0);
      assert.equal(res.upserted.length, 1);
      // acquit:ignore:end
    });

    it('findOneAndUpdate', async function() {
      const doc = await Character.findOneAndUpdate(
        { name: 'Jean-Luc Picard' },
        { $set: { age: 59 } },
        { upsert: true, new: true }
      );

      doc.name; // 'Jean-Luc Picard'
      doc.age; // 59
      // acquit:ignore:start
      assert.equal(doc.name, 'Jean-Luc Picard');
      assert.equal(doc.age, 59);
      // acquit:ignore:end
    });

    it('bulkWrite', async function() {
      const res = await Character.bulkWrite([
        {
          updateOne: {
            filter: { name: 'Will Riker' },
            update: { age: 29 },
            upsert: true
          }
        },
        {
          updateOne: {
            filter: { name: 'Geordi La Forge' },
            update: { age: 29 },
            upsert: true
          }
        }
      ]);

      // Contains the number of documents that were inserted because
      // of an upsert
      res.upsertedCount;
      // Contains the number of existing documents that were updated.
      res.modifiedCount;
      // acquit:ignore:start
      assert.equal(res.upsertedCount, 2);
      assert.equal(res.modifiedCount, 0);
      // acquit:ignore:end
    });
  });
});