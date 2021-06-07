JavaScript's `join()` method is handy for turning elements in
an array into a string. You can specify what you want the
elements to be joined by, like  `-`, for example but it defaults to a space.
The downside about being able to concatenate a JavaScript array is that
because JavaScript allows for different types to be in the same
array, you can concatenate values that you didn't want. Thankfully,
you can use the `filter()` method to make sure you are concatentating
the values you desire:

```javascript
let array = ['The', 97, 'Dream', 'Team'];
let jumble = array.join();
jumble; // 'The 97 Dream Team'

let text = array.filter(v => typeof v === 'string').join();
text; // The Dream Team
```
