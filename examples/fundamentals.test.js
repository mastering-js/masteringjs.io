'use strict';

const assert = require('assert');
const moment = require('moment');
const sinon = require('sinon');

describe('Fundamentals', function() {
  it('timestamps', function() {
    // 1556372741848, _milliseconds_ since Jan 1 1970
    Date.now();

    // 1556372741, _seconds_ since Jan 1, 1970. This is the Unix timestamp
    Math.floor(Date.now() / 1000);
    // acquit:ignore:start
    assert.equal(typeof Date.now(), 'number');
    // acquit:ignore:end
  });

  it('get timestamp from date', function() {
    const d = new Date('2019-06-01');

    // Both get you the number of milliseconds since the Unix epoch
    d.getTime(); // 1559347200000
    d.valueOf(); // 1559347200000
    // acquit:ignore:start
    assert.equal(d.getTime(), 1559347200000);
    assert.equal(d.valueOf(), 1559347200000);
    // acquit:ignore:end
  });

  describe('valueOf', function() {
    it('for string, number, date', function() {
      const s = new String('test');
      typeof s; // 'object'
      s.valueOf(); // 'test'
      typeof s.valueOf(); // 'string'

      const n = new Number(42);
      n.valueOf(); // 42

      const d = new Date('2019-06-01');
      d.valueOf(); // 1559347200000
      // acquit:ignore:start
      assert.strictEqual(s.valueOf(), 'test');
      assert.strictEqual(n.valueOf(), 42);
      assert.strictEqual(d.valueOf(), 1559347200000);
      // acquit:ignore:end
    });

    it('compare custom objects', function() {
      class MyClass {
        valueOf() {
          return 0;
        }
      }

      const obj = new MyClass();

      // For the purposes of `<`, `>`, `>=` and `<=`, `obj` is
      // equivalent to 0.
      obj < new Number(-1); // false
      obj > new Number(-1); // true
      obj < -1; // false
      obj > -1; // true

      // For the purposes of `==`, `obj` is equivalent to 0 as a primitive,
      // but not 0 as a Number object. This is because both `obj` and
      // `new Number(0)` are objects, so JS does not call `valueOf()`.
      obj == new Number(0); // false
      obj == 0; // true
      0 == obj; // true

      // `===` skips calling `valueOf()`.
      obj === Number(0); // false
      // acquit:ignore:start
      assert.ok(!(obj < new Number(-1)));
      assert.ok(obj > new Number(-1));
      assert.ok(!(obj == new Number(0)));
      assert.ok(0 == obj);

      assert.ok(!(obj < -1));
      assert.ok(obj > -1);
      assert.ok(obj == 0);

      assert.ok(!(obj === Number(0)));
      // acquit:ignore:end
    });
  });

  it('standard deviation normal', function() {
    const math = require('mathjs');

    // Can pass an array to the `stddev()` function:
    math.std([5, 5, 5, 5]); // 0

    // Or a list of arguments (also called a "spread")
    math.std(1, 5, 9); // 4
    // acquit:ignore:start
    assert.equal(math.std([5, 5, 5, 5]), 0);
    assert.equal(math.std(1, 5, 9), 4);
    // acquit:ignore:end
  });

  it('standard deviation uncorrected', function() {
    const math = require('mathjs');

    // Must pass an array if you're using options
    math.std([1, 3], 'uncorrected'); // 1
    math.std([2, 4, 6, 8], 'biased'); // 2
    // acquit:ignore:start
    assert.equal(math.std([1, 3], 'uncorrected'), 1);
    assert.equal(math.std([2, 4, 6, 8], 'biased'), 2);
    // acquit:ignore:end
  });

  describe('toLocaleString', function() {
    it('basic', function() {
      // No 'Z' at the end means JavaScript will use the server's timezone
      // as opposed to UTC.
      const date = new Date('2019-06-01T00:00:00.000');

      // "Sat, June 01, 2019"
      date.toLocaleString('en-US', {
        weekday: 'short', // "Sat"
        month: 'long', // "June"
        day: '2-digit', // "01"
        year: 'numeric' // "2019"
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }), 'Sat, June 01, 2019');
      // acquit:ignore:end
    });

    it('vs toLocaleDateString', function() {
      const date = new Date('2019-06-01T08:00:00.000');

      // "6/1/2019, 8:00:00 AM"
      date.toLocaleString('en-US');
      // "6/1/2019" with no time portion
      date.toLocaleDateString();

      // But you can still include `hours` and `minutes` using options
      // with `toLocaleDateString()`.
      date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit'
      }); // "June 01, 2019, 8 AM"
      // acquit:ignore:start
      assert.equal(date.toLocaleString('en-US'), '6/1/2019, 8:00:00 AM');
      assert.equal(date.toLocaleDateString('en-US'), '6/1/2019');
      assert.equal(date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit'
      }), 'June 01, 2019, 8 AM');
      // acquit:ignore:end
    });

    it('timezone', function() {
      const date = new Date('2019-06-01T08:00:00.000Z');
      // "June 01, 2019, 2 AM"
      date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        timeZone: 'America/Denver' // 6 hours behind UTC
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        timeZone: 'America/Denver'
      }), 'June 01, 2019, 2 AM');
      // acquit:ignore:end
    });

    it('yyyy-mm-dd', function() {
      const date = new Date('2019-06-01T00:00:00.000');
      // "June 01, 2019, 2 AM"
      date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }), '2019-06-01');
      // acquit:ignore:end
    });
  });

  describe('in vs hasOwnProperty', function() {
    it('basics', function() {
      const obj = { answer: 42 };
      'answer' in obj; // true
      obj.hasOwnProperty('answer'); // true

      'does not exist' in obj; // false
      obj.hasOwnProperty('does not exist'); // false
      // acquit:ignore:start
      assert.ok('answer' in obj);
      assert.ok(obj.hasOwnProperty('answer'));

      assert.ok(!('does not exist' in obj));
      assert.ok(!obj.hasOwnProperty('does not exist'));

      assert.ok('constructor' in obj);
      assert.ok(!obj.hasOwnProperty('constructor'));
      // acquit:ignore:end
    });

    it('special properties', function() {
      // acquit:ignore:start
      const obj = { answer: 42 };
      // acquit:ignore:end
      'constructor' in obj; // true
      '__proto__' in obj; // true
      'hasOwnProperty' in obj; // true

      obj.hasOwnProperty('constructor'); // false
      obj.hasOwnProperty('__proto__'); // false
      obj.hasOwnProperty('hasOwnProperty'); // false
      // acquit:ignore:start
      assert.ok('constructor' in obj);
      assert.ok(!obj.hasOwnProperty('constructor'));

      assert.ok('__proto__' in obj);
      assert.ok(!obj.hasOwnProperty('__proto__'));

      assert.ok('hasOwnProperty' in obj);
      assert.ok(!obj.hasOwnProperty('hasOwnProperty'));
      // acquit:ignore:end
    });

    it('inheritance', function() {
      class BaseClass {
        get baseProp() {
          return 42;
        }
      }
      class ChildClass extends BaseClass {
        get childProp() {
          return 42;
        }
      }
      const base = new BaseClass();
      const child = new ChildClass();

      'baseProp' in base; // true
      'childProp' in child; // true
      'baseProp' in child; // true

      base.hasOwnProperty('baseProp'); // false
      child.hasOwnProperty('childProp'); // false
      child.hasOwnProperty('baseProp'); // false
      // acquit:ignore:start
      assert.ok('baseProp' in base);
      assert.ok(!base.hasOwnProperty('baseProp'));

      assert.ok('childProp' in child);
      assert.ok(!child.hasOwnProperty('childProp'));

      assert.ok('baseProp' in child);
      assert.ok(!child.hasOwnProperty('baseProp'));
      // acquit:ignore:end
    });

    it('symbols', function() {
      const symbol = Symbol('answer');
      const obj = { [symbol]: 42 };

      symbol in obj; // true
      obj.hasOwnProperty(symbol); // true
      // acquit:ignore:start
      assert.ok(symbol in obj);
      assert.ok(obj.hasOwnProperty(symbol));
      // acquit:ignore:end
    });
  });

  describe('forEach', function() {
    let called = [];

    beforeEach(function() {
      called = [];
      sinon.stub(console, 'log').callsFake(msg => called.push(msg));
    });

    afterEach(function() {
      console.log.restore();
    });

    it('example 1', function() {
      ['a', 'b', 'c'].forEach(v => {
        console.log(v);
      });
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['a', 'b', 'c']);
      // acquit:ignore:end
    });

    it('example 2', function() {
      const arr = ['a', 'b', 'c'];
      arr.forEach((v, i) => {
        arr[i] = v.toUpperCase();
      });
      arr; // ['A', 'B', 'C']
      // acquit:ignore:start
      assert.deepStrictEqual(arr, ['A', 'B', 'C']);
      // acquit:ignore:end
    });

    it('example 3', function() {
      const obj = {
        a: 1,
        b: 2,
        c: 3
      };

      // Prints "a", "b", "c"
      Object.keys(obj).forEach(key => console.log(key));
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['a', 'b', 'c']);
      // acquit:ignore:end
    });

    it('example 4', function() {
      const obj = {
        a: 1,
        b: 2,
        c: 3
      };

      // Prints "a 1", "b 2", "c 3"
      Object.entries(obj).forEach(([key, value]) => {
        console.log(key + ' ' + value)
      });
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['a 1', 'b 2', 'c 3']);
      // acquit:ignore:end
    });

    it('example 5', function() {
      const arr = ['a', ['b', 'c'], [['d', ['e']]]];

      // Prints "a", "b", "c", "d", "e". `3` is the maximum depth for flattening
      arr.flat(3).forEach(v => console.log(v));
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['a', 'b', 'c', 'd', 'e']);
      // acquit:ignore:end
    });

    it('example 6', function() {
      const arr = ['a', 'b', 'c'];

      // Prints "a", "b", "c", even though each callback invocation adds
      // a new element to the array.
      arr.forEach(v => {
        arr.push(v.toUpperCase());
        console.log(v);
      });
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['a', 'b', 'c']);
      // acquit:ignore:end
    });

    it('example 7', function() {
      const arr = ['a', 'b', 'c'];

      class Stack {
        constructor() {
          this._arr = [];
        }

        push(v) {
          this._arr.push(v);
        }

        pop() {
          return this._arr.pop();
        }
      }

      const stack = new Stack();
      // Without `thisArg`, would throw an error
      arr.forEach(stack.push, stack);
      // Equivalent:
      arr.forEach(v => stack.push(v));
      // Also equivalent:
      arr.forEach(stack.push.bind(stack));
      // acquit:ignore:start
      assert.deepEqual(stack._arr, ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']);
      // acquit:ignore:end
    });

    it('example 8', function() {
      const arr = ['a',, 'c'];
      
      // Prints "a", "c"
      arr.forEach(v => console.log(v));

      // Prints "a", "undefined", "c". `Array.from()` removes holes
      Array.from(arr).forEach(v => console.log(v));
      // acquit:ignore:start
      assert.deepStrictEqual(called, ['a', 'c', 'a', void 0, 'c']);
      // acquit:ignore:end
    });
  });

  it('String#includes', function() {
    const str = 'Arya Stark';

    str.includes('Stark'); // true
    str.includes('Snow'); // false
    // acquit:ignore:start
    assert.ok(str.includes('Stark'));
    assert.ok(!str.includes('Snow'));
    // acquit:ignore:end
  });

  it('String#indexOf', function() {
    const str = 'Arya Stark';

    str.indexOf('Stark') !== -1; // true
    str.indexOf('Snow') !== -1; // false
    // acquit:ignore:start
    assert.ok(str.indexOf('Stark') !== -1);
    assert.ok(!str.indexOf('Snow') !== -1);
    // acquit:ignore:end
  });

  it('case insensitive', function() {
    const str = 'arya stark';

    // The most concise way to check substrings ignoring case is using
    // `String#match()` and a case-insensitive regular expression (the 'i')
    str.match(/Stark/i); // true
    str.match(/Snow/i); // false

    // You can also convert both the string and the search string to lower case.
    str.toLowerCase().includes('Stark'.toLowerCase()); // true
    str.toLowerCase().indexOf('Stark'.toLowerCase()) !== -1; // true

    str.toLowerCase().includes('Snow'.toLowerCase()); // false
    str.toLowerCase().indexOf('Snow'.toLowerCase()) !== -1; // false
    // acquit:ignore:start
    assert.ok(str.toLowerCase().includes('Stark'.toLowerCase()));
    assert.ok(str.toLowerCase().indexOf('Stark'.toLowerCase()) !== -1);

    assert.ok(!str.toLowerCase().includes('Snow'.toLowerCase()));
    assert.ok(!str.toLowerCase().indexOf('Snow'.toLowerCase()) !== -1);

    assert.ok(str.match(/Stark/i));
    assert.ok(!str.match(/Snow/i));
    // acquit:ignore:end
  });

  describe('string compare', function() {
    it('equality', function() {
      const str1 = '1st string';
      const str2 = str1;
      const str3 = '2nd string';

      str1 === str2; // true
      str1 === str3; // false

      // Always use `===`, because `==` can have some surprises
      '1' == 1; // true
      '2' == 2; // true
      // acquit:ignore:start
      assert.ok(str1 === str2);
      assert.ok(str1 !== str3);
      assert.ok('1' == 1);
      assert.ok('2' == 2);
      // acquit:ignore:end
    });

    it('comparison', function() {
      const str1 = '0';
      const str2 = 'A';
      const str3 = 'Z';
      const str4 = 'a';

      str1 < str2; // true
      str2 < str3; // true
      str3 < str4; // true
      // acquit:ignore:start
      assert.ok(str1 < str2);
      assert.ok(str2 < str3);
      assert.ok(str3 < str4);
      // acquit:ignore:end
    });

    it('compare longer strings', function() {
      // Empty string '' is `<` all other strings
      const str1 = '';
      const str2 = 'A';
      const str3 = 'A1';
      const str4 = 'Z0';

      str1 < str2; // true
      str2 < str3; // true
      str3 < str4; // true
      // acquit:ignore:start
      assert.ok(str1 < str2);
      assert.ok(str2 < str3);
      assert.ok(str3 < str4);
      // acquit:ignore:end
    });

    it('non-strings', function() {
      1 < 'A'; // false
      'A' < 1; // false

      null < 'A'; // false
      'A' < null; // false

      undefined < 'A'; // false
      'A' < undefined; // false
      // acquit:ignore:start
      assert.ok(!(1 < 'A'));
      assert.ok(!('A' < 1));

      assert.ok(!(null < 'A'));
      assert.ok(!('A' < null));
      assert.ok(!(null > 'A'));
      assert.ok(!('A' > null));

      assert.ok(!(undefined < 'A'));
      assert.ok(!('A' < undefined));
      assert.ok(!(undefined > 'A'));
      assert.ok(!('A' > undefined));
      // acquit:ignore:end
    });

    it('sort', function() {
      const arr = [null, '', '0', 'A', 'Z', 'a'];
      arr.sort();
      // [ '', '0', 'A', 'Z', 'a', null ]
      arr;
      // acquit:ignore:start
      assert.deepEqual(arr, [ '', '0', 'A', 'Z', 'a', null ]);
      // acquit:ignore:end
    });

    it('lte', function() {
      '1' <= 1; // true
      // acquit:ignore:start
      assert.ok('1' <= 1);
      // acquit:ignore:end
    });
  });

  describe('Map', function() {
    it('get/set keys', function() {
      const map = new Map();

      map.get('answer'); // undefined
      map.has('answer'); // false
      // acquit:ignore:start
      assert.strictEqual(map.get('answer'), undefined);
      assert.ok(!map.has('answer'));
      // acquit:ignore:end

      map.set('answer', 42);

      map.get('answer'); // 42
      map.has('answer'); // true
      // acquit:ignore:start
      assert.equal(map.get('answer'), 42);
      assert.ok(map.has('answer'));
      // acquit:ignore:end
    });

    it('special properties', function() {
      const obj = {};
      const map = new Map();

      obj.answer = 42;
      map.set('answer', 42);

      'answer' in obj; // true
      map.has('answer'); // true
      // acquit:ignore:start
      assert.ok('answer' in obj);
      assert.ok(map.has('answer'));
      // acquit:ignore:end

      'prototype' in obj; // true
      map.has('prototype'); // false

      '__proto__' in obj; // true
      map.has('constructor'); // false
      // acquit:ignore:start
      assert.ok('__proto__' in obj);
      assert.ok(!map.has('prototype'));

      assert.ok('constructor' in obj);
      assert.ok(!map.has('constructor'));
      // acquit:ignore:end
    });

    it('arbitrary types', function() {
      const map = new Map();

      const date = new Date('2019-06-01');

      map.set(date, 'test1');
      map.set(date.toString(), 'test2');

      map.get(date); // 'test1'
      map.get(date.toString()); // 'test2'
      // acquit:ignore:start
      assert.equal(map.get(date), 'test1');
      assert.equal(map.get(date.toString()), 'test2');
      // acquit:ignore:end

      const obj = {};
      obj[date] = 'test1';
      obj[date.toString()] = 'test2';
      obj[date]; // 'test2', because JavaScript converts object keys to strings
      // acquit:ignore:start
      assert.equal(obj[date], 'test2');
      // acquit:ignore:end
    });

    it('map constructor', function() {
      const date = new Date('2019-06-01');
      const map1 = new Map([
        ['answer', 42],
        [date, 'test1']
      ]);

      map1.get('answer'); // 42
      map1.get(date); // test1
      // acquit:ignore:start
      assert.equal(map1.get('answer'), 42);
      assert.equal(map1.get(date), 'test1');
      // acquit:ignore:end

      // If you pass `map1` to the Map constructor, JavaScript will create a
      // copy of `map1`
      const map2 = new Map(map1);
      map2.get('answer'); // 42
      map2.get(date); // test1

      map2.set('hello', 'world');
      map1.get('hello'); // undefined
      // acquit:ignore:start
      assert.equal(map2.get('answer'), 42);
      assert.equal(map2.get(date), 'test1');
      assert.ok(!map1.has('hello'));
      // acquit:ignore:end
    });

    it('from object', function() {
      const obj = { answer: 42 };

      // acquit:ignore:start
      try {
      // acquit:ignore:end
      // This throws an error because objects are **not** iterable
      // "TypeError: undefined is not a function"
      new Map(obj);
      // acquit:ignore:start
      } catch (err) {
        assert.equal(err.message, 'undefined is not a function');
      }
      // acquit:ignore:end

      // Works, you need to use `Object.entries()` to convert the object
      // to a key/value array
      const map = new Map(Object.entries(obj));
      map.get('answer'); // 42
      // acquit:ignore:start
      assert.equal(map.get('answer'), 42);
      // acquit:ignore:end
    });

    it('iterate', function() {
      const map = new Map([
        ['key1', 1],
        ['key2', 2],
        ['key3', 3]
      ]);

      for (const key of map.keys()) {
        // 'key1', 'key2', 'key3'
        key;
      }
      // acquit:ignore:start
      assert.deepEqual(Array.from(map.keys()), ['key1', 'key2', 'key3']);
      // acquit:ignore:end

      for (const [key, value] of map.entries()) {
        // 'key1', 'key2', 'key3'
        key;
        // 1, 2, 3
        value;
      }
      // acquit:ignore:start
      assert.deepEqual(Array.from(map.entries()),
        [['key1', 1], ['key2', 2], ['key3', 3]]);
      // acquit:ignore:end
    });
  });

  describe('sort', function() {
    it('numbers forward', function() {
      const arr = [3, 20, 100];

      arr.sort((a, b) => a - b);
      arr; // [3, 20, 100]
      // acquit:ignore:start
      assert.deepEqual(arr, [3, 20, 100]);
      // acquit:ignore:end
    });

    it('numbers reverse', function() {
      const arr = [20, 3, 100];

      arr.sort((a, b) => b - a);
      arr; // [100, 20, 3]
      // acquit:ignore:start
      assert.deepEqual(arr, [100, 20, 3]);
      // acquit:ignore:end
    });

    it('lastName', function() {
      const characters = [
        { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
        { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
      ];

      characters.sort((a, b) => {
        if (a === b) {
          return 0;
        }
        return a.lastName < b.lastName ? -1 : 1;
      });

      // La Forge, Picard, Riker
      characters;
      // acquit:ignore:start
      assert.deepEqual(characters.map(c => c.lastName),
        ['La Forge', 'Picard', 'Riker']);
      // acquit:ignore:end
    });

    it('age', function() {
      const characters = [
        { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
        { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
      ];

      characters.sort((a, b) => a.age - b.age);

      // Riker, La Forge, Picard
      characters;
      // acquit:ignore:start
      assert.deepEqual(characters.map(c => c.lastName),
        ['Riker', 'La Forge', 'Picard']);
      // acquit:ignore:end
    });

    it('rank', function() {
      const characters = [
        { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
        { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
      ];

      const rankOrder = new Map([
        ['Captain', 1],
        ['Commander', 2],
        ['Lieutenant', 3]
      ]);

      characters.sort((a, b) => {
        return rankOrder.get(a.rank) - rankOrder.get(b.rank);
      });

      // Picard, Riker, La Forge
      characters;
      // acquit:ignore:start
      assert.deepEqual(characters.map(c => c.lastName),
        ['Picard', 'Riker', 'La Forge']);
      // acquit:ignore:end
    });
  });

  describe('typeof', function() {
    it('with basic values', function() {
      typeof 42; // 'number'
      typeof 'test'; // 'string'
      typeof true; // 'boolean'
      typeof (void 0); // 'undefined'
      typeof BigInt('1234'); // 'bigint'
      typeof Symbol('foo'); // 'symbol'
      typeof ({ answer: 42 }); // 'object'

      // As far as `typeof` is concerned, all objects are the same.
      class MyClass {}
      typeof (new MyClass()); // 'object'
      // acquit:ignore:start
      assert.equal(typeof 42, 'number');
      assert.equal(typeof 'test', 'string');
      assert.equal(typeof true, 'boolean');
      assert.equal(typeof (void 0), 'undefined');
      assert.equal(typeof ({ answer: 42 }), 'object');
      assert.equal(typeof BigInt('1234'), 'bigint');
      assert.equal(typeof Symbol('foo'), 'symbol');

      assert.equal(typeof (new MyClass()), 'object');
      // acquit:ignore:end
    });
  });

  describe('String#replace()', function() {
    it('basic', function() {
      const str = 'A penny saved is a penny earned';

      // "A dollar saved is a dollar earned"
      str.replace(/penny/g, 'dollar');

      // "A dollar saved is a penny earned" - only replaces the first
      // instance by default.
      str.replace('penny', 'dollar');
      // acquit:ignore:start
      assert.equal(str.replace(/penny/g, 'dollar'),
        'A dollar saved is a dollar earned');
      assert.equal(str.replace('penny', 'dollar'),
        'A dollar saved is a penny earned');
      // acquit:ignore:end
    });
  });

  describe('substring()', function() {
    it('with 2 args', function() {
      const str = 'Twas the night before Christmas';

      let indexStart = 0;
      let indexEnd = 4;
      str.substring(indexStart, indexEnd); // 'Twas'

      str.substring(5, 14); // 'the night'
      // acquit:ignore:start
      assert.equal(str.substring(0, 4), 'Twas');
      assert.equal(str.substring(5, 14), 'the night');
      // acquit:ignore:end
    });

    it('with 1 arg', function() {
      // acquit:ignore:start
      const str = 'Twas the night before Christmas';
      // acquit:ignore:end
      str.substring(5); // 'the night before Christmas'
      // acquit:ignore:start
      assert.equal(str.substring(5), 'the night before Christmas');
      // acquit:ignore:end
    });

    it('with negative', function() {
      // acquit:ignore:start
      const str = 'Twas the night before Christmas';
      // acquit:ignore:end
      str.substring(4, -1); // 'Twas'
      // acquit:ignore:start
      assert.equal(str.substring(4, -1), 'Twas');
      // acquit:ignore:end
    });
  });

  describe('substr', function() {
    it('with 2 args', function() {
      const str = 'Twas the night before Christmas';

      let start = 0;
      let length = 4;
      // If `start === 0`, `substr()` and `substring()` are equivalent
      str.substr(start, length); // 'Twas'

      str.substr(5, 9); // 'the night'
      'the night'.length; // 9
      // acquit:ignore:start
      assert.equal(str.substr(0, 4), 'Twas');
      assert.equal(str.substr(5, 9), 'the night');
      assert.equal('the night'.length, 9);
      // acquit:ignore:end
    });

    it('with negative', function() {
      const str = 'Twas the night before Christmas';

      let start = -9;
      let length = 9;
      str.substr(start, length); // 'Christmas'

      'Christmas'.length; // 9
      // acquit:ignore:start
      assert.equal(str.substr(-9, 9), 'Christmas');
      assert.equal('Christmas'.length, 9);
      // acquit:ignore:end
    });
  });

  describe('String#slice', function() {
    it('works', function() {
      const str = 'Twas the night before Christmas';

      str.slice(0, 4); // Twas
      str.slice(5, 14); // the night
      str.slice(-16, -10); // before
      str.slice(-9); // Christmas
      // acquit:ignore:start
      assert.equal(str.slice(0, 4), 'Twas');
      assert.equal(str.slice(5, 14), 'the night');
      assert.equal(str.slice(-16, -10), 'before');
      assert.equal(str.slice(-9), 'Christmas');
      // acquit:ignore:end
    });
  });

  describe('Array#splice', function() {
    it('remove', function() {
      const arr = ['a', 'b', 'c', 'd'];

      // Remove 1 element starting at index 2
      arr.splice(2, 1);

      arr; // ['a', 'b', 'd']
      // acquit:ignore:start
      assert.deepEqual(arr, ['a', 'b', 'd']);
      // acquit:ignore:end
    });

    it('vs filter', function() {
      const arr = ['a', 'b', 'c', 'd'];

      // Remove 1 element starting at index 2
      const arr2 = arr.filter((v, i) => i !== 2);

      // `arr` still has 'c', because `filter()` doesn't modify the array
      // in place. On the other hand, `splice()` modifies the array in place.
      arr; // ['a', 'b', 'c', 'd']
      arr2; // ['a', 'b', 'd']
      arr2 === arr; // false
      // acquit:ignore:start
      assert.deepEqual(arr, ['a', 'b', 'c', 'd']);
      assert.deepEqual(arr2, ['a', 'b', 'd']);
      assert.ok(arr !== arr2);
      // acquit:ignore:end
    });

    it('add', function() {
      const arr = ['a', 'b', 'd'];

      let start = 2;
      let deleteCount = 0;
      arr.splice(start, deleteCount, 'c');

      arr; // ['a', 'b', 'c', 'd'];
      // acquit:ignore:start
      assert.deepEqual(arr, ['a', 'b', 'c', 'd']);
      // acquit:ignore:end
    });
  });

  describe('Object.keys', function() {
    it('basic', function() {
      const obj = {
        name: 'Jean-Luc Picard',
        age: 59,
        rank: 'Captain'
      };
      Object.keys(obj); // ['name', 'age', 'rank']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['name', 'age', 'rank']);
      // acquit:ignore:end
    });

    it('order', function() {
      const obj = {
        name: 'Jean-Luc Picard',
        age: 59
      };

      obj.rank = 'Captain';
      Object.keys(obj); // ['name', 'age', 'rank']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['name', 'age', 'rank']);
      // acquit:ignore:end

      delete obj.age;
      obj.age = 59;
      Object.keys(obj); // ['name', 'rank', 'age']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['name', 'rank', 'age']);
      // acquit:ignore:end
    });

    it('numeric', function() {
      const obj = {
        name: 'Jean-Luc Picard',
        rank: 'Captain',
        1: 'test',
        100: 'test',
        10: 'test'
      };

      Object.keys(obj); // ['1', '10', '100', 'name', 'rank']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['1', '10', '100', 'name', 'rank']);
      // acquit:ignore:end
    });

    it('ES6 class', function() {
      class Character {
        get show() { return 'Star Trek: The Next Generation'; }

        firstName() {
          return this.name.slice(0, this.name.indexOf(' '));
        }
      }

      const obj = new Character();
      Object.assign(obj, {
        name: 'Jean-Luc Picard',
        age: 59,
        rank: 'Captain'
      });

      obj.show; // 'Star Trek: The Next Generation'
      obj.firstName(); // 'Jean-Luc'

      // `show` and `firstName` are **not** own properties, because they're
      // from the class
      Object.keys(obj); // ['name', 'age', 'rank']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['name', 'age', 'rank']);
      // acquit:ignore:end

      // But if you overwrite a class property, it becomes an own property.
      obj.firstName = () => 'test';
      Object.keys(obj); // ['name', 'age', 'rank', 'firstName']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['name', 'age', 'rank', 'firstName']);
      // acquit:ignore:end
    });

    it('symbols', function() {
      const rankSymbol = Symbol('rank');

      const obj = {
        name: 'Jean-Luc Picard',
        age: 59,
        [rankSymbol]: 'Captain'
      };

      Object.keys(obj); // ['name', 'age']
      // acquit:ignore:start
      assert.deepEqual(Object.keys(obj), ['name', 'age']);
      // acquit:ignore:end
      Object.getOwnPropertySymbols(obj); // [ Symbol(rank) ]
      // acquit:ignore:start
      assert.deepEqual(Object.getOwnPropertySymbols(obj).map(v => v.toString()),
        ['Symbol(rank)']);
      // acquit:ignore:end
    });
  });

  it('promisify', async function() {
    function myCallbackBasedFunction(callback) {
      setTimeout(() => callback(null, 'Hello, World!'), 25);
    }

    const util = require('util');
    const myPromiseBasedFunction =
      util.promisify(myCallbackBasedFunction);

    await myPromiseBasedFunction(); // 'Hello, World!'
    // acquit:ignore:start
    assert.equal(await myPromiseBasedFunction(), 'Hello, World!');
    // acquit:ignore:end
  });

  describe('freeze', function() {
    it('vs const', function() {
      const obj = { answer: 42 };

      // Even though `obj` is declared with `const`, you can modify
      // any properties of `obj`.
      obj.answer = 43;
      ++obj.answer;
      obj.otherProperty = 'test';
      Object.assign(obj, { anotherProperty: 'test2' });

      // You **cannot** overwrite `obj` by assigning to it. This code
      // throws an error "assignment to constant variable"
      // acquit:ignore:start
      assert.throws(function() {
      // acquit:ignore:end
      obj = { answer: 41 };
      // acquit:ignore:start
      }, /Assignment to constant variable/);
      // acquit:ignore:end
    });

    it('basic', function() {
      const obj = Object.freeze({ answer: 42 });

      // Since `obj` is frozen, modifying any of its existing
      // properties or adding a new property throws an error:
      // "Cannot assign to read only property 'answer' of object '#<Object>'"
      // acquit:ignore:start
      assert.throws(function() {
      // acquit:ignore:end
      obj.answer = 43;
      // acquit:ignore:start
      }, /Cannot assign to read only property 'answer' of object '#<Object>'/);
      // acquit:ignore:end
    });

    it('nested', function() {
      const obj = Object.freeze({ nested: { answer: 42 } });

      // Does **not** throw an error. `obj` is a frozen object,
      // but `nested` is not.
      obj.nested.answer = 43;
    });
  });

  describe('arrow functions', function() {
    it('no curly braces', function() {
      // 'getAnswer()` is an arrow function that returns 42
      const getAnswer = () => 42;

      getAnswer(); // 42
      // acquit:ignore:start
      assert.equal(getAnswer(), 42);
      // acquit:ignore:end
    });

    it('with curly braces', function() {
      // 'getAnswer()` is an arrow function that returns 42
      const getAnswer = () => {
        return 42;
      };

      getAnswer(); // 42
      // acquit:ignore:start
      assert.equal(getAnswer(), 42);
      // acquit:ignore:end
    });

    it('if without curly brace', function() {
      let answer = 42;
      // Without curly braces, the arrow function can only contain one
      // expression. The below function works fine, but you can't use
      // an `if` statement without curly braces.
      const getAnswer = () => answer !== null && answer !== undefined ?
        answer :
        0;

      getAnswer(); // 42
      // acquit:ignore:start
      assert.equal(getAnswer(), 42);
      // acquit:ignore:end
    });

    it('params', function() {
      // If your arrow function takes no params, declare it with
      // `() =>`
      const getAnswer = () => 42;

      // If your arrow function takes 1 param, you can omit the
      // parentheses around the parameter names
      let noop = v => v;
      // Or, equivalently:
      noop = (v) => v;

      // If your arrow function takes more than 1 param, you must
      // put parentheses around the parameter names
      const add = (a, b) => a + b;

      // acquit:ignore:start
      assert.equal(getAnswer(), 42);
      assert.equal(noop(42), 42);
      assert.equal(add(21, 21), 42);
      // acquit:ignore:end
    });

    it('class no arrow', async function() {
      // acquit:ignore:start
      let messages = [];
      // acquit:ignore:end
      class MyClass {
        constructor(message) {
          this.message = message;
        }

        print() {
          setTimeout(function() {
            // undefined, because `this` is a `Timeout` object in
            // a `setTimeout()` callback
            this.message;
            // acquit:ignore:start
            messages.push(this.message);
            // acquit:ignore:end
          }, 100);
        }
      }

      const obj = new MyClass('Hello, World');
      obj.message; // 'Hello, World'
      obj.print();
      // acquit:ignore:start
      await new Promise(resolve => setTimeout(resolve, 200));
      assert.deepEqual(messages, [void 0]);
      // acquit:ignore:end
    });

    it('class with arrow', async function() {
      // acquit:ignore:start
      let messages = [];
      // acquit:ignore:end
      class MyClass {
        constructor(message) {
          this.message = message;
        }

        print() {
          setTimeout(() => {
            // 'Hello, World'
            this.message;
            // acquit:ignore:start
            messages.push(this.message);
            // acquit:ignore:end
          }, 100);
        }
      }

      const obj = new MyClass('Hello, World');
      obj.message; // 'Hello, World'
      obj.print();
      // acquit:ignore:start
      await new Promise(resolve => setTimeout(resolve, 200));
      assert.deepEqual(messages, ['Hello, World']);
      // acquit:ignore:end
    });
  });

  describe('Array#includes', function() {
    it('basic example', function() {
      const arr = ['A', 'B', 'C'];

      arr.includes('B'); // true
      arr.includes('D'); // false
      // acquit:ignore:start
      assert.ok(arr.includes('B'));
      assert.ok(!arr.includes('D'));
      // acquit:ignore:end
    });

    it('NaN', function() {
      // Array contains 1 element, 'NaN'
      const arr = [parseInt('foo')];

      arr.includes(parseInt('foo')); // true
      arr.includes(NaN); // true
      arr.includes(Number.NaN); // true

      // The `===` operator has some quirks with NaN. `Array#includes()`
      // smooths out those rough edges.
      arr[0] === NaN; // false
      arr[0] === Number.NaN; // false
      // acquit:ignore:start
      assert.ok(arr.includes(parseInt('foo')));
      assert.ok(arr.includes(NaN));
      assert.ok(arr.includes(Number.NaN));

      assert.ok(!(arr[0] === NaN));
      assert.ok(!(arr[0] === Number.NaN));
      // acquit:ignore:end
    });
  });

  describe('Array#indexOf', function() {
    it('basic example', function() {
      const arr = ['A', 'B', 'C'];

      arr.indexOf('A'); // 0
      arr.indexOf('B'); // 1
      arr.indexOf('D'); // -1

      // To check whether an array contains a given value, you should use the
      // below check.
      arr.indexOf('D') !== -1; // false
      // acquit:ignore:start
      assert.equal(arr.indexOf('A'), 0);
      assert.equal(arr.indexOf('B'), 1);
      assert.equal(arr.indexOf('D'), -1);

      assert.ok(!(arr.indexOf('D') !== -1));
      // acquit:ignore:end
    });

    it('bitwise NOT', function() {
      const arr = ['A', 'B', 'C'];

      if (~arr.indexOf('A')) {
        // Runs
      }
      if (~arr.indexOf('D')) {
        // Does not run
        // acquit:ignore:start
        assert.ok(false);
        // acquit:ignore:end
      }
    });

    it('NaN', function() {
      // Array contains 1 element, 'NaN'
      const arr = [parseInt('foo')];

      arr.indexOf(NaN); // -1
      arr.indexOf(Number.NaN); // -1
      // acquit:ignore:start
      assert.equal(arr.indexOf(NaN), -1);
      assert.equal(arr.indexOf(Number.NaN), -1);
      // acquit:ignore:end
    });
  });

  describe('Array#push', function() {
    it('basic example', function() {
      const arr = ['A', 'B', 'C'];

      arr.push('D'); // 4
      arr; // ['A', 'B', 'C', 'D']
      // acquit:ignore:start
      assert.deepEqual(arr, ['A', 'B', 'C', 'D']);
      // acquit:ignore:end

      arr.push('E', 'F'); // 6
      arr; // ['A', 'B', 'C', 'D', 'E', 'F']
      // acquit:ignore:start
      assert.deepEqual(arr, ['A', 'B', 'C', 'D', 'E', 'F']);
      // acquit:ignore:end
    });

    it('another array', function() {
      const arr = ['A', 'B', 'C'];
      const arr2 = ['D', 'E'];

      arr.push(arr2); // 4
      arr; // ['A', 'B', 'C', ['D', 'E']]
      // acquit:ignore:start
      assert.deepEqual(arr, ['A', 'B', 'C', ['D', 'E']]);
      // acquit:ignore:end
    });

    it('spread', function() {
      const arr = ['A', 'B', 'C'];
      const arr2 = ['D', 'E'];

      // Equivalent to `arr.push('D', 'E')`
      arr.push(...arr2); // 5
      arr; // ['A', 'B', 'C', 'D', 'E']
      // acquit:ignore:start
      assert.deepEqual(arr, ['A', 'B', 'C', 'D', 'E']);
      // acquit:ignore:end
    });
  });

  describe('capitalize', function() {
    it('vanilla', function() {
      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      capitalize('dog'); // 'Dog'
      capitalize('cAT'); // 'CAT'
      // acquit:ignore:start
      assert.equal(capitalize('dog'), 'Dog'); // 'Dog'
      assert.equal(capitalize('cAT'), 'CAT'); // 'CAT'
      // acquit:ignore:end
    });

    it('lodash', function() {
      const _ = require('lodash');

      _.capitalize('dog'); // 'Dog'
      _.capitalize('cAT'); // 'Cat'
      // acquit:ignore:start
      assert.equal(_.capitalize('dog'), 'Dog'); // 'Dog'
      assert.equal(_.capitalize('cAT'), 'Cat'); // 'Cat'
      // acquit:ignore:end
    });
  });

  describe('concat', function() {
    it('plus', function() {
      const str = 'Hello' + ' ' + 'World';
      str; // 'Hello World'
      // acquit:ignore:start
      assert.equal(str, 'Hello World');
      // acquit:ignore:end
    });

    it('plus equals', function() {
      let str = 'Hello';
      str += ' ';
      str += 'World';
      str; // 'Hello World'
      // acquit:ignore:start
      assert.equal(str, 'Hello World');
      // acquit:ignore:end
    });

    it('null', function() {
      let str = 'Values: ';
      str += 42;
      str += ' ';

      str += {};
      str += ' ';

      str += null;

      str; // 'Values: 42 [object Object] null'
      // acquit:ignore:start
      assert.equal(str, 'Values: 42 [object Object] null');
      // acquit:ignore:end
    });

    describe('String#concat', function() {
      it('basic', function() {
        const str1 = 'Hello';
        const str2 = str1.concat(' ', 'World');

        // 'Hello'. Strings are immutable, so `concat()` does not modify `str1`
        str1;
        // 'Hello World'
        str2;
        // acquit:ignore:start
        assert.equal(str1, 'Hello');
        assert.equal(str2, 'Hello World');
        // acquit:ignore:end
      });

      it('null', function() {
        // If `str` is null or not a string, can't use `concat()`
        const str = 'Values: ';

        // 'Values: 42 null'
        str.concat(42, ' ', null);
        // acquit:ignore:start
        assert.equal(str.concat(42, ' ', null), 'Values: 42 null');
        // acquit:ignore:end
      });

      it('empty str', function() {
        ''.concat('Hello', ' ', 'World');
        // acquit:ignore:start
        assert.equal(''.concat('Hello', ' ', 'World'), 'Hello World');
        // acquit:ignore:end
      });
    });

    describe('Array#join', function() {
      it('basic', function() {
        ['Hello', ' ', 'World'].join(''); // 'Hello World'
        // acquit:ignore:start
        assert.equal(['Hello', ' ', 'World'].join(''), 'Hello World');
        // acquit:ignore:end
      });

      it('default separator', function() {
        ['a', 'b', 'c'].join(); // 'a,b,c'
        // acquit:ignore:start
        assert.equal(['a', 'b', 'c'].join(), 'a,b,c');
        // acquit:ignore:end
      });

      it('words', function() {
        // 'Twas the night before Christmas'
        ['Twas', 'the', 'night', 'before', 'Christmas'].join(' ');
        // acquit:ignore:start
        assert.equal(['Twas', 'the', 'night', 'before', 'Christmas'].join(' '),
          'Twas the night before Christmas');
        // acquit:ignore:end
      });

      it('url', function() {
        // 'masteringjs.io/tutorials/fundamentals/string-concat'
        ['masteringjs.io', 'tutorials', 'fundamentals', 'string-concat'].join('/');
        // acquit:ignore:start
        assert.equal(['masteringjs.io', 'tutorials', 'fundamentals', 'string-concat'].join('/'),
          'masteringjs.io/tutorials/fundamentals/string-concat');
        // acquit:ignore:end
      });
    });
  });

  describe('Object assign', function() {
    it('basic', function() {
      const source = { hello: 'world' };
      const target = {};

      // The first parameter is the target object, every subsequent parameter
      // is a source object.
      const ret = Object.assign(target, source);

      // `Object.assign()` modifies `target` in place, and returns `target`
      ret === target; // true
      target.hello; // 'World'
      // acquit:ignore:start
      assert.ok(ret === target);
      assert.equal(target.hello, 'world');
      // acquit:ignore:end
    });

    it('shallow copy', function() {
      const obj = { name: 'Jean-Luc Picard', age: 59 };

      // `Object.assign({}, obj)` is a common pattern that returns a shallow
      // clone of `obj`.
      const shallowCopy = Object.assign({}, obj);

      shallowCopy === obj; // false

      // Cloning the object means that changing `shallowCopy` doesn't affect `obj`
      shallowCopy.rank = 'Captain';
      obj.rank; // undefined
      // acquit:ignore:start
      assert.ok(!(shallowCopy === obj));
      assert.strictEqual(obj.rank, void 0);
      // acquit:ignore:end
    });

    it('multiple source', function() {
      const o1 = { a: 1, b: 1, c: 1 };
      const o2 = { a: 2, b: 2 };
      const o3 = { a: 3 };

      Object.assign(o1, o2, o3); // { a: 3, b: 2, c: 1 }
      // acquit:ignore:start
      assert.deepEqual(o1, { a: 3, b: 2, c: 1 });
      // acquit:ignore:end
    });
  });

  describe('shallow copy', function() {
    it('shallow', function() {
      const obj = { answer: 42 };
      // The `Object.assign()` function is a common way to shallow clone an object
      const copy = Object.assign({}, obj);

      ++copy.answer; // 43
      obj.answer; // 42, did not change because `copy` is a copy of `obj`
      // acquit:ignore:start
      assert.equal(copy.answer, 43);
      assert.equal(obj.answer, 42);
      // acquit:ignore:end
    });

    it('shallow limitation', function() {
      const obj = { name: { first: 'Jean-Luc', last: 'Picard' } };
      const copy = Object.assign({}, obj);

      copy.name.first = 'Johnny';
      obj.name.first; // 'Johnny', `name` was **not** cloned
      // acquit:ignore:start
      assert.equal(obj.name.first, 'Johnny');
      // acquit:ignore:end
    });

    it('json stringify', function() {
      const obj = { name: { first: 'Jean-Luc', last: 'Picard' } };
      const copy = JSON.parse(JSON.stringify(obj));

      copy.name.first = 'Johnny';
      obj.name.first; // 'Jean-Luc'
      // acquit:ignore:start
      assert.equal(obj.name.first, 'Jean-Luc');
      // acquit:ignore:end
    });

    it('json stringify date', function() {
      const obj = { date: new Date('2019-06-01') };
      const copy = JSON.parse(JSON.stringify(obj));

      obj.date instanceof Date; // true
      copy.date instanceof Date; // false, `date` is a string
      // acquit:ignore:start
      assert.equal(typeof copy.date, 'string');
      // acquit:ignore:end
    });
  });

  describe('prototype', function() {
    it('toString example', function() {
      const obj = {};
      obj.toString(); // '[object Object]'
      // acquit:ignore:start
      assert.equal(obj.toString(), '[object Object]');
      // acquit:ignore:end
    });

    it('instanceof example', function() {
      const obj = {};
      obj instanceof Object; // true
      obj.toString === Object.prototype.toString; // true
      // acquit:ignore:start
      assert.ok(obj instanceof Object);
      assert.ok(obj.toString === Object.prototype.toString);
      // acquit:ignore:end

      obj.toString = () => {};
      obj.toString === Object.prototype.toString; // false
      // acquit:ignore:start
      assert.ok(!(obj.toString === Object.prototype.toString));
      // acquit:ignore:end
    });

    it('add to prototype', function() {
      // Add a `getAnswer()` function to _all_ objects
      Object.prototype.getAnswer = function() { return 42 };

      const obj = {};
      obj.getAnswer(); // 42
      // acquit:ignore:start
      assert.equal(obj.getAnswer(), 42);
      delete Object.prototype.getAnswer;
      // acquit:ignore:end
    });

    it('MyClass prototype', function() {
      function MyClass() {}

      // Add a `getAnswer()` function to all instances of `MyClass`
      MyClass.prototype.getAnswer = function() { return 42; };

      const obj = new MyClass();
      obj.getAnswer(); // 42
      // acquit:ignore:start
      assert.equal(obj.getAnswer(), 42);
      // acquit:ignore:end
    });

    it('MyClass set prototype', function() {
      function MyClass() {}

      // Overwrite the entire prototype
      MyClass.prototype = {
        getAnswer: function() { return 42; }
      };

      const obj = new MyClass();
      obj.getAnswer(); // 42
      // acquit:ignore:start
      assert.equal(obj.getAnswer(), 42);
      // acquit:ignore:end
    });

    it('MyChildClass', function() {
      function MyClass() {}

      // Overwrite the entire prototype
      MyClass.prototype = {
        getAnswer: function() { return 42; }
      };

      function MyChildClass() {}
      MyChildClass.prototype = new MyClass();

      const obj = new MyChildClass();
      obj.getAnswer(); // 42

      // `obj` is an instance of `MyChildClass`, and `MyChildClass` inherits
      // from `MyClass`, which in turn inherits from `Object`.
      obj instanceof MyChildClass; // true
      obj instanceof MyClass; // true
      obj instanceof Object; // true
      // acquit:ignore:start
      assert.equal(obj.getAnswer(), 42);
      assert.ok(obj instanceof MyChildClass);
      assert.ok(obj instanceof MyClass);
      assert.ok(obj instanceof Object);
      // acquit:ignore:end
    });

    it('constructor prototype', function() {
      function MyClass() {}

      const obj = new MyClass();
      obj.constructor.prototype.getAnswer = function() { return 42; };

      const obj2 = new MyClass();
      obj2.getAnswer(); // 42
    });
  });

  describe('seal', function() {
    it('example', function() {
      const sealed = Object.seal({ answer: 42 });

      sealed.answer = 43; // OK

      // TypeError: Cannot delete property 'answer' of #<Object>
      // acquit:ignore:start
      assert.throws(() => {
      // acquit:ignore:end
      delete sealed.answer;
      // acquit:ignore:start
      }, /Cannot delete property/);
      // acquit:ignore:end

      // TypeError: Cannot add property newProp, object is not extensible
      // acquit:ignore:start
      assert.throws(() => {
      // acquit:ignore:end
      sealed.newProp = 42;
      // acquit:ignore:start
      }, /Cannot add property newProp/);
      // acquit:ignore:end

      // TypeError: Cannot redefine property: answer
      // acquit:ignore:start
      assert.throws(() => {
      // acquit:ignore:end
      Object.defineProperty(sealed, 'answer', { enumerable: false });
      // acquit:ignore:start
      }, /Cannot redefine property/);
      // acquit:ignore:end
    });

    it('vs freeze', function() {
      const sealed = Object.seal({ answer: 42 });
      const frozen = Object.freeze({ answer: 42 });

      sealed.answer = 43; // ok
      // TypeError: Cannot assign to read only property 'answer' of object '#<Object>'
      // acquit:ignore:start
      assert.throws(() => {
      // acquit:ignore:end
      frozen.answer = 43;
      // acquit:ignore:start
      }, /read only property 'answer'/);
      // acquit:ignore:end
    });
  });

  describe('JSON.stringify', function() {
    it('basic', function() {
      const obj = { answer: 42 };
      const arr = ['hello', 'world'];

      typeof JSON.stringify(obj); // 'string'

      JSON.stringify(obj); // '{"answer":42}'
      JSON.stringify(arr); // '["hello","world"]'
      // acquit:ignore:start
      assert.equal(JSON.stringify(obj), '{"answer":42}');
      assert.equal(JSON.stringify(arr), '["hello","world"]');
      // acquit:ignore:end
    });

    it('missing types', function() {
      let obj = { undef: undefined, symbol: Symbol('foo') };

      // JSON.stringify() ignores `undefined` and symbols
      JSON.stringify(obj); // '{}'
      // acquit:ignore:start
      assert.equal(JSON.stringify(obj), '{}');
      // acquit:ignore:end
    });

    it('dates', function() {
      // '{"date":"2019-06-01T00:00:00.000Z"}'
      JSON.stringify({ date: new Date('2019-06-01') });
      // acquit:ignore:start
      assert.equal(JSON.stringify({ date: new Date('2019-06-01') }),
        '{"date":"2019-06-01T00:00:00.000Z"}');
      // acquit:ignore:end
    });

    it('replacer', function() {
      const obj = { answer: 42, test: null };
      // '{"answer":42}'
      JSON.stringify(obj, function replacer(key, value) {
        if (value === null) {
          return undefined;
        }
        return value;
      });
      // acquit:ignore:start
      const str = JSON.stringify(obj, function replacer(key, value) {
        if (value === null) {
          return undefined;
        }
        return value;
      });
      assert.equal(str, '{"answer":42}');
      // acquit:ignore:end
    });

    it('space', function() {
      const obj = { firstName: 'Jean-Luc', lastName: 'Picard' };
      // {
      //   "firstName": "Jean-Luc",
      //   "lastName": "Picard"
      // }
      JSON.stringify(obj, null, '  ');
      // Equivalent, JavaScript treats `space=2` as equivalent to 2 spaces.
      JSON.stringify(obj, null, 2);
      // acquit:ignore:start
      assert.equal(JSON.stringify(obj, null, '  '), '{\n' +
        '  "firstName": "Jean-Luc",\n' +
        '  "lastName": "Picard"\n' +
        '}');
      // acquit:ignore:end
    });
  });

  describe('class', function() {
    it('basic example', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }
      }

      const obj = new Rectangle(3, 5);
      obj.height; // 3
      obj.width; // 5
      // acquit:ignore:start
      assert.equal(obj.height, 3);
      assert.equal(obj.width, 5);
      // acquit:ignore:end

      // The `instanceof` keyword is how you test whether an object was created
      // from a certain class.
      obj instanceof Rectangle; // true
      ({}) instanceof Rectangle; // false
      // acquit:ignore:start
      assert.ok(obj instanceof Rectangle);
      assert.ok(!(({}) instanceof Rectangle));
      // acquit:ignore:end
    });

    it('method', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }

        // To define a method named `methodName`, you put `methodName() {}` in
        // the class declaration.
        area() {
          return this.width * this.height;
        }
      }

      const obj = new Rectangle(3, 5);
      obj.area(); // 15
      // acquit:ignore:start
      assert.equal(obj.area(), 15);
      // acquit:ignore:end
    });

    it('static', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }

        // To define a static named `functionName`, you put
        // `static functionName() {}` in the class declaration.
        static createSquare(length) {
          return new Rectangle(length, length);
        }
      }

      const obj = Rectangle.createSquare(5);
      obj.height; // 5
      obj.width; // 5
      // acquit:ignore:start
      assert.equal(obj.height, 5);
      assert.equal(obj.width, 5);
      // acquit:ignore:end
    });

    it('getter', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }

        // To define a getter named `getterName`, put `get getterName() {}`
        // in the class definition. Getters are functions!
        get area() {
          return this.height * this.width;
        }
      }

      const obj = new Rectangle(3, 5);
      obj.area; // 15
      // acquit:ignore:start
      assert.equal(obj.area, 15);
      // acquit:ignore:end
    });

    it('setter', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }

        get height() {
          return this._height;
        }

        set height(v) {
          assert.ok(typeof v === 'number', 'Height must be a number');
          return v;
        }

        get width() {
          return this._width;
        }

        set width(v) {
          assert.ok(typeof v === 'number', 'Width must be a number');
          return v;
        }
      }

      const obj = new Rectangle(3, 5);

      // acquit:ignore:start
      assert.throws(() => {
      // acquit:ignore:end
      // Throws 'AssertionError: Height must be a number'
      obj.height = 'Not a number';
      // acquit:ignore:start
      }, /Height must be a number/);
      // acquit:ignore:end
    });

    it('inheritance', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }

        area() {
          return this.width * this.height;
        }
      }

      class Square extends Rectangle {
        constructor(length) {
          // `super` refers to the base class' constructor
          super(length, length);
        }

        // The radius of the inscribed circle
        // See: see http://mathworld.wolfram.com/Square.html
        inradius() {
          return this.height / 2;
        }
      }

      const obj = new Square(5);

      obj.area(); // 25, from `Rectangle` base class
      obj.inradius(); // 2.5, from `Square` class

      obj instanceof Square; // true
      obj instanceof Rectangle; // true
      // acquit:ignore:start
      assert.equal(obj.area(), 25);
      assert.equal(obj.inradius(), 2.5);
      assert.ok(obj instanceof Square);
      assert.ok(obj instanceof Rectangle);
      // acquit:ignore:end
    });

    it('prototype', function() {
      class Rectangle {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }
      }

      Rectangle.prototype.area = function area() {
        return this.width * this.height;
      };

      const obj = new Rectangle(3, 5);

      obj.area(); // 15
      // acquit:ignore:start
      assert.equal(obj.area(), 15);
      // acquit:ignore:end
    });
  });

  describe('instanceof', function() {
    it('inheritance', function() {
      class BaseClass {}
      class SubClass extends BaseClass {}

      const obj = new SubClass();

      obj instanceof SubClass; // true
      obj instanceof BaseClass; // true
      // acquit:ignore:start
      assert.ok(obj instanceof SubClass);
      assert.ok(obj instanceof BaseClass);
      // acquit:ignore:end
    });

    it('object class', function() {
      class MyClass {}

      const obj = new MyClass();

      obj instanceof Object; // true
      ({}) instanceof Object; // true
      null instanceof Object; // false
      // acquit:ignore:start
      assert.ok(obj instanceof Object);
      assert.ok(({}) instanceof Object);
      assert.ok(!(null instanceof Object));
      // acquit:ignore:end
    });

    it('not instanceof object', function() {
      // `Object.prototype` is not technically `instanceof Object` because
      // prototype chains must end somewhere
      typeof Object.prototype; // 'object'
      Object.prototype instanceof Object; // false

      // Setting a function's prototype to `Object.create(null)` means
      // `Object` won't be in the object's prototype chain.
      function MyClass() {}
      MyClass.prototype = Object.create(null);

      typeof new MyClass(); // 'object'
      (new MyClass()) instanceof Object; // false
      // acquit:ignore:start
      assert.equal(typeof Object.prototype, 'object');
      assert.ok(!(Object.prototype instanceof Object));

      assert.equal(typeof new MyClass(), 'object');
      assert.ok(!((new MyClass()) instanceof Object));
      // acquit:ignore:end
    });

    it('function', function() {
      class MyClass {}

      function MyOtherClass() {}

      const obj = {};

      obj instanceof MyClass; // false
      obj instanceof MyOtherClass; // false
      // acquit:ignore:start
      assert.throws(() => {
      // acquit:ignore:end

      // Throws "TypeError: Right-hand side of 'instanceof' is not callable"
      obj instanceof { answer: 42 };
      // acquit:ignore:start
      }, /Right-hand side of 'instanceof' is not callable/);
      // acquit:ignore:end
    });
  });

  describe('Promise', function() {
    it('basic example', async function() {
      const axios = require('axios');

      // `axios.get()` returns a promise representing an HTTP request.
      const promise = axios.get('https://httpbin.org/get?answer=42');

      // The `then()` function lets you register a callback that JavaScript
      // will call when the HTTP request succeeds.
      promise.then(res => {
        res.data.query.answer; // '42'
        // acquit:ignore:start
        assert.equal(res.data.query.answer, 42);
        // acquit:ignore:end
      });
    });

    it('onFulfilled and onRejected', async function() {
      // Create a promise that is immediately fulfilled with value 42.
      const promise = Promise.resolve(42);

      const onFulfilled = () => {};
      const onRejected = () => {};

      // JavaScript will call `onFulfilled` if the promise is fulfilled,
      // and `onRejected` if the promise is rejected.
      promise.then(onFulfilled, onRejected);
    });

    it('associated value', function() {
      // Create a promise that is immediately fulfilled with value 42.
      const promise = Promise.resolve(42);

      promise.then(value => {
        value; // 42
        // acquit:ignore:start
        assert.equal(value, 42);
        // acquit:ignore:end
      });
    });

    it('associated error', function() {
      // Create a promise that is immediately rejected with an error object
      const promise = Promise.reject(new Error('Oops!'));

      promise.then(null, err => {
        err.message; // 'Oops!'
        // acquit:ignore:start
        assert.equal(err.message, 'Oops!');
        // acquit:ignore:end
      });
    });

    it('constructor', function() {
      const promise = new Promise(function executor(resolve, reject) {
        // Fulfill the promise with value '42' after 100 ms.
        setTimeout(() => resolve(42), 100);
      });

      promise.then(value => {
        value; // 42
        // acquit:ignore:start
        assert.equal(value, 42);
        // acquit:ignore:end
      });
    });

    it('catch', function() {
      // Create a promise that is immediately rejected with an error object
      const promise = Promise.reject(new Error('Oops!'));

      // Equivalent to `.then(null, onRejected)`
      promise.catch(function onRejected() {
        err.message; // 'Oops!'
        // acquit:ignore:start
        assert.equal(err.message, 'Oops!');
        // acquit:ignore:end
      });
    });

    it('chain', function() {
      const init = Promise.resolve('Hello');
      const q = Promise.resolve('World');
      const p = init.then(() => q);

      p.then(value => {
        value; // 'World'
        // acquit:ignore:start
        assert.equal(value, 'World');
        // acquit:ignore:end
      });
    });

    it('catch chain', function(done) {
      Promise.resolve(1).
        then(() => Promise.resolve(2)).
        then(() => Promise.reject(new Error('Oops!'))).
        then(() => console.log('This will not print')).
        catch(function errorHandler(err) {
          err.message; // 'Oops!'
          // acquit:ignore:start
          assert.equal(err.message, 'Oops!');
          done();
          // acquit:ignore:end
        });
    });
  });

  describe('POJO', function() {
    it('create null', function() {
      // If you create an object `obj` with `{}`, `obj` is an instance of
      // the `Object` class, and so it has some built-in properties.
      let obj = {};
      obj.hasOwnProperty; // [Function]
      obj.constructor === Object; // true
      // acquit:ignore:start
      assert.strictEqual(obj.hasOwnProperty, Object.prototype.hasOwnProperty);
      assert.strictEqual(obj.constructor, Object);
      // acquit:ignore:end

      // On the other hand, `Object.create(null)` creates an object that
      // doesn't inherit from **any** class.
      obj = Object.create(null);
      typeof obj; // 'object'
      obj.hasOwnProperty; // undefined
      obj.constructor; // undefined

      obj.prop = 42;
      obj.prop; // 42
      // acquit:ignore:start
      assert.equal(typeof obj, 'object');
      assert.strictEqual(obj.hasOwnProperty, undefined);
      assert.strictEqual(obj.constructor, undefined);
      assert.equal(obj.prop, 42);
      // acquit:ignore:end
    });

    it('map stringify', function() {
      const map = new Map([['answer', 42]]);
      JSON.stringify(map); // '{}'
      // acquit:ignore:start
      assert.equal(JSON.stringify(map), '{}');
      // acquit:ignore:end
    });

    it('check if pojo', function() {
      function isPOJO(arg) {
        if (arg == null || typeof arg !== 'object') {
          return false;
        }
        const proto = Object.getPrototypeOf(arg);
        if (proto == null) {
          return true; // `Object.create(null)`
        }
        return proto === Object.prototype;
      }

      isPOJO({}); // true
      isPOJO(Object.create(null)); // true
      isPOJO(null); // false
      isPOJO(new Number(42)); // false
      // acquit:ignore:start
      assert.strictEqual(isPOJO({}), true); // true
      assert.strictEqual(isPOJO(Object.create(null)), true); // true
      assert.strictEqual(isPOJO(null), false); // false
      assert.strictEqual(isPOJO(new Number(42)), false); // false
      // acquit:ignore:end
    });
  });

  describe('Array#filter', function() {
    it('even/odd', function() {
      const numbers = [1, 2, 3, 4, 5, 6];

      let callback = v => v % 2 === 0;
      const even = numbers.filter(callback);
      even; // [2, 4, 6]
      // acquit:ignore:start
      assert.deepEqual(even, [2, 4, 6]);
      // acquit:ignore:end

      callback = v => v % 2 === 1;
      const odd = numbers.filter(callback);
      odd; // [1, 3, 5]
      // acquit:ignore:start
      assert.deepEqual(odd, [1, 3, 5]);
      // acquit:ignore:end
    });

    it('objects', function() {
      const people = [
        { name: 'Jean-Luc Picard', rank: 'Captain' },
        { name: 'Will Riker', rank: 'Commander' },
        { name: 'Geordi La Forge', rank: 'Lieutenant' }
      ];

      const filtered = people.filter(p => p.rank === 'Lieutenant');

      // Although `filtered` is a new array, it still points to
      // the same objects, so modifying an object in the filtered
      // array also affects the original array.
      filtered[0] === people[2]; // true
      filtered[0].rank = 'Lieutenant Commander';
      people[2].rank; // 'Lieutenant Commander'
      // acquit:ignore:start
      assert.strictEqual(filtered[0], people[2]);
      assert.equal(people[2].rank, 'Lieutenant Commander');
      // acquit:ignore:end
    });
  });

  describe('logical operators', function() {
    it('not', function() {
      // Falsy values means `!v === true`
      !false; // true
      !0; // true
      !''; // true
      !undefined; // true
      !null; // true
      !Number('abc'); // true
      // acquit:ignore:start
      assert.ok(!false);
      assert.ok(!0);
      assert.ok(!'');
      assert.ok(!undefined);
      assert.ok(!null);
      assert.ok(!Number('abc'));
      // acquit:ignore:end

      // All other values are "truthy", meaning `!v === false`
      !1; // true
      !({}); // true
      !({ valueOf: () => 0 }); // true
      !' '; // true
      // acquit:ignore:start
      assert.ok(!!1);
      assert.ok(!!({}));
      assert.ok(!!({ valueOf: () => 0 }));
      assert.ok(!!' ');
      // acquit:ignore:end
    });
  });

  describe('static', function() {
    it('function', function() {
      class MyClass {
        static myFunction() {
          return 42;
        }
      }

      typeof MyClass.myFunction; // 'function'
      MyClass.myFunction(); // 42
      // acquit:ignore:start
      assert.equal(MyClass.myFunction(), 42);
      // acquit:ignore:end

      // `myFunction()` is a function on `MyClass`, **not**
      // instances of `MyClass`
      const obj = new MyClass();
      obj.myFunction; // undefined
      // acquit:ignore:start
      assert.strictEqual(obj.myFunction, void 0);
      // acquit:ignore:end
    });

    it('assignment', function() {
      class MyClass {}
      MyClass.myFunction = function() {
        return 42;
      };

      MyClass.myFunction(); // 42
      // acquit:ignore:start
      assert.equal(MyClass.myFunction(), 42);
      // acquit:ignore:end
    });

    it('this', function() {
      class MyClass {
        static myFunction() {
          return this;
        }
      }

      MyClass.myFunction() === MyClass; // true
      // acquit:ignore:start
      assert.ok(MyClass.myFunction() === MyClass);
      // acquit:ignore:end
    });
  });

  describe('tomorrow', function() {
    it('getDate', function() {
      // June 3, 2019 in local timezone
      const date = new Date('2019/06/03');

      date.getDate(); // 3
      // acquit:ignore:start
      assert.equal(date.getDate(), 3);
      // acquit:ignore:end
    });

    it('setDate', function() {
      // June 3, 2019 in local timezone
      const date = new Date('2019/06/03');

      date.setDate(6);
      date.getDate(); // 6

      // "Thu, June 06, 2019"
      date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });
      // acquit:ignore:start
      assert.equal(date.getDate(), 6);
      assert.equal(date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }), 'Thu, June 06, 2019');
      // acquit:ignore:end
    });

    it('tomorrow', function() {
      // Current date
      const date = new Date();

      // Tomorrow's date
      date.setDate(date.getDate() + 1);
    });

    it('rollover', function() {
      const date = new Date('2019/06/30');

      // Tomorrow
      date.setDate(date.getDate() + 1);

      // "Mon, July 01, 2019"
      date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });
      // acquit:ignore:start
      assert.equal(date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }), 'Mon, July 01, 2019');
      // acquit:ignore:end
    });

    it('moment', function() {
      const date = moment(new Date('2019/06/30'));

      date.add(1, 'days');

      date.format('YYYY/MM/DD'); // "2019/07/01"
      // acquit:ignore:start
      assert.equal(date.format('YYYY/MM/DD'), '2019/07/01');
      // acquit:ignore:end
    });
  });

  describe('this', function() {
    it('flat object', function() {
      // `this` is an implicit parameter to the function
      const fn = function() {
        return this;
      };

      // One way that `this` is set is by attaching the function
      // to an object.
      const obj1 = { fn };
      const obj2 = { fn };

      obj1.fn() === obj1; // true
      obj1.fn() === obj2; // false

      obj2.fn() === obj1; // false
      obj2.fn() === obj2; // true
      // acquit:ignore:start
      assert.ok(obj1.fn() === obj1);
      assert.ok(obj1.fn() !== obj2);

      assert.ok(obj2.fn() !== obj1);
      assert.ok(obj2.fn() === obj2);
      // acquit:ignore:end
    });

    it('lost context', function() {
      const fn = function() {
        return this;
      };

      const obj = { fn };

      // If you call `fn()` without a property access `.`, you're
      // implicitly setting the function context to `null`.
      const myFn = obj.fn;
      myFn() == null; // true in strict mode
      // acquit:ignore:start
      assert.equal(myFn(), null);
      // acquit:ignore:end
    });

    it('class', function() {
      class MyClass {
        myFunction() {
          return this;
        }
      }

      const obj = new MyClass();

      obj.myFunction() === obj; // true
      // acquit:ignore:start
      assert.ok(obj.myFunction() === obj);
      // acquit:ignore:end
    });

    it('arrow', function() {
      const arrow = () => this;

      arrow() == null; // true

      const obj = { arrow };

      // Even though `arrow()` is attached to an object, it still
      // has the same context as the surrounding block.
      obj.arrow() == null; // true
      obj.arrow() == this; // true
    });

    it('call and apply', function() {
      const fn = function() {
        return this;
      };

      const obj = {};

      fn.call(obj) === obj; // true
      fn.apply(obj) === obj; // true
      // acquit:ignore:start
      assert.equal(fn.call(obj), obj);
      assert.equal(fn.apply(obj), obj);
      // acquit:ignore:end

      const copy = fn.bind(obj);
      copy() === obj; // true
      copy === fn; // false
      // acquit:ignore:start
      assert.equal(copy(), obj);
      assert.ok(!(copy === fn));
      // acquit:ignore:end
    });
  });

  describe('switch', function() {
    it('basic example', function() {
      const hero = 'Batman';
      let sidekick;

      switch (hero) {
        case 'Batman':
          sidekick = 'Robin';
          break;
        case 'Aquaman':
          sidekick = 'Aqualad';
          break;
        case 'Superman':
          sidekick = 'Jimmy Olsen';
          break;
        default:
          throw new Error('Unknown hero');
      }

      sidekick; // 'Robin'
      // acquit:ignore:start
      assert.equal(sidekick, 'Robin');
      // acquit:ignore:end
    });

    it('missing break', function() {
      const hero = 'Batman';
      let sidekick;

      switch (hero) {
        case 'Batman':
          sidekick = 'Robin';
          // Unless there's a `break`, JavaScript will execute the next
          // `case` block.
          // break;
        case 'Aquaman':
          sidekick = 'Aqualad';
          break;
        case 'Superman':
          sidekick = 'Jimmy Olsen';
          break;
        default:
          throw new Error('Unknown hero');
      }

      // JavaScript executed both the 'Batman' and 'Aquaman' blocks,
      // so you get the wrong `sidekick`.
      sidekick; // 'Aqualad'
      // acquit:ignore:start
      assert.equal(sidekick, 'Aqualad');
      // acquit:ignore:end
    });

    it('fallthrough', function() {
      const sidekick = 'Nightwing';
      let hero;

      switch (sidekick) {
        // The 'Robin' and 'Nightwing' cases are "fallthrough" `case`
        // statements. They execute the same code block as the 'Bluebird'
        // case.
        case 'Robin':
        case 'Nightwing':
        case 'Bluebird':
          hero = 'Batman';
          break;
        case 'Aqualad':
        case 'Tempest':
          hero = 'Aquaman';
          break;
        default:
          throw new Error('Unknown sidekick');
      }

      hero; // 'Batman'
      // acquit:ignore:start
      assert.equal(hero, 'Batman');
      // acquit:ignore:end
    });

    it('using if', function() {
      const hero = 'Batman';
      let sidekick;

      if (hero === 'Batman') {
        sidekick = 'Robin';
      } else if (hero === 'Aquaman') {
        sidekick = 'Aqualad';
      } else if (hero === 'Superman') {
        sidekick = 'Jimmy Olsen';
      } else {
        throw new Error('Unknown hero');
      }

      sidekick; // 'Robin'
      // acquit:ignore:start
      assert.equal(sidekick, 'Robin');
      // acquit:ignore:end
    });

    it('object types', function() {
      const date = new Date('2020/07/04');
      let holiday;

      const goodFriday = new Date('2020/04/10');
      const independenceDay = new Date('2020/07/04');
      const christmas = new Date('2020/12/25');

      // Strict equality means two dates aren't equal unless they're
      // the same object reference.
      date === independenceDay; // false
      // acquit:ignore:start
      assert.ok(date !== independenceDay);
      // acquit:ignore:end

      // `date` is an object, so you need to make sure you convert the
      // date to a number using `getTime()`. Otherwise none of the
      // cases will hit.
      switch (date.getTime()) {
        case goodFriday.getTime():
          holiday = 'Good Friday';
          break;
        case independenceDay.getTime():
          holiday = 'Independence Day';
          break;
        case christmas.getTime():
          holiday = 'Christmas';
          break;
      }

      holiday; // 'Independence Day'
      // acquit:ignore:start
      assert.equal(holiday, 'Independence Day');
      // acquit:ignore:end
    });

    it('using object conditional', function() {
      const hero = 'Batman';
      let sidekick;

      const obj = {
        'Batman': () => { sidekick = 'Robin'; },
        'Aquaman': () => { sidekick = 'Aqualad'; },
        'Superman': () => { sidekick = 'Jimmy Olsen'; }
      };

      // Make sure to use `hasOwnProperty()` if you're using an object,
      // otherwise 'constructor' would be a valid `hero`.
      if (obj.hasOwnProperty(hero)) {
        obj[hero]();
      }

      sidekick; // 'Robin'
      // acquit:ignore:start
      assert.equal(sidekick, 'Robin');
      // acquit:ignore:end
    });
  });

  describe('Promise.all', function() {
    it('basic example', async function() {
      // `p1` is immediately fulfilled with value `1`
      const p1 = Promise.resolve(1);
      // `p2` will be fulfilled with value `2` after 100ms
      const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));

      const pAll = Promise.all([p1, p2]);
      pAll instanceof Promise; // true
      // acquit:ignore:start
      assert.ok(pAll instanceof Promise);
      // acquit:ignore:end

      const arr = await pAll;

      Array.isArray(arr); // true
      arr[0]; // 1
      arr[1]; // 2
      // acquit:ignore:start
      assert.ok(Array.isArray(arr));
      assert.equal(arr[0], 1);
      assert.equal(arr[1], 2);
      // acquit:ignore:end
    });

    it('async functions', async function() {
      async function getName() {
        await new Promise(resolve => setTimeout(resolve, 200));

        return 'Jean-Luc Picard';
      }

      async function getAge() {
        await new Promise(resolve => setTimeout(resolve, 200));

        return 59;
      }

      const start = Date.now();
      const [name, age] = await Promise.all([getName(), getAge()]);
      const end = Date.now();

      name; // 'Jean-Luc Picard'
      age; // 59

      end - start; // Approximately 200
      // acquit:ignore:start
      assert.equal(name, 'Jean-Luc Picard');
      assert.equal(age, 59);
      assert.ok(end - start < 300);
      assert.ok(end - start > 100);
      // acquit:ignore:end
    });

    it('error', async function() {
      const success = new Promise(resolve => setTimeout(() => resolve('OK'), 100));
      const fail = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Oops')), 100);
      });

      try {
        await Promise.all([success, fail]);
      } catch (err) {
        err.message; // 'Oops'
        // acquit:ignore:start
        assert.equal(err.message, 'Oops');
        // acquit:ignore:end
      }
    });

    it('execution after error', async function() {
      let finished = false;

      const success = async function() {
        await new Promise(resolve => setTimeout(resolve, 100));

        finished = true;
        return 'OK';
      }
      const fail = async function() {
        await new Promise(resolve => setTimeout(resolve, 10));
        throw new Error('Oops');
      }

      // acquit:ignore:start
      let threw = false;
      // acquit:ignore:end
      try {
        await Promise.all([success(), fail()]);
      } catch (err) {
        err.message; // 'Oops'

        // `Promise.all()` fails fast because `fail()` threw an
        // error, but `success()` is still running.
        finished; // false
        // acquit:ignore:start
        assert.equal(err.message, 'Oops');
        assert.ok(!finished);
        threw = true;
        // acquit:ignore:end

        // If you wait, `success()` will set `finished`
        await new Promise(resolve => setTimeout(resolve, 100));
        finished; // true
        // acquit:ignore:start
        assert.ok(finished);
        // acquit:ignore:end
      }
      // acquit:ignore:start
      assert.ok(threw);
      // acquit:ignore:end
    });

    it('generator', async function() {
      const generatorFn = function*() {
        for (let i = 1; i <= 5; ++i) {
          yield Promise.resolve(i);
        }
      }

      const arr = await Promise.all(generatorFn());

      arr; // [1, 2, 3, 4, 5]
      // acquit:ignore:start
      assert.deepEqual(arr, [1, 2, 3, 4, 5]);
      // acquit:ignore:end
    });
  });

  describe('Promise resolve', function() {
    it('basic example', async function() {
      const p = Promise.resolve('Hello, World');

      const str = await p;
      str; // 'Hello, World'
      // acquit:ignore:start
      assert.equal(str, 'Hello, World');
      // acquit:ignore:end

      return p.then(str => {
        str; // 'Hello, World'
        // acquit:ignore:start
        assert.equal(str, 'Hello, World');
        // acquit:ignore:end
      });
    });

    it('another promise', async function() {
      const p = Promise.resolve('Hello, World');
      const p2 = Promise.resolve(p);

      const str = await p2;
      // `p2` "assimilates" the value of `p`.
      str; // 'Hello, World'
    });

    it('reject', async function() {
      async function fail() {
        await new Promise(resolve => setTimeout(resolve, 100));
        throw new Error('Oops');
      }

      // Calling `fail()` returns a promise that rejects after
      // 100ms. So `p` will reject, even though it was resolved!
      const p = Promise.resolve(fail());

      const err = await p.catch(err => err);
      err.message; // 'Oops'
      // acquit:ignore:start
      assert.equal(err.message, 'Oops');
      // acquit:ignore:end
    });

    it('constructor', async function() {
      const p = Promise.resolve('Hello, World');
      const p2 = new Promise(resolve => resolve(p));

      const str = await p2;
      // `p2` "assimilates" the value of `p`.
      str; // 'Hello, World'
      // acquit:ignore:start
      assert.equal(str, 'Hello, World');
      // acquit:ignore:end
    });
  });

  describe('new Promise', function() {
    it('basic example', async function() {
      const success = new Promise(function executor(resolve) {
        resolve('OK');
      });

      const fail = new Promise(function executor(resolve, reject) {
        reject(new Error('Oops'));
      });

      const str = await success;
      str; // 'OK'

      const err = await fail.catch(err => err);
      err.message; // Oops
      // acquit:ignore:start
      assert.equal(str, 'OK');
      assert.equal(err.message, 'Oops');
      // acquit:ignore:end
    });

    it('with then', async function() {
      const success = new Promise(function executor(resolve) {
        setTimeout(() => resolve('OK'), 100);
      });

      const start = Date.now();

      return success.then(function onFulfilled(str) {
        str; // 'OK'

        const elapsed = Date.now() - start;
        elapsed; // Approximately 100
        // acquit:ignore:start
        assert.equal(str, 'OK');
        assert.ok(elapsed > 50);
        assert.ok(elapsed < 150);
        // acquit:ignore:end
      });
    });

    it('timeout', async function() {
      async function test() {
        // Pause the async function for 100ms
        await new Promise(resolve => setTimeout(resolve, 100));

        return 'OK';
      }

      const start = Date.now();
      await test();
      const elapsed = Date.now() - start;
      elapsed; // Approximately 100
      // acquit:ignore:start
      assert.ok(elapsed > 50);
      assert.ok(elapsed < 150);
      // acquit:ignore:end
    });

    it('fs', async function() {
      const fs = require('fs');

      const p = new Promise(function executor(resolve, reject) {
        fs.readFile('./package.json', (error, result) => {
          if (error != null) {
            // Note the early return!
            return reject(error);
          }

          resolve(result);
        });
      });

      const pkg = JSON.parse(await p);
      pkg.name; // 'masteringjs.io'
      // acquit:ignore:start
      assert.equal(pkg.name, 'masteringjs.io');
      // acquit:ignore:end
    });

    it('async executor', async function() {
      const p = new Promise(async function executor(resolve, reject) {
        await new Promise(resolve => setTimeout(resolve, 100));
        resolve('OK');
      });

      const str = await p;
      // acquit:ignore:start
      assert.equal(str, 'OK');
      // acquit:ignore:end
    });
  });

  describe('async await', function() {
    it('basic await', async function() {
      async function test() {
        // `await` unwraps the promise's value
        const val = await Promise.resolve(42);
        val; // 42
      }

      test();
    });

    it('await pause', async function() {
      async function test() {
        const start = Date.now();
        await new Promise(resolve => setTimeout(resolve, 100));
        const elapsed = Date.now() - start;
        elapsed; // about 100
        // acquit:ignore:start
        assert.ok(elapsed > 50);
        assert.ok(elapsed < 150);
        // acquit:ignore:end
      }
      // acquit:ignore:start
      return test();
      // acquit:ignore:end
    });

    it('await loop', async function() {
      async function asyncEvenNumbers() {
        const nums = [];
        for (let i = 1; i <= 10; ++i) {
          if (i % 2 === 0) {
            const v = await Promise.resolve(i);
            nums.push(v);
          }
        }

        nums; // [2, 4, 6, 8, 10]
        // acquit:ignore:start
        assert.deepEqual(nums, [2, 4, 6, 8, 10]);
        // acquit:ignore:end
      }
      // acquit:ignore:start
      return asyncEvenNumbers();
      // acquit:ignore:end
    });

    it('try catch', async function() {
      async function test() {
        try {
          await Promise.reject(new Error('Oops'));
        } catch (err) {
          err.message; // Oops
          // acquit:ignore:start
          assert.equal(err.message, 'Oops');
          // acquit:ignore:end
        }
      }
      // acquit:ignore:start
      return test();
      // acquit:ignore:end
    });

    it('promise catch', async function() {
      async function test() {
        const promise = Promise.reject(new Error('Oops'));

        // Unwrap the promise's error
        const err = await promise.catch(err => err);
        err.message; // 'Oops'
        // acquit:ignore:start
        assert.equal(err.message, 'Oops');
        // acquit:ignore:end
      }
      // acquit:ignore:start
      return test();
      // acquit:ignore:end
    });
  });

  describe('puppeteer', function() {
    it('basic google search', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      // acquit:ignore:end
      const puppeteer = require('puppeteer');

      // Run in the background (headless mode)
      const browser = await puppeteer.launch({ headless: true });

      // Navigate to Google
      const page = await browser.newPage();
      await page.goto('https://google.com');

      // Type "JavaScript" into the search bar
      await page.evaluate(() => {
        document.querySelector('input[name="q"]').value = 'JavaScript';
      });

      // Click on the "Google Search" button and wait for the page to load
      await Promise.all([
        page.waitForNavigation(),
        page.evaluate(() => {
          document.querySelector('input[value="Google Search"]').click();
        })
      ]);
      
      // Get all the search result URLs
      const links = await page.evaluate(function getUrls() {
        return Array.from(document.querySelectorAll('a cite').values()).
          map(el => el.innerHTML);
      });
      // acquit:ignore:start
      assert.ok(links.length > 0);
      // acquit:ignore:end

      await browser.close();
    });

    it('local server', async function() {
      // acquit:ignore:start
      this.timeout(10000);
      // acquit:ignore:end
      const express = require('express');
      const puppeteer = require('puppeteer');

      // Start an Express app that renders a Vue app with a counter
      const app = express();
      app.get('/', function(req, res) {
        res.send(`
        <html>
          <body>
            <script src="https://unpkg.com/vue/dist/vue.js"></script>
        
            <div id="content"></div>
        
            <script type="text/javascript">      
              const app = new Vue({
                data: () => ({ count: 0 }),
                template: \`
                  <div>
                    <div id="count">
                      Count: {{count}}
                    </div>
                    <button v-on:click="++count">Increment</button>
                  </div>
                \`
              });
              app.$mount('#content');
            </script>
          </body>
        </html>
        `);
      });
      const server = await app.listen(3000);

      // Run in the background (headless mode)
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto('http://localhost:3000');

      // Load the current count
      let count = await page.evaluate(() => {
        return document.querySelector('#count').innerHTML.trim();
      });
      count; // 'Count: 0'
      // acquit:ignore:start
      assert.equal(count, 'Count: 0');
      // acquit:ignore:end

      // Increment the count and check that the counter was incremented
      await page.evaluate(() => {
        document.querySelector('button').click();
      });

      count = await page.evaluate(() => {
        return document.querySelector('#count').innerHTML.trim();
      });
      count; // 'Count: 1'
      // acquit:ignore:start
      assert.equal(count, 'Count: 1');
      // acquit:ignore:end

      await browser.close();
      await server.close();
    });
  });

  describe('iterate object', function() {
    let _console = console;
    let messages = [];

    beforeEach(function() {
      messages = [];
      console = {
        log: msg => messages.push(msg)
      };
    });

    afterEach(function() {
      console = _console;
    });

    it('object entries', function() {
      const obj = {
        name: 'Luke Skywalker',
        title: 'Jedi Knight',
        age: 23
      };

      // Prints out:
      // 'name: Luke Skywalker'
      // 'title: Jedi Knight'
      // 'age: 23'
      for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
      }
      // acquit:ignore:start
      assert.deepEqual(messages, [
        'name: Luke Skywalker',
        'title: Jedi Knight',
        'age: 23'
      ]);
      // acquit:ignore:end
    });

    it('object entries as array', function() {
      const obj = {
        name: 'Luke Skywalker',
        title: 'Jedi Knight',
        age: 23
      };

      const keyValuePairs = Object.entries(obj);
      keyValuePairs[0]; // ['name', 'Luke Skywalker']
      keyValuePairs[1]; // ['title', 'Jedi Knight']
      keyValuePairs[2]; // ['age', 23]
      // acquit:ignore:start
      assert.deepEqual(keyValuePairs, [
        ['name', 'Luke Skywalker'],
        ['title', 'Jedi Knight'],
        ['age', 23]
      ]);
      // acquit:ignore:end
    });

    it('keys', function() {
      const obj = {
        name: 'Luke Skywalker',
        title: 'Jedi Knight',
        age: 23
      };

      // Prints out:
      // 'name: Luke Skywalker'
      // 'title: Jedi Knight'
      // 'age: 23'
      for (const key of Object.keys(obj)) {
        console.log(`${key}: ${obj[key]}`);
      }
      // acquit:ignore:start
      assert.deepEqual(messages, [
        'name: Luke Skywalker',
        'title: Jedi Knight',
        'age: 23'
      ]);
      // acquit:ignore:end
    });

    it('keys vs entries', function() {
      const obj = {
        name: 'Luke Skywalker',
        title: 'Jedi Knight',
        age: 23
      };

      // Assigning to `value` does **not** change the property
      // value! You need to do `obj[key] = newValue`
      for (let [key, value] of Object.entries(obj)) {
        if (key === 'title') {
          value = 'Jedi Master';
        }
      }
      obj.title; // 'Jedi Knight'
      // acquit:ignore:start
      assert.equal(obj.title, 'Jedi Knight');
      // acquit:ignore:end

      // Works!
      for (const key of Object.keys(obj)) {
        if (key === 'title') {
          obj[key] = 'Jedi Master';
        }
      }
      // acquit:ignore:start
      assert.equal(obj.title, 'Jedi Master');
      // acquit:ignore:end
    });

    it('for/in', function() {
      function JediKnight(name, age) {
        this.name = name;
        this.age = age;
      }
      // `title` is an inherited property for instances of the
      // `Jedi Knight` class.
      JediKnight.prototype.title = 'Jedi Knight';

      const obj = new JediKnight('Luke Skywalker', 23);

      // `entries` will **not** include the `title` property
      const entries = Object.entries(obj);
      entries; // [['name', 'Luke Skywalker'], ['age', '23']]
      // acquit:ignore:start
      assert.deepEqual(entries, [['name', 'Luke Skywalker'], ['age', '23']]);
      // acquit:ignore:end

      // Includes `title`, because `for/in` also loops over
      // inheritted properties.
      // 'name: Luke Skywalker'
      // 'age: 23'
      // 'title: Jedi Knight'
      for (const key in obj) {
        console.log(`${key}: ${obj[key]}`);
      }
      // acquit:ignore:start
      assert.deepEqual(messages, [
        'name: Luke Skywalker',
        'age: 23',
        'title: Jedi Knight'
      ]);
      // acquit:ignore:end
    });

    it('for/in with pojo', function() {
      const obj = {
        name: 'Luke Skywalker',
        title: 'Jedi Knight',
        age: 23
      };

      const keys = [];
      for (const key in obj) {
        keys.push(key);
      }

      keys; // ['name', 'title', 'age', 'constructor']
      // acquit:ignore:start
      assert.deepEqual(keys, [
        'name', 'title', 'age', 'constructor'
      ]);
      // acquit:ignore:end
    });
  });

  describe('compare strings', function() {
    it('localeCompare', function() {
      const characters = [
        { firstName: 'Jean-Luc', lastName: 'Picard', rank: 'Captain', age: 59 },
        { firstName: 'Will', lastName: 'Riker', rank: 'Commander', age: 29 },
        { firstName: 'Geordi', lastName: 'La Forge', rank: 'Lieutenant', age: 29 }
      ];

      characters.sort((a, b) => a.lastName.localeCompare(b.lastName));

      // La Forge, Picard, Riker
      characters;
      // acquit:ignore:start
      assert.deepEqual(characters.map(c => c.lastName),
        ['La Forge', 'Picard', 'Riker']);
      // acquit:ignore:end
    });
  });

  describe('compare dates', function() {
    it('comparison operators', function() {
      const d1 = new Date('2019-06-01');
      const d2 = new Date('2018-06-01');
      const d3 = new Date('2019-06-01');

      d1 === d3; // false
      d1 == d3; // false
      // acquit:ignore:start
      assert.ok(!(d1 === d3));
      assert.ok(!(d1 == d3));
      // acquit:ignore:end
    });

    it('convert then compare', function() {
      const d1 = new Date('2019-06-01');
      const d2 = new Date('2018-06-01');
      const d3 = new Date('2019-06-01');

      // 'Fri May 31 2019 20:00:00 GMT-0400 (Eastern Daylight Time)'
      d1.toString();
      d1.valueOf(); // 1559347200000

      d1.toString() === d2.toString(); // false
      d1.toString() === d3.toString(); // true

      d1.valueOf() === d2.valueOf(); // false
      d1.valueOf() === d3.valueOf(); // true
      // acquit:ignore:start
      assert.ok(!(d1.toString() === d2.toString()));
      assert.ok(!(d1.valueOf() === d2.valueOf()));

      assert.ok(d1.toString() === d3.toString());
      assert.ok(d1.valueOf() === d3.valueOf());
      // acquit:ignore:end
    });

    it('subtraction', function() {
      const d1 = new Date('2019-06-01');
      const d2 = new Date('2018-06-01');
      const d3 = new Date('2019-06-01');

      d1 - d3; // 0
      d1 - d2; // 1 year in milliseconds, 1000 * 60 * 60 * 24 * 365
      // acquit:ignore:start
      assert.strictEqual(d1 - d3, 0);
      assert.strictEqual(d1 - d2, 1000 * 60 * 60 * 24 * 365);
      // acquit:ignore:end
    });

    it('sort', function() {
      const d1 = new Date('2017-06-01');
      const d2 = new Date('2018-06-01');
      const d3 = new Date('2019-06-01');

      [d2, d1, d3].sort(); // [d3, d2, d1]
      // acquit:ignore:start
      assert.deepEqual([d2, d1, d3].sort(), [d3, d2, d1]);
      // acquit:ignore:end
    });

    it('correct sort', function() {
      const d1 = new Date('2017-06-01');
      const d2 = new Date('2018-06-01');
      const d3 = new Date('2019-06-01');

      [d2, d1, d3].sort((a, b) => a - b); // [d1, d2, d3]
      // acquit:ignore:start
      assert.deepEqual([d2, d1, d3].sort((a, b) => a - b), [d1, d2, d3]);
      // acquit:ignore:end
    });
  });

  describe('compare arrays', function() {
    it('same length strict equality', function() {
      const a = [1, 2, 3];
      const b = [4, 5, 6];
      const c = [1, 2, 3];

      function arrayEquals(a, b) {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }

      arrayEquals(a, b); // false
      arrayEquals(a, c); // true
      // acquit:ignore:start
      assert.ok(!arrayEquals(a, b));
      assert.ok(arrayEquals(a, c));
      // acquit:ignore:end
    });

    it('json stringify', function() {
      const a = [{ answer: 42 }, { powerLevel: 9001 }];
      const b = [{ answer: 42 }, { powerLevel: 9001 }];
      const c = [{ answer: 42 }, { password: 'taco' }];

      JSON.stringify(a) === JSON.stringify(b); // true
      JSON.stringify(a) === JSON.stringify(c); // false
      // acquit:ignore:start
      assert.ok(JSON.stringify(a) === JSON.stringify(b));
      assert.ok(!(JSON.stringify(a) === JSON.stringify(c)));
      // acquit:ignore:end
    });

    it('lodash isEqual', function() {
      const _ = require('lodash');

      class MyClass {
        constructor(obj) {
          Object.assign(this, obj);
        }
      }
      
      const a = [new MyClass({ answer: 42 })];
      const b = [{ answer: 42 }];

      _.isEqual(a, b); // false
      // acquit:ignore:start
      assert.ok(!_.isEqual(a, b));
      // acquit:ignore:end
    });
  });
});

if (!Array.prototype.flat) {
  Array.prototype.flat = function() {
    var depth = arguments[0];
    depth = depth === undefined ? 1 : Math.floor(depth);
    if (depth < 1) return Array.prototype.slice.call(this);
    return (function flat(arr, depth) {
      var len = arr.length >>> 0;
      var flattened = [];
      var i = 0;
      while (i < len) {
        if (i in arr) {
          var el = arr[i];
          if (Array.isArray(el) && depth > 0)
            flattened = flattened.concat(flat(el, depth - 1));
          else flattened.push(el);
        }
        i++;
      }
      return flattened;
    })(this, depth);
  };
}