JavaScript strings have a built-in [`split()` method](https://www.w3schools.com/jsref/jsref_split.asp) that split a string by instances of a given separator. For example, here's how you can split
a string by dashes:

```javascript
const str = 'kebab-case-string';
str.split('-'); // ['kebab-case-string']
```

Or you can split a string by commas:

```javascript
const str = '0,1,2';
str.split(','); // ['0', '1', '2']
```

Converting to a Character Array
----------------------------

There are [numerous ways to convert a string to an array of characters](https://jscurious.com/various-ways-to-convert-string-to-array-in-javascript/). With an empty string as the separator, the `split()` function will return an array of characters:

```javascript
'Hello'.split(''); // ['H', 'e', 'l', 'l', 'o']
```

However, this approach has a problem because of how `split()` handles [UTF-16](https://en.wikipedia.org/wiki/UTF-16) characters. For example, [emojis](https://unicode.org/emoji/charts/full-emoji-list.html) end up with incorrect results:

```javascript
'Hello😀'.split(''); // ['H', 'e', 'l', 'l', 'o', '�', '�']
```

The [`Array.from()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) handles UTF-16 characters. You should use `Array.from()` if you're looking to split a string into an array of characters and expect UTF-16 characters.

```javascript
Array.from('Hello😀'); // [ 'H', 'e', 'l', 'l', 'o', '😀' ]
```