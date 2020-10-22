There's two common ways to check whether a string contains a substring in JavaScript. The more modern way is the [`String#includes()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes).

```javascript
[require:Fundamentals.*String#includes]
```

You can use [`String#includes()` in all modern browsers **except** Internet Explorer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Browser_compatibility). You can also use `String#includes()` in Node.js `>= 4.0.0`.

<img src="/assets/includes-browser-compat.png">

_Compatibility table from [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Browser_compatibility)_

If you need to support Internet Explorer, you should instead use the [`String#indexOf()` method](https://www.w3schools.com/jsref/jsref_indexof.asp), which has been a part of JavaScript since ES1 in 1997.

```javascript
[require:Fundamentals.*String#indexOf]
```

In general, if you have any doubt about whether code will run in an environment that supports `includes()`, you should use `indexOf()`. The `includes()` function's syntax is only marginally more concise than `indexOf()`.

[Case Insensitive Search](/tutorials/fundamentals/compare-strings-ignore-case)
-----------------------

Both `String#includes()` and `String#indexOf()` are case sensitive. Neither function supports regular expressions. To do case insensitive search, you can use regular expressions and the [`String#match()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match), or you can convert both the string and substring to lower case using the [`String#toLowerCase()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase).

```javascript
[require:Fundamentals.*case insensitive]
```