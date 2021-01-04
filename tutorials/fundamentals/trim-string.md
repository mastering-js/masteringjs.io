JavaScript strings have a [`trim()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim) that you can use to can use to remove leading and trailing whitespace from a string.

```javascript
[require:Fundamentals trim basic example$]
```

The `trim()` method removes _all_ whitespace characters, not just spaces. That includes tabs and newlines.

```javascript
[require:Fundamentals trim tabs and newlines$]
```

`trimStart()` and `trimEnd()`
-----------------------------

As of ES2019, JavaScript strings also have `trimStart()` and `trimEnd()` methods. The `trimStart()` function removes
all leading whitespace, and `trimEnd()` removes all trailing whitespace. In other words, `str.trimStart().trimEnd()`
is equivalent to `str.trim()`.

```javascript
[require:Fundamentals trim trimStart and trimEnd$]
```

However, we do not recommend using `trimStart()` and `trimEnd()` without a polyfill. Since `trimStart()` and `trimEnd()`
are new in ES2019, they are not supported in Node.js before v10.x, and they are not supported in any version of
Internet Explorer. We recommend using [string `replace()` method](/tutorials/fundamentals/string-replace) and
regular expressions instead.

```javascript
[require:Fundamentals trim trimStart regexp$]
```