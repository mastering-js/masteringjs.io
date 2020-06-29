In JavaScript, an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) represents a sequence of values. It is an object that has a `next()` function that returns a POJO with two properties:

- `value`: The next value in the sequence.
- `done`: If [truthy](/tutorials/fundamentals/truthy), means the sequence is done.

For example, the below object is an iterator representing a sequence of even numbers.

```javascript
let num = 0;

const iterator = {
  next: () => {
    num += 2;
    return { value: num, done: false };
  }
};
```

Iterators and Iterables
-----------------------

Iterators are typically not useful on their own. Instead, in JavaScript, you normally
work with iterables. An _iterable_ is an object with a `Symbol.iterator` function that
returns an iterator. You can think of an iterable's `Symbol.iterator` function as a factory
function for iterators.

```javascript
const iterable = {
  [Symbol.iterator]: function factory() {
    let num = 0;

    const iterator = {
      next: () => {
        num += 2;
        return { value: num, done: false };
      }
    };

    return iterator;
  }
};
```

Iterables work nicely with several JavaScript language constructs and built-in functions.
For example, you can iterate over an iterable using a `for/of` loop.

```javascript
[require:Fundamentals iterator for of$]
```

Note that you **cannot** iterate over an _iterator_ using a `for/of` loop, only an _iterable_.

Converting an Iterable to an Array
---------------------------------

There are two ways to convert an iterable to an array. First, JavaScript has a built-in
[`Array.from()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) that can convert an iterable to an array:

```javascript
[require:Fundamentals iterator array from$]
```

The [spread operator](https://thecodebarbarian.com/object-assign-vs-object-spread.html) also works with iterables. You can use it to convert an iterable to an array as shown below.

```javascript
[require:Fundamentals iterator spread$]
```