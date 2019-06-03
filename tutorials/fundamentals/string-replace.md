By default, the [`String#replace()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) in JavaScript only replaces the first instance of a substring. Make sure you [pass a RegExp with the `/g` flag set as shown below](http://2ality.com/2013/08/regexp-g.html).

```javascript
[require:Fundamentals.*String.*replace.*basic]
```

Remember [JavaScript strings are immutable](https://www.sitepoint.com/immutability-javascript/). When you use `replace()`, you don't modify the original string.

Replacement Patterns
-----------------------------

[The `String#replace()` function has several special character sequences called "replacement patterns"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter). Replacement patterns are useful when you want to replace all substrings that match a regular expression with a string that contains the match.

For example, suppose you wanted to add a `#` before all numbers in a string. You can use the `$&` replacement pattern, which inserts the matched substring.

```javascript
const str = 'My favorite team is 1, everyone else is 2';

// "My favorite team is #1, everyone else is #2"
str.replace(/\d+/g, '#$&');
```