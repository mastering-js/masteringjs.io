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
});