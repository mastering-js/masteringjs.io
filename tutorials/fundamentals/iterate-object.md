Suppose you have a simple JavaScript object:

```javascript
const obj = {
  name: 'Luke Skywalker',
  title: 'Jedi Knight',
  age: 23
};
```

How do you iterate over the key/value pairs and print out
"name: Luke Skywalker", "title: Jedi Knight", and "age: 23"?
There are a lot of ways to do this in modern JavaScript. Here's
3 different ways:

Using [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
------------------------

The `Object.entries()` function returns an arrau coontaining the object's key/value pairs. Here's how you would print out
the key/value pairs using `Object.entries()` and a [`for/of` loop](https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript).

```javascript
[require:Fundamentals iterate object object entries$]
```

In JavaScript, an _entry_ is an array with exactly 2 elements, where
the first element is the `key` and the second element is the `value`.
The entry pattern shows up in several other places in JavaScript, like
[the `Map` constructor](https://thecodebarbarian.com/the-80-20-guide-to-maps-in-javascript.html) and [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries).

If you convert the iterator that `Object.entries()` returns into an
array using `Array.from()`, you'll get an array containing the object's
key/value pairs.

```javascript
[require:Fundamentals iterate object object entries as array$]
```

Using [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
---------------------

The `Object.keys()` function returns an array of the object's
keys, as opposed to both the keys and the values. You can then
use square brackets `[]` to get the object's values.

```javascript
[require:Fundamentals iterate object keys$]
```

Why use `Object.keys()` versus `Object.entries()`? Because you
can't change the value in an entry to change the value in the
object.

```javascript
[require:Fundamentals iterate object keys vs entries$]
```

With [`for/in`](https://www.w3schools.com/jsref/jsref_forin.asp)
---------------

The `Object.keys()` and `Object.entries()` functions only loop
over an [object's own properties](/tutorials/fundamentals/hasownproperty).
For a [POJO](/tutorials/fundamentals/pojo), this distinction
doesn't matter. But when you use [inheritance](https://thecodebarbarian.com/an-overview-of-es6-classes#inheritance), this distinction can be important.

Using a `for/in` loop lets you iterate over all an object's keys,
including inherited keys.

```javascript
[require:Fundamentals iterate object for/in$]
```

Generally speaking, you should use `Object.keys()` or `Object.entries()`
with POJOs to avoid accidentally picking up inheritted properties.
But you can use `for/in` if you're sure you want to loop over
inheritted properties.