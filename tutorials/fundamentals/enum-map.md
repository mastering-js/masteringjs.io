JavaScript doesn't support enums natively, but you can use [POJOs](/tutorials/fundamentals/pojo) to simulate [vanilla JavaScript enums](/tutorials/fundamentals/enum) as shown below.

```javascript
function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

// { Up: 'Up', Down: 'Down', Left: 'Left', Right: 'Right' }
createEnum(['Up', 'Down', 'Left', 'Right']);
```

Since a JavaScript enum is just an object, you can [iterate over an object](/tutorials/fundamentals/iterate-object) using `map()` and `Object.keys()` as shown below.

```javascript
// { Up: 'Up', Down: 'Down', Left: 'Left', Right: 'Right' }
const direction = createEnum(['Up', 'Down', 'Left', 'Right']);

// ['UP', 'DOWN', 'LEFT', 'RIGHT']
const uppercaseNames = Object.keys(direction).map(key => key.toUpperCase());
```
