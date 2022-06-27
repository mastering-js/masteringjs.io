To check if a string contains a number in JavaScript, there are two approaches.

## Using a Regular Expression

You can use a regular expression in combination with the `test()` function to confirm if there is a number in the string.
The [`\d` RegExp metacharacter](https://www.geeksforgeeks.org/javascript-regexp-d-metacharacter/) matches any digit 0-9.

```javascript
const example = 'Dial 555-555-5555 for a free consultation today!';
/\d/.test(example); // true

const example2 = 'Hawaii Five-O';
/\d/.test(example2); // false
```

## The Iterative Approach

Another approach is to [convert the string into an array](/tutorials/fundamentals/convert-string-to-array) and use the [`Array.find()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
If the string contains a digit, `find()` will return a truthy value.
Otherwise, `find()` will return `undefined`.

```javascript
const example = 'Dial 555-555-5555 for a free consultation today!';
[...example].find(char => char >= '0' && char <= '9'); // 5

const example2 = 'Hawaii Five-O';
[...example2].find(char => char >= '0' && char <= '9'); // undefined
```