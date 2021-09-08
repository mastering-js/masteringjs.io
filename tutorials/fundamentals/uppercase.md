The built-in way of capitalizing strings in JavaScript is using the `toUpperCase()` function, which capitalizes the whole string.

```javascript
let string = 'masteringjs.io'
string.toUpperCase(); // MASTERINGJS.IO
```

## Locale Capitilization

A neat thing about JavaScript is that you can specify how a string should be capitalizied depending on the region using the `toLocaleUpperCase()` function.
It functions excatly like `toUpperCase()` to the point where you could use this method instead of `toUpperCase()` if you were using it locally. The difference is that
`toLocalUpperCase()` will use the host environment's current locale as default. So if that locale has a language conflict with the Unicode case mappings, the output will vary. You can supply one or multiple locales as a parameter, array if multiple, but the best available locale determined by JavaScript is used.

```javascript
let string = 'cafetería';
string.toLocaleUpperCase('en-US'); // CAFETERÍA
string.toLocaleUpperCase('es-ES'); // CAFETERÍA
```

## Capitalizing the First Letter
To [capitalize the first letter](/tutorials/fundamentals/capitalize-first-letter), the code gets much busier.
Using a combination of `toUpperCase()`, `charAt()`, and `slice()`, you can capitalize the first letter of a word.

```javascript
const str = 'captain Picard';

const caps = str.charAt(0).toUpperCase() + str.slice(1); // Captain Picard
```

To capitalize the first letter of every word in a string, you must use a combination of `join()`, `map()`, `split()`, as well as the steps used in the previous example.

```javascript
const str = 'captain picard';

const caps = str.split(' ').map(capitalize).join(' '); // Captain Picard

```

**Note:** You could use CSS's `text-transform` property and set it to `capitalize` which would accomplish the same as above.
