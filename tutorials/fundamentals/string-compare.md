JavaScript makes comparing strings easy. First, to compare if two strings are exactly equal, use `===`. [Do **not** use `==`](https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a).

```javascript
[require:Fundamentals.*string compare.*equality]
```

`<` and `>`
-----------

Using `<` and `>` compares strings lexicographically according to [Unicode sort order](https://www.w3.org/TR/xml-entity-names/bycodes.html). That means digits are always `<` uppercase letters, and uppercase letters are always `<` lowercase letters.

```javascript
[require:Fundamentals.*string compare.*comparison]
```

When comparing strings with length greater than 1, JavaScript compares character by character. If both strings start with the same character, JavaScript compares the 2nd characters of each string. The end of a string is always `<` any character.

```javascript
[require:Fundamentals.*string compare.*longer strings]
```

The `<` and `>` operators return `false` when comparing a string to a non-string:

```javascript
[require:Fundamentals.*string compare.*non-strings]
```

Sorting
-------

By default, the [`Array#sort()` function converts all values in an array to strings and then sorts them in Unicode sort order](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description). The `sort()` function puts `null` and `undefined` values at the end of the array.

```javascript
[require:Fundamentals.*string compare.*non-strings]
```

`<=` and `>=`
-------------

Be careful when using `<=` and `>=`, because these use the same type coercion that `==` does.

```javascript
[require:Fundamentals.*string compare.*lte]
```