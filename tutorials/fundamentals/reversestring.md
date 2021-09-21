To reverse a string, you can transform the [string into an array](/tutorials/fundamentals/convert-string-to-array) and then use [JavaScript arrays' built-in `reverse()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).

```javascript
Array.from('help').reverse().join(''); // pleh
```

or

```javascript
let str = 'help';
[...str].reverse().join(''); // pleh
```

You can also use `str.split('').reverse().join('')`, but we recommend using `Array.from()` or the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
[The `split()` method does not handle UTF-16 characters, like emojis](/tutorials/fundamentals/convert-string-to-array).

## Reverse a String Without Built-in Methods

Reversing a string without any built-in methods is a common interview question.
You can use a `for` loop to iterate through the string in reverse as shown below.

```javascript
let str = 'hello world';
let reversed = '';

for(let i = str.length - 1; i >= 0; i--) {
  result +=  str[i];
}

return result;
```

## Using Recursion

Another approach for reversing a string is using recursion.
The idea is that you can break down the problem of reversing a string into two steps:

1) Swap the first and last characters of the string
2) Reverse everything except for the first and last characters

```javascript
function reverseString(str = '') {
  if (str.length <= 1) {
    return str;
  }

  const firstChar = str.charAt(0);
  const lastChar = str.charAt(str.length - 1);
  return lastChar + reverse(str.slice(1, str.length -1)) + firstChar;
}
```
