'use strict';

const { doesNotMatch } = require('assert');
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

      const server = app.listen(3000);

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

  describe('Aggregate', function() {
    let Character;
  
    beforeEach(async function() {
      Character = mongoose.model('Character', mongoose.Schema({
        name: String,
        age: Number,
        rank: String
      }));
  
      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);
    });

    it('basic match', async function() {
      // acquit:ignore:start
      await Character.deleteMany({});
      // acquit:ignore:end
      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);

      const filter = { age: { $gte: 30 } };
      let docs = await Character.aggregate([
        { $match: filter }
      ]);

      docs.length; // 1
      docs[0].name; // 'Jean-Luc Picard'
      docs[0].age // 59
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      assert.equal(docs[0].name, 'Jean-Luc Picard');
      // acquit:ignore:end

      // `$match` is similar to `find()`
      docs = await Character.find(filter);
      docs.length; // 1
      docs[0].name; // 'Jean-Luc Picard'
      docs[0].age // 59
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      assert.equal(docs[0].name, 'Jean-Luc Picard');
      // acquit:ignore:end
    });

    it('group', async function() {
      let docs = await Character.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$age',
            count: { $sum: 1 }
          }
        }
      ]);

      docs.length; // 4
      docs.sort((d1, d2) => d1._id - d2._id);
      docs[0]; // { _id: 24, count: 1 }
      docs[1]; // { _id: 28, count: 1 }
      docs[2]; // { _id: 29, count: 2 }
      docs[3]; // { _id: 59, count: 1 }
      // acquit:ignore:start
      assert.deepEqual(docs, [
        { _id: 24, count: 1 },
        { _id: 28, count: 1 },
        { _id: 29, count: 2 },
        { _id: 59, count: 1 }
      ]);
      // acquit:ignore:end
    });

    it('combined', async function() {
      let docs = await Character.aggregate([
        { $match: { age: { $lt: 30 } } },
        {
          $group: {
            _id: '$age',
            count: { $sum: 1 }
          }
        }
      ]);

      docs.length; // 3
      docs.sort((d1, d2) => d1._id - d2._id);
      docs[0]; // { _id: 24, count: 1 }
      docs[1]; // { _id: 28, count: 1 }
      docs[2]; // { _id: 29, count: 2 }
      // acquit:ignore:start
      assert.deepEqual(docs, [
        { _id: 24, count: 1 },
        { _id: 28, count: 1 },
        { _id: 29, count: 2 }
      ]);
      // acquit:ignore:end
    });

    it('chaining', async function() {
      let docs = await Character.aggregate().
        match({ age: { $lt: 30 } }).
        group({ _id: '$age', count: { $sum: 1 } });

      docs.length; // 3
      docs.sort((d1, d2) => d1._id - d2._id);
      docs[0]; // { _id: 24, count: 1 }
      docs[1]; // { _id: 28, count: 1 }
      docs[2]; // { _id: 29, count: 2 }
      // acquit:ignore:start
      assert.deepEqual(docs, [
        { _id: 24, count: 1 },
        { _id: 28, count: 1 },
        { _id: 29, count: 2 }
      ]);
      // acquit:ignore:end
    });

    it('middleware', async function() {
      // acquit:ignore:start
      mongoose.deleteModel(/Character/);
      // acquit:ignore:end
      const characterSchema = Schema({ name: String, age: Number });
      characterSchema.pre('aggregate', function() {
        // Add a `$match` to the beginning of the pipeline
        this.pipeline().unshift({ $match: { age: { $lt: 30 } } });
      });
      const Character = mongoose.model('Character', characterSchema);

      // The `pre('aggregate')` adds a `$match` to the pipeline.
      let docs = await Character.aggregate().
        group({ _id: '$age', count: { $sum: 1 } });

      docs.length; // 3
      docs.sort((d1, d2) => d1._id - d2._id);
      docs[0]; // { _id: 24, count: 1 }
      docs[1]; // { _id: 28, count: 1 }
      docs[2]; // { _id: 29, count: 2 }
      // acquit:ignore:start
      assert.deepEqual(docs, [
        { _id: 24, count: 1 },
        { _id: 28, count: 1 },
        { _id: 29, count: 2 }
      ]);
      // acquit:ignore:end
    });
  });

  describe('SchemaType', function() {
    it('basic example', function() {
      const schema = Schema({ name: String, age: Number });

      schema.path('name') instanceof mongoose.SchemaType; // true
      schema.path('age') instanceof mongoose.SchemaType; // true
      // acquit:ignore:start
      assert.ok(schema.path('name') instanceof mongoose.SchemaType);
      assert.ok(schema.path('age') instanceof mongoose.SchemaType);
      // acquit:ignore:end
    });

    it('with inheritance', function() {
      const schema = Schema({ name: String, age: Number });

      schema.path('name') instanceof mongoose.SchemaType; // true
      schema.path('name') instanceof mongoose.Schema.Types.String; // true

      schema.path('age') instanceof mongoose.SchemaType; // true
      schema.path('age') instanceof mongoose.Schema.Types.Number; // true
      // acquit:ignore:start
      assert.ok(schema.path('name') instanceof mongoose.SchemaType);
      assert.ok(schema.path('name') instanceof mongoose.Schema.Types.String);
      assert.ok(schema.path('age') instanceof mongoose.SchemaType);
      // acquit:ignore:end
    });
  });
  
  describe('Array', function() {
    it('instanceof', async function() {
      const blogPostSchema = Schema({
        title: String,
        tags: [String]
      }, { versionKey: false });
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);

      const doc = new BlogPost({
        title: 'Intro to JavaScript',
        tags: ['programming']
      });

      Array.isArray(doc.tags); // true
      doc.tags.isMongooseArray; // true
      // acquit:ignore:start
      assert.ok(Array.isArray(doc.tags));
      assert.ok(doc.tags.isMongooseArray);
      // acquit:ignore:end
    });

    it('doc array instanceof', async function() {
      const groupSchema = Schema({
        name: String,
        members: [{ firstName: String, lastName: String }]
      });
      const Group = mongoose.model('Group', groupSchema);

      const doc = new Group({
        title: 'Jedi Order',
        members: [{ firstName: 'Luke', lastName: 'Skywalker' }]
      });

      Array.isArray(doc.members); // true
      doc.members.isMongooseArray; // true
      doc.members.isMongooseDocumentArray; // true
      // acquit:ignore:start
      assert.ok(Array.isArray(doc.members));
      assert.ok(doc.members.isMongooseArray);
      assert.ok(doc.members.isMongooseDocumentArray);
      // acquit:ignore:end
    });

    it('doc array modify', async function() {
      const groupSchema = Schema({
        name: String,
        members: [{ firstName: String, lastName: String }]
      }, { versionKey: false });
      const Group = mongoose.model('Group', groupSchema);

      const doc = new Group({
        title: 'Jedi Order',
        members: [{ firstName: 'Luke', lastName: 'Skywalker' }]
      });
      await doc.save();

      mongoose.set('debug', true);
      
      doc.members[0].firstName = 'Anakin';
      // Prints:
      // Mongoose: groups.updateOne({ _id: ObjectId("...") },
      // { '$set': { 'members.0.firstName': 'Anakin' } }, { session: null })
      await doc.save();
      // acquit:ignore:start
      mongoose.set('debug', false);
      // acquit:ignore:end
    });

    it('direct index set', async function() {
      const blogPostSchema = Schema({
        title: String,
        tags: [String]
      }, { versionKey: false });
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);

      const doc = new BlogPost({
        title: 'Intro to JavaScript',
        tags: ['programming']
      });
      await doc.save();

      // This change won't end up in the database!
      doc.tags[0] = 'JavaScript';
      await doc.save();

      const fromDb = await BlogPost.findOne({ _id: doc._id });
      fromDb.tags; // ['programming']
      // acquit:ignore:start
      assert.deepEqual(fromDb.tags, ['programming']);
      // acquit:ignore:end
    });

    it('direct index workaround', async function() {
      // acquit:ignore:start
      const blogPostSchema = Schema({
        title: String,
        tags: [String]
      }, { versionKey: false });
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);

      const doc = new BlogPost({
        title: 'Intro to JavaScript',
        tags: ['programming']
      });
      await doc.save();
      // acquit:ignore:end
      // This change works. `set()` is a special method on Mongoose
      // arrays that triggers change tracking.
      doc.tags.set(0, 'JavaScript');
      await doc.save();

      const fromDb = await BlogPost.findOne({ _id: doc._id });
      fromDb.tags; // ['JavaScript']
      // acquit:ignore:start
      assert.deepEqual(fromDb.tags, ['JavaScript']);
      // acquit:ignore:end
    });
  });

  describe('Model.find()', function() {
    let Character;

    beforeEach(async function() {
      Character = mongoose.model('Character', mongoose.Schema({
        name: String,
        age: Number,
        rank: String
      }));

      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);
    });

    it('setup', async function() {
      // acquit:ignore:start
      mongoose.deleteModel('Character');
      // acquit:ignore:end
      const Character = mongoose.model('Character', mongoose.Schema({
        name: String,
        age: Number,
        rank: String
      }));

      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);
    });

    it('basic', async function() {
      // acquit:ignore:start
      Character = mongoose.model('Character');
      // acquit:ignore:end
      const docs = await Character.find({ rank: 'Lieutenant' });

      // MongoDB may return the docs in any order unless you explicitly sort
      docs.map(doc => doc.name).sort(); // ['Geordi La Forge', 'Worf']
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Geordi La Forge', 'Worf']);
      // acquit:ignore:end
    });

    it('number', async function() {
      const docs = await Character.find({ age: 29 });

      docs.map(doc => doc.name).sort(); // ['Geordi La Forge', 'William Riker']
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Geordi La Forge', 'William Riker']);
      // acquit:ignore:end
    });

    it('$eq query operator', async function() {
      // acquit:ignore:start
      Character = mongoose.model('Character');
      // acquit:ignore:end
      // Equivalent to `{ rank: 'Lieutenant' }`. `$eq` is an example of
      // a "query operator"
      const docs = await Character.find({ rank: { $eq: 'Lieutenant' } });

      docs.map(doc => doc.name).sort(); // ['Geordi La Forge', 'Worf']
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Geordi La Forge', 'Worf']);
      // acquit:ignore:end
    });

    it('$lt', async function() {
      const docs = await Character.find({ age: { $lt: 29 } });

      docs.map(doc => doc.name).sort(); // ['Deanna Troi', 'Worf']
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Deanna Troi', 'Worf']);
      // acquit:ignore:end
    });

    it('$gte', async function() {
      const docs = await Character.find({ age: { $gte: 29 } });

      // ['Geordi La Forge', 'Jean-Luc Picard', 'William Riker']
      docs.map(doc => doc.name).sort();
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Geordi La Forge', 'Jean-Luc Picard', 'William Riker']);
      // acquit:ignore:end
    });

    it('$lte string', async function() {
      const docs = await Character.find({ name: { $lte: 'Geordi La Forge' } });

      // ['Deanna Troi', 'Geordi La Forge']
      docs.map(doc => doc.name).sort();
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Deanna Troi', 'Geordi La Forge']);
      // acquit:ignore:end
    });

    it('regexp', async function() {
      const docs = await Character.find({ rank: /Commander/ });

      // ['Deanna Troi', 'William Riker']
      docs.map(doc => doc.name).sort();
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Deanna Troi', 'William Riker']);
      // acquit:ignore:end
    });

    it('$regex query operator', async function() {
      const docs = await Character.find({ rank: { $regex: 'Commander' } });

      // ['Deanna Troi', 'William Riker']
      docs.map(doc => doc.name).sort();
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Deanna Troi', 'William Riker']);
      // acquit:ignore:end
    });

    it('multiple filters', async function() {
      const docs = await Character.find({
        age: { $gte: 29 },
        rank: 'Commander'
      });

      // ['William Riker']
      docs.map(doc => doc.name);
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name),
        ['William Riker']);
      // acquit:ignore:end
    });

    it('$or query operator', async function() {
      const docs = await Character.find({
        $or: [
          { age: { $gte: 29 } },
          { rank: 'Commander' }
        ]
      });

      // ['Geordi La Forge', 'Jean-Luc Picard', 'William Riker']
      docs.map(doc => doc.name).sort();
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['Geordi La Forge', 'Jean-Luc Picard', 'William Riker']);
      // acquit:ignore:end
    });

    it('$and query operator', async function() {
      const docs = await Character.find({
        $and: [
          {
            $or: [
              { age: { $gte: 29 } },
              { rank: 'Commander' }
            ]
          },
          {
            $or: [
              { name: { $lte: 'D' } },
              { name: { $gte: 'W' } }
            ]
          }
        ]
      });

      // ['William Riker']
      docs.map(doc => doc.name).sort();
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.name).sort(),
        ['William Riker']);
      // acquit:ignore:end
    });
  });

  describe('findById', function() {
    it('basic', async function() {
      const schema = new mongoose.Schema({ _id: Number }, { versionKey: false });
      const Model = mongoose.model('MyModel', schema);

      await Model.create({ _id: 1 });

      // `{ _id: 1 }`
      await Model.findById(1);
      
      // `null` because no document was found
      await Model.findById(2);
      // acquit:ignore:start
      const doc = await Model.findById(1);
      assert.deepEqual(doc.toObject(), { _id: 1 });
      assert.strictEqual(await Model.findById(2), null);
      // acquit:ignore:end
    });

    it('findOne', async function() {
      // acquit:ignore:start
      let count = 0;
      // acquit:ignore:end
      const schema = new mongoose.Schema({ _id: Number }, { versionKey: false });
      schema.pre('findOne', function() {
        console.log('Called `findOne()`');
        // acquit:ignore:start
        ++count;
        // acquit:ignore:end
      });
      const Model = mongoose.model('MyModel', schema);
      await Model.create({ _id: 1 });

      // Prints "Called `findOne()`" because `findById()` calls `findOne()`
      await Model.findById(1);
      // acquit:ignore:start
      assert.equal(count, 1);
      // acquit:ignore:end
    });

    it('ObjectId', async function() {
      const _id = '5d273f9ed58f5e7093b549b0';
      const schema = new mongoose.Schema({ _id: mongoose.ObjectId }, { versionKey: false });
      const Model = mongoose.model('MyModel', schema);

      await Model.create({ _id: new mongoose.Types.ObjectId(_id) });

      typeof _id; // 'string'
      // `{ _id: '5d273f9ed58f5e7093b549b0' }`
      const doc = await Model.findById(_id);

      typeof doc._id; // 'object'
      doc._id instanceof mongoose.Types.ObjectId; // true
      // acquit:ignore:start
      assert.ok(doc);
      assert.equal(typeof doc._id, 'object');
      assert.ok(doc._id instanceof mongoose.Types.ObjectId);
      assert.equal(doc._id.toHexString(), _id);
      // acquit:ignore:end
    });
  });

  describe('connect()', function() {
    it('basic', async function() {
      // acquit:ignore:start
      await mongoose.disconnect();
      // acquit:ignore:end
      // Connect to a MongoDB server running on 'localhost:27017' and use the
      // 'test' database.
      await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true // Boilerplate for Mongoose 5.x
      });

      // Once you're connected to MongoDB, you can create a user model and
      // use it to save a user to the database.
      const userSchema = new mongoose.Schema({ name: String });
      const UserModel = mongoose.model('User', userSchema);

      await UserModel.create({ name: 'test' });

    });

    it('error', async function() {
      // acquit:ignore:start
      await mongoose.disconnect();
      // acquit:ignore:end
      const options = { useNewUrlParser: true };
      // Try to connect to `nota.domain`, which should fail
      const err = await mongoose.connect('mongodb://nota.domain:27017/test', options).
        catch(err => err);
      // 'failed to connect to server [nota.domain:27017] on first connect'
      err.message;
      // acquit:ignore:start
      assert.ok(err.message.indexOf('failed to connect to server [nota.domain:27017] on first connect') === 0, err.message);
      // acquit:ignore:end
    });
  });

  describe('Schema', function() {
    it('definition', function() {
      const userSchema = new mongoose.Schema({
        name: String,
        age: Number
      });

      userSchema.path('name'); // SchemaString { ... }
      userSchema.path('age'); // SchemaNumber { ... }
      // acquit:ignore:start
      assert.ok(userSchema.path('name').constructor.name, 'SchemaString');
      assert.ok(userSchema.path('name').constructor.name, 'SchemaNumber');
      // acquit:ignore:end
    });

    it('model', function() {
      const userSchema = new mongoose.Schema({
        name: String,
        age: Number
      });

      const UserModel = mongoose.model('User', userSchema);

      const doc = new UserModel({
        name: 'Jean-Luc Picard',
        age: 59,
        rank: 'Captain'
      });
      doc.name; // 'Jean-Luc Picard'
      doc.age; // 59

      // undefined, Mongoose strips out `rank` because it isn't in the schema
      doc.rank;
      // acquit:ignore:start
      assert.equal(doc.name, 'Jean-Luc Picard');
      assert.equal(doc.age, 59);
      assert.strictEqual(doc.rank, void 0);
      // acquit:ignore:end
    });

    it('casting', async function() {
      // acquit:ignore:start
      const userSchema = new mongoose.Schema({
        name: String,
        age: Number
      });
      // acquit:ignore:end
      const UserModel = mongoose.model('User', userSchema);

      const doc = new UserModel({
        name: 'Jean-Luc Picard',
        age: '59' // Mongoose will convert this to a number
      });
      doc.age; // 59
      await doc.save();

      // Mongoose will convert '60' from a string to a number, even in an update
      await UserModel.updateOne({}, { $set: { age: '60' } });
      // acquit:ignore:start
      assert.equal(doc.name, 'Jean-Luc Picard');
      assert.equal(doc.age, 59);

      const _doc = UserModel.collection.findOne();
      assert.equal(_doc.age, 60);
      // acquit:ignore:end
    });

    it('validation', async function() {
      const userSchema = new mongoose.Schema({
        // Make `name` required
        name: { type: String, required: true },
        age: Number
      });
      const UserModel = mongoose.model('User', userSchema);

      const doc = new UserModel({ age: 30 });

      const err = await doc.save().catch(err => err);
      err.message; // Path `name` is required.
      // acquit:ignore:start
      assert.ok(err.message.includes('Path `name` is required.'), err.message);
      // acquit:ignore:end
    });

    it('nested', async function() {
      // This is **not** how you define a `nested.type` property
      const schema = new mongoose.Schema({
        nested: {
          type: String
        }
      });

      schema.path('nested'); // SchemaString { ... }
      schema.path('nested.type'); // undefined
      // acquit:ignore:start
      assert.ok(!schema.path('nested.type'));
      // acquit:ignore:end
    });

    it('typeKey', async function() {
      // Make Mongoose look for `$type` instead of `type`
      const options = { typeKey: '$type' };
      const schema = new mongoose.Schema({
        nested: {
          type: String
        },
        otherProperty: {
          $type: String
        }
      }, options);

      schema.path('nested.type'); // SchemaString { ... }
      schema.path('otherProperty'); // SchemaString { ... }
      // acquit:ignore:start
      assert.equal(schema.path('nested.type').constructor.name, 'SchemaString');
      assert.equal(schema.path('otherProperty').constructor.name, 'SchemaString');
      // acquit:ignore:end
    });
  });

  describe('objectid', function() {
    it('basic example', async function() {
      const Model = mongoose.model('Test', mongoose.Schema({ name: String }));
      const doc = new Model({ name: 'test' });

      doc._id instanceof mongoose.Types.ObjectId; // true
      typeof doc._id; // 'object'
      doc._id; // '5d6ede6a0ba62570afcedd3a'
      // acquit:ignore:start
      assert.ok(doc._id instanceof mongoose.Types.ObjectId);
      assert.equal(typeof doc._id, 'object');
      // acquit:ignore:end
    });

    it('casting', async function() {
      const schema = mongoose.Schema({ testId: mongoose.ObjectId });
      const Model = mongoose.model('Test', schema);

      const doc = new Model({ testId: '5d6ede6a0ba62570afcedd3a' });

      // `testId` is an ObjectId, Mongoose casts 24 hex char strings to
      // ObjectIds for you automatically based on your schema.
      doc.testId instanceof mongoose.Types.ObjectId; // true
      // acquit:ignore:start
      assert.ok(doc.testId instanceof mongoose.Types.ObjectId);
      // acquit:ignore:end
    });

    it('casting other types', async function() {
      const schema = mongoose.Schema({ testId: mongoose.ObjectId });
      const Model = mongoose.model('Test', schema);

      // Any 12 character string is a valid ObjectId, because the only defining
      // feature of ObjectIds is that they have 12 bytes.
      let doc = new Model({ testId: '12char12char' });
      doc.testId instanceof mongoose.Types.ObjectId; // true
      doc.testId; // '313263686172313263686172'
      // acquit:ignore:start
      assert.ok(doc.testId instanceof mongoose.Types.ObjectId);
      assert.equal(doc.testId.toString(), '313263686172313263686172');
      // acquit:ignore:end

      // Similarly, Mongoose will automatically convert buffers of length 12
      // to ObjectIds.
      doc = new Model({ testId: Buffer.from('12char12char') });
      doc.testId instanceof mongoose.Types.ObjectId; // true
      doc.testId; // '313263686172313263686172'
      // acquit:ignore:start
      assert.ok(doc.testId instanceof mongoose.Types.ObjectId);
      assert.equal(doc.testId.toString(), '313263686172313263686172');
      // acquit:ignore:end
    });

    it('timestamps', async function() {
      const schema = mongoose.Schema({ testId: mongoose.ObjectId });
      const Model = mongoose.model('Test', schema);

      const doc = new Model({ testId: '313263686172313263686172' });
      doc.testId.getTimestamp(); // '1996-02-27T01:50:32.000Z'
      doc.testId.getTimestamp() instanceof Date; // true
      // acquit:ignore:start
      assert.equal(doc.testId.getTimestamp().toISOString(),
        '1996-02-27T01:50:32.000Z');
      assert.ok(doc.testId.getTimestamp() instanceof Date);
      // acquit:ignore:end
    });
  });

  describe('Populate', function() {
    it('basic with query', async function() {
      // acquit:ignore:start
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
      
      const Person = mongoose.model('Person', mongoose.Schema({
        name: String
      }));
      await Movie.deleteMany({});
      await Person.deleteMany({});
      // acquit:ignore:end
      const people = await Person.create([
        { name: 'James Cameron' },
        { name: 'Arnold Schwarzenegger' },
        { name: 'Linda Hamilton' }
      ]);
      await Movie.create({
        title: 'Terminator 2',
        director: people[0]._id,
        actors: [people[1]._id, people[2]._id]
      });

      // Load just the movie's director
      let movie = await Movie.findOne().populate('director');
      movie.director.name; // 'James Cameron'
      movie.actors[0].name; // undefined
      // acquit:ignore:start
      assert.equal(movie.director.name, 'James Cameron');
      assert.equal(movie.actors[0].name, void 0);
      // acquit:ignore:end

      // Load both the director and the actors
      movie = await Movie.findOne().populate('director').populate('actors');
      movie.director.name; // 'James Cameron'
      movie.actors[0].name; // 'Arnold Schwarzenegger'
      movie.actors[1].name; // 'Linda Hamilton'
      // acquit:ignore:start
      assert.equal(movie.director.name, 'James Cameron');
      assert.equal(movie.actors[0].name, 'Arnold Schwarzenegger');
      assert.equal(movie.actors[1].name, 'Linda Hamilton');
      // acquit:ignore:end
    });

    it('basic with document', async function() {
      // acquit:ignore:start
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
      
      const Person = mongoose.model('Person', mongoose.Schema({
        name: String
      }));

      await Movie.deleteMany({});
      await Person.deleteMany({});
      const people = await Person.create([
        { name: 'James Cameron' },
        { name: 'Arnold Schwarzenegger' },
        { name: 'Linda Hamilton' }
      ]);
      await Movie.create({
        title: 'Terminator 2',
        director: people[0]._id,
        actors: [people[1]._id, people[2]._id]
      });
      // acquit:ignore:end
      // Load just the movie's director
      let movie = await Movie.findOne();
      movie.director.name; // undefined
      movie.actors[0].name; // undefined
      // acquit:ignore:start
      assert.equal(movie.director.name, void 0);
      assert.equal(movie.actors[0].name, void 0);
      // acquit:ignore:end

      // Populate the director
      await movie.populate('director').execPopulate();
      movie.director.name; // 'James Cameron'
      movie.actors[0].name; // undefined
      // acquit:ignore:start
      assert.equal(movie.director.name, 'James Cameron');
      assert.equal(movie.actors[0].name, void 0);
      // acquit:ignore:end

      // Populate the actors
      await movie.populate('actors').execPopulate();
      movie.director.name; // 'James Cameron'
      movie.actors[0].name; // 'Arnold Schwarzenegger'
      movie.actors[1].name; // 'Linda Hamilton'
      // acquit:ignore:start
      assert.equal(movie.director.name, 'James Cameron');
      assert.equal(movie.actors[0].name, 'Arnold Schwarzenegger');
      assert.equal(movie.actors[1].name, 'Linda Hamilton');
      // acquit:ignore:end
    });

    it('missing docs', async function() {
      // acquit:ignore:start
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
      
      const Person = mongoose.model('Person', mongoose.Schema({
        name: String
      }));
      await Movie.deleteMany({});
      await Person.deleteMany({});
      const people = await Person.create([
        { name: 'James Cameron' },
        { name: 'Arnold Schwarzenegger' },
        { name: 'Linda Hamilton' }
      ]);
      await Movie.create({
        title: 'Terminator 2',
        director: people[0]._id,
        actors: [people[1]._id, people[2]._id]
      });
      // acquit:ignore:end
      await Person.deleteOne({ name: 'James Cameron' });

      const movie = await Movie.findOne().populate('director');
      movie.director; // null
      // acquit:ignore:start
      assert.strictEqual(movie.director, null);
      // acquit:ignore:end
    });

    it('missing array', async function() {
      // acquit:ignore:start
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
      
      const Person = mongoose.model('Person', mongoose.Schema({
        name: String
      }));
      await Movie.deleteMany({});
      await Person.deleteMany({});
      const people = await Person.create([
        { name: 'James Cameron' },
        { name: 'Arnold Schwarzenegger' },
        { name: 'Linda Hamilton' }
      ]);
      await Movie.create({
        title: 'Terminator 2',
        director: people[0]._id,
        actors: [people[1]._id, people[2]._id]
      });
      // acquit:ignore:end
      await Person.deleteOne({ name: 'Arnold Schwarzenegger' });

      let movie = await Movie.findOne().populate('actors');
      movie.actors.length; // 1
      movie.actors[0].name; // 'Linda Hamilton'
      // acquit:ignore:start
      assert.equal(movie.actors.length, 1);
      assert.equal(movie.actors[0].name, 'Linda Hamilton');
      // acquit:ignore:end

      // Set `retainNullValues` option to insert `null` for
      // missing documents in the array
      movie = await Movie.findOne().populate({
        path: 'actors',
        options: { retainNullValues: true }
      });
      movie.actors.length; // 2
      movie.actors[0]; // null
      movie.actors[1].name; // 'Linda Hamilton'
      // acquit:ignore:start
      assert.equal(movie.actors.length, 2);
      assert.strictEqual(movie.actors[0], null);
      assert.equal(movie.actors[1].name, 'Linda Hamilton');
      // acquit:ignore:end
    });
  });

  describe('findOneAndUpdate', function() {
    it('getting started', async function() {
      const Character = mongoose.model('Character', Schema({
        name: String,
        rank: String
      }));

      await Character.create({ name: 'Luke Skywalker' });

      // By default, `findOneAndUpdate()` returns the document as
      // it was **before** MongoDB applied the update.
      const filter = { name: 'Luke Skywalker' };
      const update = { rank: 'Jedi Knight' };
      let doc = await Character.findOneAndUpdate(filter, update);
      doc.name; // 'Luke Skywalker'
      doc.rank; // undefined
      // acquit:ignore:start
      assert.equal(doc.name, 'Luke Skywalker');
      assert.strictEqual(doc.rank, void 0);
      // acquit:ignore:end

      // But the document is updated in the database:
      doc = await Character.findOne(filter);
      doc.rank; // 'Jedi Knight'
      // acquit:ignore:start
      assert.equal(doc.rank, 'Jedi Knight');
      // acquit:ignore:end
    });

    it('new option', async function() {
      // acquit:ignore:start
      const Character = mongoose.model('Character', Schema({
        name: String,
        rank: String
      }));
      await Character.deleteMany({});
      await Character.create({ name: 'Luke Skywalker' });
      // acquit:ignore:end
      // If you set the `new` option to `true`, Mongoose will
      // return the document with the update applied.
      const filter = { name: 'Luke Skywalker' };
      const update = { rank: 'Jedi Knight' };
      const opts = { new: true };

      let doc = await Character.findOneAndUpdate(filter, update, opts);
      doc.name; // 'Luke Skywalker'
      doc.rank; // 'Jedi Knight'
      // acquit:ignore:start
      assert.equal(doc.name, 'Luke Skywalker');
      assert.strictEqual(doc.rank, 'Jedi Knight');
      // acquit:ignore:end
    });

    it('new option', async function() {
      // acquit:ignore:start
      const Character = mongoose.model('Character', Schema({
        name: String,
        rank: String
      }));
      await Character.deleteMany({});
      await Character.create({ name: 'Luke Skywalker' });
      // acquit:ignore:end
      // If you set the `new` option to `true`, Mongoose will
      // return the document with the update applied.
      const filter = { name: 'Luke Skywalker' };
      const update = { rank: 'Jedi Knight' };
      const opts = { new: true };

      let doc = await Character.findOneAndUpdate(filter, update, opts);
      doc.name; // 'Luke Skywalker'
      doc.rank; // 'Jedi Knight'
      // acquit:ignore:start
      assert.equal(doc.name, 'Luke Skywalker');
      assert.strictEqual(doc.rank, 'Jedi Knight');
      // acquit:ignore:end
    });

    it('upsert', async function() {
      // acquit:ignore:start
      const Character = mongoose.model('Character', Schema({
        name: String,
        rank: String
      }));
      // acquit:ignore:end
      await Character.deleteMany({});

      const filter = { name: 'Luke Skywalker' };
      const update = { rank: 'Jedi Knight' };
      // If you set the `upsert` option, Mongoose will insert
      // a new document if one isn't found.
      const opts = { new: true, upsert: true };

      let doc = await Character.findOneAndUpdate(filter, update, opts);
      doc.name; // 'Luke Skywalker'
      doc.rank; // 'Jedi Knight'
      // acquit:ignore:start
      assert.equal(doc.name, 'Luke Skywalker');
      assert.strictEqual(doc.rank, 'Jedi Knight');
      // acquit:ignore:end

      // If `new` is `false` and an upsert happened,
      // `findOneAndUpdate()` will return `null`
      await Character.deleteMany({});

      opts.new = false;
      doc = await Character.findOneAndUpdate(filter, update, opts);
      doc; // null
      // acquit:ignore:start
      assert.strictEqual(doc, null);
      // acquit:ignore:end
    });

    it('middleware', async function() {
      const schema = Schema({
        name: String,
        rank: String
      });
      schema.pre('findOneAndUpdate', function middleware() {
        this.getFilter(); // { name: 'Luke Skywalker' }
        this.getUpdate(); // { rank: 'Jedi Knight' }
        // acquit:ignore:start
        assert.deepEqual(this.getFilter(), { name: 'Luke Skywalker' });
        assert.deepEqual(this.getUpdate(), { rank: 'Jedi Knight' });
        ++called;
        // acquit:ignore:end
      });
      const Character = mongoose.model('Character', schema);
      // acquit:ignore:start
      let called = 0;
      await Character.deleteMany({});
      // acquit:ignore:end

      const filter = { name: 'Luke Skywalker' };
      const update = { rank: 'Jedi Knight' };
      // Mongoose calls the `middleware()` function above
      await Character.findOneAndUpdate(filter, update, opts);
      // acquit:ignore:start
      assert.equal(called, 1);
      // acquit:ignore:end
    });
  });

  describe('promise', function() {
    it('basic example', async function() {
      const Model = mongoose.model('Test', Schema({
        name: String
      }));

      const doc = new Model({ name: 'Neo' });

      const promise = doc.save();
      promise instanceof Promise; // true
      // acquit:ignore:start
      assert.ok(promise instanceof Promise);
      await promise;
      // acquit:ignore:end

      const res = doc.save(function callback(err) {
        /*...*/
      });
      res; // undefined
      // acquit:ignore:start
      assert.strictEqual(res, undefined);
      await new Promise(resolve => setTimeout(resolve, 50));
      // acquit:ignore:end
    });
  });

  describe('save', function() {
    it('insert new document', async function() {
      const Person = mongoose.model('Person', Schema({
        name: String,
        rank: String
      }));

      const doc = new Person({
        name: 'Will Riker',
        rank: 'Commander'
      });
      // Inserts a new document with `name = 'Will Riker'` and
      // `rank = 'Commander'`
      await doc.save();

      const person = await Person.findOne();
      person.name; // 'Will Riker'
      // acquit:ignore:start
      assert.equal(person.name, 'Will Riker');
      // acquit:ignore:end
    });

    it('update existing', async function() {
      // acquit:ignore:start
      const Person = mongoose.model('Person', Schema({
        name: String,
        rank: String
      }));

      const _doc = new Person({
        name: 'Will Riker',
        rank: 'Commander'
      });
      await _doc.save();
      // acquit:ignore:end
      const person = await Person.findOne();
      person.name; // 'Will Riker'

      // Mongoose _tracks changes_ on documents. Mongoose
      // tracks that you set the `rank` property, and persists
      // that change to the database.
      person.rank = 'Captain';
      await person.save();

      // Load the document from the database and see the changes
      const docs = await Person.find();

      docs.length; // 1
      docs[0].rank; // 'Captain'
      // acquit:ignore:start
      assert.equal(docs.length, 1);
      assert.equal(docs[0].rank, 'Captain');
      // acquit:ignore:end
    });

    it('validation', async function() {
      const Person = mongoose.model('Person', Schema({
        name: String,
        age: Number
      }));

      const doc = await Person.create({ name: 'Will Riker', age: 29 });

      // Setting `age` to an invalid value is ok...
      doc.age = 'Lollipop';

      // But trying to `save()` the document errors out
      const err = await doc.save().catch(err => err);
      err; // Cast to Number failed for value "Lollipop" at path "age"
      // acquit:ignore:start
      assert.ok(err);
      // acquit:ignore:end

      // But then `save()` succeeds if you set `age` to a valid value.
      doc.age = 30;
      await doc.save();
    });

    it('pre save', async function() {
      const schema = Schema({ name: String, age: Number });
      schema.pre('save', function() {
        // In 'save' middleware, `this` is the document being saved.
        console.log('Save', this.name);
      });
      const Person = mongoose.model('Person', schema);

      const doc = new Person({ name: 'Will Riker', age: 29 });

      // Prints "Save Will Riker"
      await doc.save();
    });

    it('post save', async function() {
      const schema = Schema({ name: String, age: Number });
      schema.pre('save', function() {
        this.$locals.start = Date.now();
      });
      schema.post('save', function() {
        console.log('Saved in', Date.now() - this.$locals.start, 'ms');
      });
      const Person = mongoose.model('Person', schema);

      const doc = new Person({ name: 'Will Riker', age: 29 });

      // Prints something like "Saved in 12 ms"
      await doc.save();
    });

    it('child middleware', async function() {
      const shipSchema = Schema({ name: String, registry: String });
      shipSchema.pre('save', function() {
        console.log('Save', this.registry);
      });
      const schema = Schema({
        name: String,
        rank: String,
        ship: shipSchema
      });
      const Person = mongoose.model('Person', schema);

      const doc = new Person({
        name: 'Will Riker',
        age: 29,
        ship: {
          name: 'Enterprise',
          registry: 'NCC-1701-D'
        }
      });

      // Prints "Save NCC-1701-D"
      await doc.save();

      doc.ship.registry = 'NCC-1701-E';
      // Prints "Save NCC-1701-E"
      await doc.save();
    });
  });

  describe('explain', function() {
    it('basic example', async function() {
      const Character = mongoose.model('Character', mongoose.Schema({
        name: String,
        age: Number,
        rank: String
      }));
  
      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);

      const explain = await Character.find({ name: /Picard/ }).explain().
        then(res => res[0]);
      // Object describing how MongoDB planned to execute the query
      explain.queryPlanner;
      // Object containing stats about how MongoDB executed the query
      explain.executionStats;
    });

    it('queryPlanner index', async function() {
      // acquit:ignore:start
      const Character = mongoose.model('Character', mongoose.Schema({
        name: String,
        age: Number,
        rank: String
      }));
  
      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);
      // acquit:ignore:end
      await Character.collection.createIndex({ name: 1 });

      const explain = await Character.find({ name: 'Jean-Luc Picard' }).explain().
        then(res => res[0]);
      // Object describing how MongoDB planned to execute the query
      explain.queryPlanner;
    });
  });

  describe('find like', function() {
    it('basic example', async function() {
      const User = mongoose.model('User', mongoose.Schema({
        email: String
      }));

      await User.create([
        { email: 'sergei@google.com' },
        { email: 'bill@microsoft.com' },
        { email: 'test@gmail.com' },
        { email: 'gmail@google.com' }
      ]);

      const docs = await User.find({ email: /gmail/ });
      docs.length; // 2
      docs.map(doc => doc.email).sort(); // ['gmail@google.com', 'test@gmail.com']
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.email).sort(),
        ['gmail@google.com', 'test@gmail.com']);
      // acquit:ignore:end
    });

    it('regexp', async function() {
      const User = mongoose.model('User', mongoose.Schema({
        email: String
      }));

      await User.create([
        { email: 'sergei@google.com' },
        { email: 'bill@microsoft.com' },
        { email: 'test@gmail.com' },
        { email: 'gmail@google.com' }
      ]);

      const docs = await User.find({ email: { $regex: '+foo' } });
      docs.length; // 2
      docs.map(doc => doc.email).sort(); // ['gmail@google.com', 'test@gmail.com']
      // acquit:ignore:start
      assert.deepEqual(docs.map(doc => doc.email).sort(),
        ['gmail@google.com', 'test@gmail.com']);
      // acquit:ignore:end
    });

    it('regexp escape', async function() {
      const escapeStringRegexp = require('escape-string-regexp');
      const User = mongoose.model('User', mongoose.Schema({
        email: String
      }));

      await User.create([
        { email: 'sergey@google.com' },
        { email: 'bill@microsoft.com' },
        { email: 'test+foo@gmail.com' }
      ]);

      const $regex = escapeStringRegexp('+foo');
      const docs = await User.find({ email: { $regex } });
      
      docs.length; // 1
      docs[0].email; // 'test+foo@gmail.com'

      // Throws: MongoError: Regular expression is invalid: nothing to repeat
      // acquit:ignore:start
      try {
      // acquit:ignore:end
      await User.find({ email: { $regex: '+foo' } });
      // acquit:ignore:start
      } catch(err) {
        assert.ok(err.message.includes('Regular expression is invalid'));
      }
      assert.deepEqual(docs.map(doc => doc.email).sort(),
        ['test+foo@gmail.com']);
      // acquit:ignore:end
    });
  });

  describe('create', function() {
    it('basic example', async function() {
      const User = mongoose.model('User', mongoose.Schema({
        email: String
      }));

      const doc = await User.create({ email: 'bill@microsoft.com' });
      doc instanceof User; // true
      doc.email; // 'bill@microsoft.com'
      // acquit:ignore:start
      assert.ok(doc instanceof User);
      assert.equal(doc.email, 'bill@microsoft.com');
      // acquit:ignore:end
    });

    it('multiple', async function() {
      const User = mongoose.model('User', mongoose.Schema({
        email: String
      }));

      const docs = await User.create([
        { email: 'sergey@google.com' },
        { email: 'bill@microsoft.com' }
      ]);
      docs[0] instanceof User; // true
      docs[0].email; // 'sergey@google.com'
      docs[1].email; // 'bill@microsoft.com'
      // acquit:ignore:start
      assert.ok(docs[0] instanceof User);
      assert.equal(docs[0].email, 'sergey@google.com');
      assert.equal(docs[1].email, 'bill@microsoft.com');
      // acquit:ignore:end
    });

    it('insertMany', async function() {
      const User = mongoose.model('User', mongoose.Schema({
        email: String
      }));

      const [doc] = await User.insertMany([{ email: 'bill@microsoft.com' }]);
      doc instanceof User; // true
      doc.email; // 'bill@microsoft.com'
      // acquit:ignore:start
      assert.ok(doc instanceof User);
      assert.equal(doc.email, 'bill@microsoft.com');
      // acquit:ignore:end
    });
  });
  describe('connection-status', function() {
    it('(gh-32)', async function() {
        // acquit:ignore:start
        await mongoose.disconnect();
        // acquit:ignore:end
        // Demonstrate the readyState and on event emitters
        console.log(mongoose.connection.readyState); //logs 0
        mongoose.connection.on('connecting', () => { 
          console.log('connecting')
          console.log(mongoose.connection.readyState); //logs 2
        });
        mongoose.connection.on('connected', () => {
          console.log('connected');
          console.log(mongoose.connection.readyState); //logs 1
        });
        mongoose.connection.on('disconnecting', () => {
          console.log('disconnecting');
          console.log(mongoose.connection.readyState); // logs 3
        });
        mongoose.connection.on('disconnected', () => {
          console.log('disconnected');
          console.log(mongoose.connection.readyState); //logs 0
        });
        // Connect to a MongoDB server running on 'localhost:27017' and use the
        // 'test' database.
        await mongoose.connect('mongodb://localhost:27017/test', {
          useNewUrlParser: true // Boilerplate for Mongoose 5.x
        });
    });
  });
  describe('mongoose-connect-async', function() {
    it('(gh-40a)', async function() {
        // acquit:ignore:start
        await mongoose.disconnect();
        // acquit:ignore:end
        // Connect to a MongoDB server running on 'localhost:27017' and use the
        // 'test' database.
        await mongoose.connect('mongodb://localhost:27017/test', {
          useNewUrlParser: true // Boilerplate for Mongoose 5.x
        });
    });
    it('(gh-40b)', async function() {
      // acquit:ignore:start
      await mongoose.disconnect();
      // acquit:ignore:end
      // Connect to a MongoDB server running on 'localhost:27017' and use the
      // 'test' database.
      await mongoose.createConnection('mongodb://localhost:27017/test', {
        useNewUrlParser: true
      });
    });
  });

  it('using db', async function() {
    // acquit:ignore:start
    await mongoose.disconnect();
    // acquit:ignore:end
    // Connect to a MongoDB server running on 'localhost:27017' and use the
    // 'test' database.
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true // Boilerplate for Mongoose 5.x
    });

    // Get the current db's profiling level using:
    // http://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#profilingLevel
    // Mongoose doesn't support getting the profiling level.
    const profilingLevel = await mongoose.connection.db.profilingLevel();
    profilingLevel; // 'off'
    // acquit:ignore:start
    assert.equal(profilingLevel, 'off');
    // acquit:ignore:end
  });

  it('using getClient', async function() {
    // Get another db's profiling level using:
    // http://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#profilingLevel
    // Mongoose doesn't support getting the profiling level.
    const client = mongoose.connection.getClient();
    const profilingLevel = await client.db('otherdb').profilingLevel();
    profilingLevel; // 'off'
    // acquit:ignore:start
    assert.equal(profilingLevel, 'off');
    // acquit:ignore:end
  });

  it('validates-email', async function() {
    const User = mongoose.model('User', mongoose.Schema({
      email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      }
    }));
    await User.create([
        { email: 'gmail@google.com' },
        { email: 'bill@microsoft.com' },
        { email: 'test@gmail.com' }
    ]);

    await User.init();
    try {
      await User.create({ email: 'gmail@google.com' });
    } catch(error) {
      error.message; // 'E11000 duplicate key error...'
    }
  });
   
  describe('mongoose-find-async', function() {
    it('find', async function() {
        const Character = mongoose.model('Character', mongoose.Schema({
          name: String,
          age: Number,
          rank: String
        }));
        await Character.create([
          { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
          { name: 'William Riker', age: 29, rank: 'Commander' },
          { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
          { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
          { name: 'Worf', age: 24, rank: 'Lieutenant' }
        ]);
        // The query to find all the Lieutenants
        const query = await Character.find({ rank: 'Lieutenant' }); // will return Worf and La Forge
    });
    it('nofind', async function() {
      // acquit:ignore:start
      const Character = mongoose.model('Character', mongoose.Schema({
        name: String,
        age: Number,
        rank: String
      }));
      // acquit:ignore:end
      await Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' }
      ]);
      // Parameter omitted
      const query = await Character.find(); // returns the above array with an _id property and __v property
    });
  });
  describe('Update-Mongoose-Timestamps', function() {
    it('simple', async function() {
      const userSchema = mongoose.Schema({
        email: String
      }, { timestamps: true });
      
      const User = mongoose.model('User', userSchema);
      
      const doc = await User.findOneAndUpdate({email: 'test@google.com'}, {email:'newtest@google.com'}, 
      {new:true, upsert: true, timestamps:false});
    });
    it('complex', async function() {
      const userSchema = mongoose.Schema({
        email: String
      }, { timestamps: true });
      
      const User = mongoose.model('User', userSchema);
      
      const doc = await User.findOneAndUpdate({email: 'test@google.com'}, {email:'newtest@google.com'}, 
      {new:true, upsert: true, timestamps:{createdAt:false, updatedAt:true}});
    });
  });
});