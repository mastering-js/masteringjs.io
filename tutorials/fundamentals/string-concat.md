There are 3 ways to concatenate strings in JavaScript. In this tutorial, you'll
the different ways and the tradeoffs between them.

The `+` Operator
----------------

The same `+` operator you use for adding two numbers can be used to concatenate
two strings.

```javascript
[require:Fundamentals.*concat.*plus]
```

You can also use `+=`, where `a += b` is a shorthand for `a = a + b`.

```javascript
[require:Fundamentals.*concat.*plus equals]
```

If the left hand side of the `+` operator is a string, JavaScript will coerce
the right hand side to a string. That means it is safe to concatenate objects,
numbers, `null`, and `undefined`.

```javascript
[require:Fundamentals.*concat.*null]
```

The `+` and `+=` operators are [fast on modern JavaScript engines](https://2ality.com/2011/10/string-concatenation.html), so no need to worry about something like [Java's StringBuilder class](https://www.geeksforgeeks.org/stringbuilder-class-in-java-with-examples/).

`Array#join()`
--------------

The [`Array#join()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) creates a new string from concatenating all elements in an array. For example:

```javascript
[require:Fundamentals.*concat.*Array#join.*basic]
```

The first parameter to `join()` is called the _separator_. By default, the
separator is a single comma `','`.

```javascript
[require:Fundamentals.*concat.*Array#join.*default separator]
```

You can pass in any separator you want. Separators make `Array#join()` the preferred
choice for concatenating strings if you find yourself repeating the same character over and over again. For example, you can use `' '` as the separator to join an array of words:

```javascript
[require:Fundamentals.*concat.*Array#join.*words]
```

Or you can use `'/'` to join together URL fragments:

```javascript
[require:Fundamentals.*concat.*Array#join.*url]
```

Separators make `Array#join()` a very flexible way to concatenate strings. If you
want to join together a variable number of strings, you should generally use `join()`
rather than a `for` loop with `+`.

`String#concat()`
-----------------

[JavaScript strings have a built-in `concat()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat). The `concat()` function takes one or more parameters, and returns the modified string. Strings in JavaScript are immutable, so `concat()` doesn't modify the string in place.

```javascript
[require:Fundamentals.*concat.*String#concat.*basic]
```

The downside of using `concat()` is that you must be certain `str1` is a string.
You can pass non-string parameters to `concat()`, but you will get a TypeError
if `str == null`.

```javascript
[require:Fundamentals.*concat.*String#concat.*null]
```

The `concat()` function is rarely used because it has more error cases than the
`+` operator. For example, you would get unexpected behavior if you call `concat()`
on a value that [happens to be an array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat). You should use `+` instead of `concat()` unless you have a very good reason.

If you must use `concat()`, it is usually best to call it on an empty string:

```javascript
[require:Fundamentals.*concat.*String#concat.*empty str]
```