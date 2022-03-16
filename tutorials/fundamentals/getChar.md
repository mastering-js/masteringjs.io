To get a character from a string in JavaScript, we recommend using square brackets `[]`.
`string[1]` returns a string of length 1 containing the 2nd character in the array.
If you access an index that is `< 0` or greater than the length of the string, you'll get back `undefined`.

```javascript
const string = 'Hello';
const letter = string[1]; // 'e'

string[1]; // 'e'
string[20]; // undefined
string[-1]; // undefined

string['not a number']; // undefined
```

Keep in mind that `string[1]` returns a _string_ with length 1.
There is no distinct character type in JavaScript like there is in [Java](https://docs.oracle.com/javase/7/docs/api/java/lang/Character.html) or [C++](https://www.w3schools.com/cpp/cpp_data_types_char.asp).

```javascript
typeof string[1]; // 'string'
```

## The charAt() function

The `charAt()` function also returns the character at the given index of a string.
There are three key differences.

First, if you call `charAt()` on an index that is `< 0` or greater than the length of the string, `charAt()` will return an empty string.

```javascript
const string = 'Hello';

string.charAt(1); // 'e'
string.charAt(42); // ''
string.charAt(-1); // ''
```

Second, if you call `charAt()` with a value that JavaScript cannot convert to a number, `charAt()` will return the character at index 0.

```javascript
string; // 'Hello'

string.charAt('not a number'); // 'H'
```

Third, `charAt()` can implicitly convert values to numbers.
For example, if you pass an object with a [`valueOf()` function](/tutorials/fundamentals/valueof) to `charAt()`, JavaScript will call `valueOf()` to try to convert the value to a number.
This can lead to unexpected behaviors, like being able to call `charAt()` on a `Date`.

```javascript
string; // 'Hello'

string.charAt({ valueOf: () => 1 }); // 'e'
string.charAt(new Date(1)); // 'e'

string[{ valueOf: () => 1 }]; // undefined
string[new Date(1)]; // undefined
```

Because of the potentially unexpected behaviors of `charAt(i)`, we typically recommend using `[i]` to get the i-th character in a string. 