[Chai](https://www.npmjs.com/package/chai) is one of the most popular assertion libraries when writing test suites with [Mocha](https://www.npmjs.com/package/mocha). This article assumes you are already acquainted with Mocha, so check out [our introduction to Mocha](/tutorials/mocha/intro) first.

Chai supports [3 different assertion styles](https://www.npmjs.com/package/chai#usage): `expect`, `should`, and [`assert`](https://www.chaijs.com/api/assert/). `expect` is most common, because `should` modifies `Object.prototype` and `assert` doesn't provide much benefit over the [built-in Node.js `assert` library](https://nodejs.org/api/assert.html).

Getting Started with `expect`
-----------------------------

Suppose you have a basic function `sum()` that adds two numbers together:

```javascript
module.exports = function sum(a, b) {
  return a + b;
};
```

Here's how you would write a `sum.test.js` file that tests the above `sum.js` file.

```javascript
const { expect } = require('chai');
const sum = require('./sum');

describe('sum()', function() {
  it('adds two numbers', function() {
    // `expect()` takes in a parameter value and returns what Chai calls
    // a "chain"
    expect(sum(2, 4)).to.equal(6);
  });

  it('ignores additional arguments', function() {
    expect(sum(2, 4, 6)).to.equal(6);
  });
});
```

The [goal of Chai's `expect` and `should` interfaces is to allow you to write assertions in a way that mimics natural language](https://www.chaijs.com/guide/styles/#expect). For example, to assert that a value is an array that includes '3', you would write:

```javascript
expect([1, 2, 3]).to.be.an('array').that.includes(3);

// Throws "AssertionError: expected [ 1, 2, 3 ] to include 4"
expect([1, 2, 3]).to.be.an('array').that.includes(4);
```

The Chai docs have a [complete list of language chains and comparisons](https://www.chaijs.com/api/bdd/#method_language-chains).

Object Comparisons with `expect`
--------------------------------

The `expect` API is chainable and very expressive. Advanced Chai users can
often write all their assertions with one `expect` chain.

For example, suppose you have an object with several properties:

```javascript
const movie = {
  title: 'Jingle All The Way',
  releaseDate: new Date('1996-11-22'),
  imdb: 'https://www.imdb.com/title/tt0116705/?ref_=nv_sr_1?ref_=nv_sr_1'
};
```

To assert that another object is deep equal to `movie`, you could do:

```javascript
const value = Object.assign({}, movie);

// Add the `deep` modifier to make Chai check whether the object properties
// are equal, rather than the top-level objects.
expect(value).to.deep.equal(movie);
```

Often you don't want to assert that two objects are exactly deep equal, but
that an object has certain properties set. For example, to check that `movie` has 
the correct `title` and `releaseDate`, but ignore `imdb` and other properties, use [`.include()`](https://www.chaijs.com/api/bdd/#includeval-msg).

```javascript
expect(movie).to.deep.include({
  title: 'Jingle All The Way',
  releaseDate: new Date('1996-11-22')
});
```

Getting Started with `should`
-----------------------------

The [`should` interface](https://www.chaijs.com/guide/styles/#should) supports the same chaining interface as `expect()`. The key difference is that Chai adds a `should()` function to every JavaScript value. That means you don't have to call `expect()` explicitly, which makes assertions read more like natural language.

```javascript
require('chai').should();
const sum = require('./sum');

describe('sum()', function() {
  it('adds two numbers', function() {
    // Numbers now have a `.should()` function
    sum(2, 4).should.equal(6);
  });

  it('ignores additional arguments', function() {
    sum(2, 4, 6).should.equal(6);
  });
});
```

Many projects avoid using `should()` because, in production, your values won't have a `should()` function. What if the code under test uses `should()`? Your tests will succeed, but your code will fail in production. Because of this trade-off, `expect()` is more common than `should()`, but people do use `should()`.