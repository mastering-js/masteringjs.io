To replace a string in JavaScript, you can use the `replaceAll()` function.
The first argument is a regular expression/pattern or string that defines what needs to be replaced.
The second argument can either be a string that is the replacement, or a function that will be invoked to create the replacement.

```javascript
const sentence = 'The world is a cruel place.';
sentence.replaceAll('cruel', 'wonderful'); // The world is a wonderful place.

// Strings are immutable in JavaScript, so the original string stays the same
sentence; // The world is a cruel place.
```

Keep in mind that `replaceAll()` is a relatively new addition to JavaScript, introduced as part of [ES2021](https://2ality.com/2020/09/ecmascript-2021.html).
Support for `String.prototype.replaceAll()` was introduced in Chrome 85 (August 2020) and Node.js 15.

As of 2022, we do **not** recommend using `replaceAll()` due to limited support.
Use `String.prototype.replace()` with a regular expression instead.

```javascript
const sentence = 'The world is a cruel place.';
sentence.replace(/cruel/g, 'wonderful'); // The world is a wonderful place.
```

## Using a regular expression

You can use a regular expression in place of a string if you want to cover more cases of what needs to be replaced.
It is important to not that your regular expression must have the `g` flag enabled.
If not, JavaScript will throw a `TypeError`.

```javascript
const sentence = 'The world is a cruel place. Only cruel people thrive here.';
sentence.replaceAll(/cruel/ig, 'wonderful'); // The world is a wonderful place. Only wonderful people thrive here.

// TypeError: String.prototype.replaceAll called with a non-global RegExp argument
sentence.replaceAll(/cruel/i, 'wonderful');
```

## Using a function

The invoked function runs for every match it finds.
JavaScript calls the function with the below parameters:

1. match, what the function found that matched the search criteria.
2. pN/$N, where N is the nth string found by a parenthesized capture group. So for example `/(\a+)(\b+)/` has two.
3. offset, where in the string the match was found.
4. string, the string being examined.

```javascript
const sentence = 'abcd abcd';
sentence.replaceAll(/(a+)(b+)/ig, function(match, p1, p2, offset, string) {
  match; // ab
  p1; // a
  p2; // b
  offset; // 0 then 5 on the next iteration
  string; // abcd abcd
  return 'Hello';
}) // Hellocd Hellocd
```
However, when running this example, `namedGroups` returns undefined. Could be the parameter is no longer supported.

When `replaceAll()` is called with a string, JavaScript calls the replacer function with the below 3 arguments:

1. match
2. offset
3. string

```javascript
const sentence = 'The world is a cruel place. Only cruel people thrive here.';
sentence.replaceAll('cruel', function(match, offset, string) {
  match; // cruel
  offset; // 15 then 33
  string; // The world is a cruel place. Only cruel people thrive here.
  return match.toUpperCase();
}); // The world is a CRUEL place. Only CRUEL people thrive here.
```
