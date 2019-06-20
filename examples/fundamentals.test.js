'use strict';

const assert = require('assert');
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

      const rankOrder = ['Captain', 'Commander', 'Lieutenant'];

      characters.sort((a, b) => {
        return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
      });

      // Picard, Riker, La Forge
      characters;
      // acquit:ignore:start
      assert.deepEqual(characters.map(c => c.lastName),
        ['Picard', 'Riker', 'La Forge']);
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