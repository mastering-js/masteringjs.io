[JavaScript's `Array#forEach()` function](/tutorials/fundamentals/foreach) lets you iterate over
an [array](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html),
but not over an object. But you can [iterate over a JavaScript object](/tutorials/fundamentals/iterate-object) using `forEach()` if you transform the object into an array first, using [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values), or [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).

Using `Object.keys()`
--------------------

The `Object.keys()` function returns an array of the object's own enumerable
properties. You can then iterate over each key in the object using `forEach()`.

```javascript
[require:Fundamentals forEach object using keys$]
```

Using `Object.values()`
--------------------

The `Object.values()` function returns an array of the object's own enumerable
property values. In other words, it returns an array over the object's values
that you can iterate through using `forEach()`.

```javascript
[require:Fundamentals forEach object using values$]
```

Using `Object.entries()`
--------------------

The `Object.entries()` function returns an array of entries. An _entry_ is
an array of length 2, where `entry[0]` is the key and `entry[1]` is the
value. You can iterate through both keys and values simultaneously:

```javascript
[require:Fundamentals forEach object using entries$]
```