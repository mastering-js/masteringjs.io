JavaScript objects don't have a `filter()` method, you must first turn the object into an array to use [array's `filter()` method](/tutorials/fundamentals/filter).
You can use the `Object.keys()` function to convert the object's keys into an array, and accumulate the filtered keys into a new object using the [`reduce()` function](https://thecodebarbarian.com/javascript-reduce-in-5-examples.html) as shown below.

```javascript
const obj = { firstName: 'Jean-Luc', lastName: 'Picard', age: 59 };

// { firstName: 'Jean-Luc', lastName: 'Picard' }
Object.keys(obj).
  filter((key) => key.includes('Name')).
  reduce((cur, key) => { return Object.assign(cur, { [key]: obj[key] })}, {});
```

Another option is to convert the object into an array of entries using `Object.entries()`, filter the entries, and then convert the array of entries back into an object using `Object.fromEntries()`.

```javascript
// { firstName: 'Jean-Luc', lastName: 'Picard' }
const obj = { firstName: 'Jean-Luc', lastName: 'Picard', age: 59 };
Object.fromEntries(Object.entries(obj).filter(([key]) => key.includes('Name')));
```