The built-in way of capitalizing strings in JavaScript is using the `toUpperCase()` function, which capitalizes the whole string.

```javascript
let string = 'masteringjs.io'
string.toUpperCase(); // MASTERINGJS.IO
```

## Capitalizing the First Letter

To [capitalize the first letter](/tutorials/fundamentals/capitalize-first-letter), the code gets much busier.
Using a combination of `toUpperCase()`, `charAt()`, and `slice()`, you can capitalize the first letter of a word.

```javascript
[require:Fundamentals capitalize first letter works$]
```

To capitalize the first letter of every word in a string, you must use a combination of `join()`, `map()`, `split()`, as well as the steps used in the previous example.

```javascript
[require:Fundamentals capitalize first letter all words$]
```

## Locale Capitalization

JavaScript uses different capitalization rules based on the [locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) of your system.
In most cases, the locale doesn't matter for capitalization.
But there are some edge cases, like the famous [dotless I](https://en.wikipedia.org/wiki/Dotted_and_dotless_I) in Turkish and some other Turkic languages.
If these edge cases are important for your app, you can use [`toLocaleUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase) and specify the locale you want to use.

```javascript
// In most cases, capitalization works correctly regardless of locale
'cafetería'.toLocaleUpperCase('en-US'); // CAFETERÍA
'cafetería'.toLocaleUpperCase('es-ES'); // CAFETERÍA

// But there are edge cases, like dotted I in some Turkic languages
'i'.toLocaleUpperCase('en-US'); // I
'i'.toLocaleUpperCase('tr-tr'); // İ
```

In general, we recommend using `toUpperCase()` and not worrying too much about locale.
