[Comparing two strings in JavaScript](/tutorials/fundamentals/compare-strings) is easy: just use `===`. But what
if you want to treat uppercase and lowercase letters as equal, so `Bill@Microsoft.com` is equivalent to `bill@microsoft.com`?

The most basic way to do [case insensitive string comparison](https://stackoverflow.com/questions/2140627/how-to-do-case-insensitive-string-comparison) in JavaScript is using either the `toLowerCase()` or `toUpperCase()` method to make sure both strings are either all lowercase or all uppercase.

```javascript
[require:Fundamentals string equals ignore case using toLowerCase$]
```

Using `localeCompare()`
----------------------

JavaScript's [`String#localeCompare()` method](https://www.techonthenet.com/js/string_localecompare.php) gives you more fine-grained control over string comparison. For example, you can also compare two strings ignoring [diacritics](https://en.wikipedia.org/wiki/Diacritic). Below is how you can do case-insensitive string comparison using `localeCompare()`:

```javascript
[require:Fundamentals string equals ignore case using localeCompare$]
```

The `localeCompare()` function is particularly useful if you want to sort an array of strings, ignoring case:

```javascript
[require:Fundamentals string equals ignore case sorting$]
```

Don't Use Regular Expressions
-----------------------------

You may be tempted to compare two strings using regular expressions and JavaScript regexp's `i` flag.

```javascript
const str1 = 'Bill@microsoft.com';
const str2 = 'bill@microsoft.com';
      
new RegExp('^' + str1 + '$', 'i').test(str2); // true
```

However, using this approach, you need to be careful to [escape special regular expression characters](https://javascript.info/regexp-escaping). For example, the below comparison fails, whereas it would succeed using `toLowerCase()` or `localeCompare()`.

```javascript
const str1 = '[hello]';
const str2 = '[Hello]';
      
new RegExp('^' + str1 + '$', 'i').test(str2); // false
```

You're better off using `toLowerCase()` or `localeCompare()` than using a regular expression.