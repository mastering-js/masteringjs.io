JavaScript Strings have a `match()` method that returns an array if the string matches a given regular expression, or `null` otherwise.

```javascript
'abc'.match(/a/); // [ 'a', index: 0, input: 'abc', groups: undefined ]
'abc'.match(/z/); // null

// Use `match()` to check if a string matches a regexp
if (str.match(regexp) != null) {
  // matches!
}
```

`match()` is very similar to the RegExp `test()` method, which returns `true` if a regexp matches a given string.

```javascript
/a/.test('abc'); // true
/z/.test('abc'); // false
```

If all you want to do is test whether a string matches a regexp, [you should use `test()` because `test()` is slightly faster](https://stackoverflow.com/questions/10940137/regex-test-v-s-string-match-to-know-if-a-string-matches-a-regular-expression).
However, `match()` has some helpful advanced features.

Capture Groups
----------------

The `match()` function's return value contains the regular expressions' _capture groups_.
A capture group is a subsection of the regular expression in parentheses `()`.
For example, `\d` is a capture group in the following.

```javascript
const arr = 'There are 4 lights'.match(/(\d) lights/);

arr[0]; // "4 lights", the complete match
arr[1]; // "4", the first capture group
```

Capture groups are useful for pulling subsections of a given regular expression result.
For example, below is how you can use capture groups to convert a date in `YYYY-MM-DD` format into year, month, and day.

```javascript
const str = '2022-06-01';

// 4 digits, dash, 2 digits, dash, 2 digits. The 4 digits, 2 digits, 2 digits
// are capture groups.
const [year, month, day] = str.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1, 4);

year; // '2022'
month; // '06'
day; // '01'
```

Note that capture groups do **not** work if you specify the `g` flag on your regular expression.

Practical Example: Standardizing US Telephone Numbers
---------------------------------------

There are many different ways to write a US telephone number.
All the below examples are not uncommon.

```
2016930123
+12016930123
+1 201-693-0123
+1 (201)-693-0123
201 693 0123
```

Suppose you want to standardize, and always store `2016930123`, but allow all the other formats?
Use the following regular expression: optional leading +1 as a capture group, and then capture groups for the area code, telephone prefix, and line number.

```javascript
/^(\+1\s?)?\(?([\d]{3})\)?[-. ]?([\d]{3})[-. ]?([\d]{4})$/
```

Assuming there is a match, the following will convert a telephone number in any of the given formats to `2016930123`

```javascript
const processedTelephoneNumber = telephone.
  match(/^(\+1\s?)?\(?([\d]{3})\)?[-. ]?([\d]{3})[-. ]?([\d]{4})$/).
  slice(2, 5).
  join('');
```