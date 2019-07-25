'use strict';

const _ = require('lodash');
const assert = require('assert');

describe('lodash', function() {
  describe('sortBy', function() {
    it('property name', function() {
      const characters = [
        { name: 'Jean-Luc Picard', age: 59 },
        { name: 'William Riker', age: 29 },
        { name: 'Deanna Troi', age: 28 },
        { name: 'Worf', age: 24 }
      ];

      // Sort characters by the `age` property
      const sorted = _.sortBy(characters, 'age');

      sorted[0].name; // Worf
      sorted[1].name; // Deanna Troi
      sorted[2].name; // William Riker
      sorted[3].name; // Jean-Luc Picard
      // acquit:ignore:start
      assert.equal(sorted[0].name, 'Worf');
      assert.equal(sorted[1].name, 'Deanna Troi');
      assert.equal(sorted[2].name, 'William Riker');
      assert.equal(sorted[3].name, 'Jean-Luc Picard');
      // acquit:ignore:end
    });

    it('using function', function() {
      const characters = [
        { name: 'Jean-Luc Picard', age: 59 },
        { name: 'William Riker', age: 29 },
        { name: 'Deanna Troi', age: 28 },
        { name: 'Worf', age: 24 }
      ];

      // Sort characters by the `age` property
      const iteratees = obj => obj.age;
      const sorted = _.sortBy(characters, iteratees);

      sorted[0].name; // Worf
      sorted[1].name; // Deanna Troi
      sorted[2].name; // William Riker
      sorted[3].name; // Jean-Luc Picard
      // acquit:ignore:start
      assert.equal(sorted[0].name, 'Worf');
      assert.equal(sorted[1].name, 'Deanna Troi');
      assert.equal(sorted[2].name, 'William Riker');
      assert.equal(sorted[3].name, 'Jean-Luc Picard');
      // acquit:ignore:end
    });

    it('length', function() {
      const characters = [
        { name: 'Jean-Luc Picard', age: 59 },
        { name: 'William Riker', age: 29 },
        { name: 'Deanna Troi', age: 28 },
        { name: 'Worf', age: 24 }
      ];

      // Sort characters by the length of their name, longest first. Note
      // the negative sign.
      const iteratees = obj => -obj.name.length;
      const sorted = _.sortBy(characters, iteratees);

      sorted[0].name; // Jean-Luc Picard
      sorted[1].name; // William Riker
      sorted[2].name; // Deanna Troi
      sorted[3].name; // Worf
      // acquit:ignore:start
      assert.equal(sorted[3].name, 'Worf');
      assert.equal(sorted[2].name, 'Deanna Troi');
      assert.equal(sorted[1].name, 'William Riker');
      assert.equal(sorted[0].name, 'Jean-Luc Picard');
      // acquit:ignore:end
    });
  });
});