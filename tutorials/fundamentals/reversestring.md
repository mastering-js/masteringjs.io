To reverse a string, you can use JavaScript's built-in `reverse()` method by turning the [string into an array](/tutorials/fundamentals/convert-string-to-array)
for processing and then back into a string.

```javascript
Array.from('help').reverse().join(''); // pleh
```

or

```javascript
let str = 'help';
[...str].reverse().join(''); // pleh
```

These methods will work on emojis, as `Array.from` handles conversion differently than `split()`.

## Reverse a String Without Built-in Methods

This is a common interview question for junior devs. Here's how to do it with a `for` loop.

```javascript
let str = 'hello world';
let reversed = '';

for(let i = str.length - 1; i >= 0; i--) {
    result +=  str[i];
}

return result;
```

## Using Recursion

Here is the recurisve approach to reversing a string:

```javascript
function reverseString(str = '') {
  const [start = '', ...rest] = str;

  if (rest.length) {
    return reverseString(rest) + start;
  }

  return start;
}

```
