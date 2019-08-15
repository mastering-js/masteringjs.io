The [`JSON.stringify()` function](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html) is how you convert a JavaScript object to a [JSON string](https://www.json.org/).
Just about every npm module that handles HTTP requests or responses, like [Axios](https://www.npmjs.com/package/axios) or [Express](http://expressjs.com/), uses `JSON.stringify()` under the hood.

Converting Values to JSON
-------------------------

The [first parameter to `JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters) is the `value` to convert to JSON.

```javascript
[require:Fundamentals.*JSON\.stringify.*basic$]
```

JSON can only represent values with the following types:

- Strings
- Numbers
- Objects
- Arrays
- Booleans
- `null`

You may notice that this list excludes a few of [JavaScript's built-in types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types). Specifically, JSON cannot represent JavaScript `undefined`, symbols, or [BigInts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `JSON.stringify()` silently ignores `undefined` values and symbol values.

```javascript
[require:Fundamentals.*JSON\.stringify.*missing types$]
```

`JSON.stringify()` throws an error if it finds a BigInt value.

```javascript
// TypeError: Do not know how to serialize a BigInt
JSON.stringify({ val: 42n });
```

This list also excludes JavaScript objects, like [JavaScript dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). The `JSON.stringify()` function converts [JavaScript dates to strings](/tutorials/fundamentals/date_format).

```javascript
[require:Fundamentals.*JSON\.stringify.*dates$]
```

Replacer Function
-----------------

The 2nd argument to `JSON.stringify()` is a replacer function. JavaScript calls
this function for every key/value pair in the object, and uses the return value.
If the replacer function returns `undefined`, that key is omitted from the
JSON output.

For example, suppose you wanted to strip out `null` values using a replacer
function:

```javascript
[require:Fundamentals.*JSON\.stringify.*replacer$]
```

Pretty Printing
---------------

The 3rd argument to `JSON.stringify()` is called `space`. This parameter should
be either a string or a number, and it tells JavaScript to format the JSON in
a human readable way. If you specify a `space` parameter, JavaScript will
put each key/value pair on its own line, and prefix each line with `space`.

```javascript
[require:Fundamentals.*JSON\.stringify.*space$]
```