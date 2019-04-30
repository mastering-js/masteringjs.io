'use strict';

const assert = require('assert');

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

      // For the purposes of `==`, `<`, `>`, `>=` and `<=`, `obj` is
      // equivalent to 0.
      obj < Number(-1); // false
      obj > Number(-1); // true
      obj == Number(0); // true
      obj < -1; // false
      obj > -1; // true
      obj == 0; // true

      // `===` skips calling `valueOf()`.
      obj === Number(0); // false
      // acquit:ignore:start
      assert.ok(!(obj < Number(-1)));
      assert.ok(obj > Number(-1));
      assert.ok(obj == Number(0));

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
});