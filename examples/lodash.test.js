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

  describe('get', function() {
    it('basic', function() {
      // acquit:ignore:start
      const landmark = {
        name: 'Golden Gate Bridge',
        // GeoJSON feature: https://geojson.org/
        location: {
          type: 'Feature',
          properties: {
            city: 'San Francisco',
            state: 'California'
          },
          geometry: {
            type: 'Point',
            coordinates: [-122.4804438, 37.8199328]
          }
        }
      };

      // acquit:ignore:end
      let type = _.get(landmark, 'location.geometry.type'); // 'Point'
      // acquit:ignore:start
      assert.equal(type, 'Point');
      // acquit:ignore:end

      delete landmark.location;
      // `_.get()` doesn't error out, even though `landmark.location` is
      // undefined.
      type = _.get(landmark, 'location.geometry.type'); // undefined
      // acquit:ignore:start
      assert.strictEqual(type, void 0);
      // acquit:ignore:end

      // Even if `landmark` is `null`, `_.get()` does not error out.
      type = _.get(null, 'location.geometry.type'); // undefined
      // acquit:ignore:start
      assert.strictEqual(type, void 0);
      // acquit:ignore:end
    });

    it('default', function() {
      // acquit:ignore:start
      const landmark = {
        name: 'Golden Gate Bridge',
        // GeoJSON feature: https://geojson.org/
        location: {
          type: 'Feature',
          properties: {
            city: 'San Francisco',
            state: 'California'
          },
          geometry: {
            type: 'Point',
            coordinates: [-122.4804438, 37.8199328]
          }
        }
      };
      // acquit:ignore:end
      landmark.location.geometry.type = undefined;
      // If the value of the property is `undefined`, `_.get()` will return
      // the default value.
      let type = _.get(landmark, 'location.geometry.type', 'default'); // 'default'
      // acquit:ignore:start
      assert.equal(type, 'default');
      // acquit:ignore:end

      delete landmark.location;
      // If the property doesn't exist, `_.get()` will also return the default
      // value.
      type = _.get(landmark, 'location.geometry.type', 'default'); // 'default'
      // acquit:ignore:start
      assert.strictEqual(type, 'default');
      // acquit:ignore:end
    });

    it('with null', function() {
      // acquit:ignore:start
      const landmark = {
        name: 'Golden Gate Bridge',
        // GeoJSON feature: https://geojson.org/
        location: {
          type: 'Feature',
          properties: {
            city: 'San Francisco',
            state: 'California'
          },
          geometry: {
            type: 'Point',
            coordinates: [-122.4804438, 37.8199328]
          }
        }
      };
      // acquit:ignore:end
      landmark.location.geometry.type = null;
      // If the value of the property is `null`, `_.get()` will **not** use
      // the default value
      let type = _.get(landmark, 'location.geometry.type', 'default'); // null
      // acquit:ignore:start
      assert.strictEqual(type, null);
      // acquit:ignore:end
    });

    it('safe null', function() {
      // acquit:ignore:start
      const landmark = {
        name: 'Golden Gate Bridge',
        // GeoJSON feature: https://geojson.org/
        location: {
          type: 'Feature',
          properties: {
            city: 'San Francisco',
            state: 'California'
          },
          geometry: {
            type: 'Point',
            coordinates: [-122.4804438, 37.8199328]
          }
        }
      };
      // acquit:ignore:end
      landmark.location.geometry.type = null;

      const checkDefault = (v, def) => v == null ? def : v;
      // 'default'
      let type = checkDefault(_.get(landmark, 'location.geometry.type'), 'default');
      // acquit:ignore:start
      assert.strictEqual(type, 'default');
      // acquit:ignore:end
    });
  });

  describe('find', function() {
    it('basic', function() {
      const arr = [1, 2, 3, 4, 5];

      // `find()` executes `predicate` for every element in the array until
      // `predicate` returns true.
      const predicate = v => v > 3;
      _.find(arr, predicate); // 4
      // acquit:ignore:start
      assert.equal(_.find(arr, predicate), 4);
      // acquit:ignore:end
    });

    it('no result', function() {
      const arr = [1, 2, 3, 4, 5];

      _.find(arr, v => v > 5); // undefined
      // acquit:ignore:start
      assert.strictEqual(_.find(arr, v => v > 5), void 0);
      // acquit:ignore:end
    });

    it('object', function() {
      const obj = { key1: 1, key2: 2, key3: 3 };

      _.find(obj, v => v > 2); // 3
      // acquit:ignore:start
      assert.strictEqual(_.find(obj, v => v > 2), 3);
      // acquit:ignore:end
    });

    it('object comparison', function() {
      const characters = [
        { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
        { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
      ];

      _.find(characters, { rank: 'Commander', age: 29 }).lastName; // 'Riker'
      // acquit:ignore:start
      assert.strictEqual(_.find(characters, { rank: 'Commander', age: 29 }).lastName,
        'Riker');
      // acquit:ignore:end
    });

    it('string comparison', function() {
      const characters = [
        { name: 'Doctor Pulaski' },
        { name: 'Tasha Yar', active: false },
        { name: 'Wesley Crusher', active: null },
        { name: 'Jean-Luc Picard', active: true }
      ];

      // Find the first character with a truthy `active` property
      _.find(characters, 'active').name; // 'Jean-Luc Picard'
      // acquit:ignore:start
      assert.strictEqual(_.find(characters, 'active').name, 'Jean-Luc Picard');
      // acquit:ignore:end
    });
  });

  describe('debounce', function() {
    it('autocomplete', async function() {
      // acquit:ignore:start
      let called = 0;
      const el = new FakeElement();
      // acquit:ignore:end
      const wait = 100;
      el.addEventListener('change', _.debounce(autocomplete, wait));

      el.value = 'te';
      el.trigger('change'); // "Called: te" after 100ms
      await new Promise(resolve => setTimeout(resolve, 110));
      // acquit:ignore:start
      assert.equal(called, 1);
      // acquit:ignore:end

      el.value = 'test';
      // Nothing, because the next 'change' event takes over
      el.trigger('change');
      await new Promise(resolve => setTimeout(resolve, 50));

      el.value = 'testing';
      el.trigger('change'); // "Called: testing" after 100ms
      // acquit:ignore:start
      await new Promise(resolve => setTimeout(resolve, 110));
      assert.equal(called, 2);
      // acquit:ignore:end

      function autocomplete() {
        // acquit:ignore:start
        ++called;
        // acquit:ignore:end
        console.log('Called:', el.value);
      }
    });

    it('maxWait', async function() {
      // acquit:ignore:start
      let called = 0;
      const el = new FakeElement();
      // acquit:ignore:end
      const wait = 100;
      el.addEventListener('change', _.debounce(autocomplete, wait, {
        maxWait: 120
      }));

      el.value = 'te';
      el.trigger('change');
      await new Promise(resolve => setTimeout(resolve, 60));

      el.value = 'test';
      el.trigger('change'); // "Called: test" after 60ms
      // acquit:ignore:start
      await new Promise(resolve => setTimeout(resolve, 80));
      assert.equal(called, 1);
      // acquit:ignore:end

      function autocomplete() {
        // acquit:ignore:start
        ++called;
        // acquit:ignore:end
        console.log('Called:', el.value);
      }
    });
  });

  describe('.clone', function() {
    it('array', function() {
      const arr = ['a', 'b', 'c'];

      // `Object.assign()` will copy all the array properties
      // into a POJO
      Object.assign({}, arr); // { '0': 1, '1': 2, '2': 3 }

      // But `_.clone()` is smart enough to clone an array
      _.clone(arr); // ['a', 'b', 'c']
      // acquit:ignore:start
      assert.ok(_.clone(arr) instanceof Array);
      assert.deepEqual(_.clone(arr), ['a', 'b', 'c']);
      // acquit:ignore:end
    });

    it('class instance', function() {
      class MyClass {
        constructor(val) {
          this.val = val;
        }
      }

      const obj = new MyClass(42);

      // `Object.assign()` **always** returns a POJO. It
      // doesn't actually create a new instance of the class.
      Object.assign({}, obj) instanceof MyClass; // false

      // `_.clone()` retains the original object's class.
      _.clone(obj) instanceof MyClass; // true
       // acquit:ignore:start
       assert.ok(_.clone(obj) instanceof MyClass);
       assert.equal(_.clone(obj).val, 42);
       // acquit:ignore:end
    });
  });

  describe('filter', function() {
    it('basic example', function() {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      _.filter(arr, isEven); // [2, 4, 6, 8]
      function isEven(v) { return v % 2 === 0; }
      // acquit:ignore:start
      assert.deepEqual(_.filter(arr, isEven), [2, 4, 6, 8]);
      // acquit:ignore:end
    });

    it('arrow and truthy', function() {
      const arr = [null, false, 0, 'hello'];

      _.filter(arr, v => v); // ['hello']
      // acquit:ignore:start
      assert.deepEqual(_.filter(arr, v => v), ['hello']);
      // acquit:ignore:end
    });

    it('array of objects with prop name', function() {
      const arr = [
        {},
        { hello: null },
        { hello: false },
        { hello: 0 },
        { hello: 'world' }
      ];

      _.filter(arr, 'hello'); // [{ hello: 'world' }]
      // acquit:ignore:start
      assert.deepEqual(_.filter(arr, 'hello'), [{ hello: 'world' }]);
      // acquit:ignore:end
    });

    it('using matches', function() {
      const arr = [
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander' },
        { firstName: 'Beverly', lastName: 'Crusher', rank: 'Commander' },
        { firstName: 'Wesley', lastName: 'Crusher', rank: 'Ensign' }
      ];

      // ['Riker', 'Crusher']
      _.filter(arr, { rank: 'Commander' }).map(v => v.lastName);

      // ['Beverly', 'Wesley']
      _.filter(arr, { lastName: 'Crusher' }).map(v => v.firstName);

      // ['Beverly']
      _.filter(arr, { lastName: 'Crusher', rank: 'Commander' }).map(v => v.firstName);
      // acquit:ignore:start
      assert.deepEqual(_.filter(arr, { rank: 'Commander' }).map(v => v.lastName),
        ['Riker', 'Crusher']);
      assert.deepEqual(_.filter(arr, { lastName: 'Crusher' }).map(v => v.firstName),
        ['Beverly', 'Wesley']);
      assert.deepEqual(_.filter(arr, { lastName: 'Crusher', rank: 'Commander' }).map(v => v.firstName),
        ['Beverly']);
      // acquit:ignore:end
    });

    it('collections', function() {
      const obj = {
        one: 1,
        two: 2,
        three: 3,
        four: 4
      };
      _.filter(obj, v => v % 2 === 0); // [2, 4]
      // acquit:ignore:start
      assert.deepEqual(_.filter(obj, v => v % 2 === 0), [2, 4]);
      // acquit:ignore:end
    });
  });

  describe('map', function() {
    it('string', function() {
      const arr = [
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander' },
        { firstName: 'Beverly', lastName: 'Crusher', rank: 'Commander' },
        { firstName: 'Wesley', lastName: 'Crusher', rank: 'Ensign' }
      ];

      _.map(arr, 'firstName'); // ['Will', 'Beverly', 'Wesley']
      // Equivalent:
      _.map(arr, v => v.firstName); // ['Will', 'Beverly', 'Wesley']
      // acquit:ignore:start
      assert.deepEqual(_.map(arr, 'firstName'), ['Will', 'Beverly', 'Wesley']);
      assert.deepEqual(_.map(arr, v => v.firstName), ['Will', 'Beverly', 'Wesley']);
      // acquit:ignore:end
    });

    it('basic example', function() {
      const arr = [1, 2, 3, 4];

      _.map(arr, v => v * 2); // [2, 4, 6, 8]
      // acquit:ignore:start
      assert.deepEqual(_.map(arr, v => v * 2), [2, 4, 6, 8]);
      // acquit:ignore:end
    });

    it('object', function() {
      const obj = {
        one: 1,
        two: 2,
        three: 3,
        four: 4
      };

      _.map(obj, v => v * 2); // [2, 4, 6, 8]
      // acquit:ignore:start
      assert.deepEqual(_.map(obj, v => v * 2), [2, 4, 6, 8]);
      // acquit:ignore:end
    });
  });

  describe('merge', function() {
    it('basic example', function() {
      const destination = { name: 'Will Riker', rank: 'Commander' };
      const source = { ship: 'USS Enterprise' };

      _.merge(destination, source);
      destination.name; // 'Will Riker'
      destination.rank; // 'Commander'
      destination.ship; // 'USS Enterprise'
      // acquit:ignore:start
      assert.deepEqual(destination, {
        name: 'Will Riker',
        rank: 'Commander',
        ship: 'USS Enterprise'
      });
      // acquit:ignore:end
    });

    it('copy', function() {
      const obj = {
        name: {
          first: 'Will',
          last: 'Riker'
        }
      };

      const deepClone = _.merge({}, obj);
      deepClone.name === obj.name; // false

      deepClone.name.first = 'Thomas';
      obj.name.first; // 'Will'
      // acquit:ignore:start
      assert.ok(deepClone.name !== obj.name);
      assert.equal(obj.name.first, 'Will');
      // acquit:ignore:end

      const shallowClone = _.assign({}, obj);
      shallowClone.name === obj.name; // true

      shallowClone.name.first = 'Thomas';
      obj.name.first; // 'Thomas'
      // acquit:ignore:start
      assert.ok(shallowClone.name === obj.name);
      assert.equal(obj.name.first, 'Thomas');
      // acquit:ignore:end
    });

    it('undefined', function() {
      let destination = {
        firstName: 'Will',
        lastName: 'Riker',
        rank: 'Commander'
      };

      // Since `source.rank` is undefined, `merge()` won't overwrite
      // `destination.rank`.
      _.merge(destination, { firstName: 'Thomas', rank: undefined });
      destination.firstName; // 'Thomas'
      destination.rank; // 'Commander'

      destination = {
        firstName: 'Will',
        lastName: 'Riker',
        rank: 'Commander'
      };
      // But `_.assign()` and `Object.assign()` overwrite `destination.rank`.
      _.assign(destination, { firstName: 'Thomas', rank: undefined });
      destination.firstName; // 'Thomas'
      destination.rank; // undefined
    });

    it('classes', function() {
      class Ship {};
      Ship.prototype.shipName = 'USS Enterprise';
      const ship = new Ship();

      // `merge()` copies inherited properties, so it will copy
      // `shipName`
      const merged = _.merge({ name: 'Will Riker', rank: 'Commander' }, ship);
      merged.shipName; // 'USS Enterprise'
      
      // `assign()` does **not** copy inherited properties.
      const assigned = Object.assign({ name: 'Will Riker', rank: 'Commander' }, ship);
      assigned.shipName; // undefined
      // acquit:ignore:start
      assert.deepEqual(merged, {
        name: 'Will Riker',
        rank: 'Commander',
        shipName: 'USS Enterprise'
      });
      assert.deepEqual(assigned, {
        name: 'Will Riker',
        rank: 'Commander'
      });
      // acquit:ignore:end
    });
  });

  describe('pick', function() {
    it('basic example', function() {
      const obj = {
        name: 'Will Riker',
        rank: 'Commander',
        age: 29
      };
      const picked = _.pick(obj, ['name', 'rank']);

      picked === obj; // false
      picked.name; // 'Will Riker'
      picked.rank; // 'Commander'
      picked.age; // undefined
      // acquit:ignore:start
      assert.deepEqual(picked, { name: 'Will Riker', rank: 'Commander' });
      // acquit:ignore:end
    });

    it('dotted', function() {
      const obj = {
        name: {
          first: 'Will',
          last: 'Riker'
        },
        rank: 'Commander',
        age: 29
      };
      const picked = _.pick(obj, ['name.last', 'rank']);

      picked === obj; // false
      picked.name.first; // undefined
      picked.name.last; // 'Riker'
      picked.rank; // 'Commander'
      picked.age; // undefined
      // acquit:ignore:start
      assert.deepEqual(picked, { name: { last: 'Riker' }, rank: 'Commander' });
      // acquit:ignore:end
    });

    it('no errors', function() {
      const obj = {
        name: 'Will Riker',
        rank: 'Commander',
        age: 29
      };
      // Lodash will ignore 'this.is.not.in.the.object', because
      // that path isn't in the object.
      const picked = _.pick(obj, ['name', 'this.is.not.in.the.object']);

      picked === obj; // false
      picked.name; // 'Will Riker'
      picked.rank; // undefined
      picked.age; // undefined
      // acquit:ignore:start
      assert.deepEqual(picked, { name: 'Will Riker' });
      // acquit:ignore:end
    });
  });
});

const EventEmitter = require('events').EventEmitter;

class FakeElement extends EventEmitter {
  trigger(name, val) {
    if (name === 'click' && val == null) {
      val = { target: this };
    }
    this.emit(name, val);
  }

  addEventListener(name, handler) {
    this.on(name, handler);
  }
}