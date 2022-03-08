To get a character from a string in JavaScript, you can use array indexing.
Accessing a location greater than the length of the string will result in `undefined`.
The strength of this approach is that you can change elements in the array on the fly.

```javascript
const string = 'Hello';
const letter = string[1]; // 'e'

'Hello'[1] === 'e'; // true
'Hello'[20]; // undefined
if(string[0] === 'H') {
    string[0] = 'h';
}
string; // 'hello'
```

## The charAt() function

The `charAt()` function is similar to the array notation approach with the two key differences being that `charAt()` has better built-in error handling and it returns a new string.
If you attempt to pass in a number that is larger that the length of the string, `charAt()` will return an empty string.
If you attempt to pass in a value that cannot be converted to a integer or fail to pass a value in, `charAt()` will default to 0.

```javascript
const string = 'Hello';
string.charAt(42); // ''
string.charAt('f'); // 'H'
string.charAt(); // 'H'
```

The `charAt()` function is better overall mainly because of the built-in error handling.
However, if you needed to change the contents of an array you would be better off using array indexing.

```javascript
let string = 'Hello';
for(let i = 0; i <= string.length; i++) {
    if(string.charAt(i) == '') {
        console.log('Value reached is larger than length of string.');
    }
}
```