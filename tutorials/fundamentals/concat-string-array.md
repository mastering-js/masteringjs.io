JavaScript's `join()` method is handy for turning elements in
an array into a string. JavaScript arrays can contain values of
different types. If you only want to concatenate strings, you can filter out
non-string values using [`filter()`](/tutorials/fundamentals/filter) and
[`typeof`](/tutorials/fundamentals/typeof).

```javascript
let array = ['The', 97, 'Dream', 'Team'];
let jumble = array.join();
jumble; // 'The 97 Dream Team'

let text = array.filter(v => typeof v === 'string').join();
text; // The Dream Team
```

## Separators

You can specify what character to use to concatenate
the elements in the array. Simply pass, as a string, the
character you wish to use. If you do not provided the character,
it will default to using a `,`:

```javascript
let array = ['user','desktop','learning','tutorials'];
let concatenate = array.join('/');
concatenate; // user/desktop/learning/tutorials
array.join(); // user,desktop,learning,tutorials
```
