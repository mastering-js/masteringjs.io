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

## Using toString() on an Enum

Since an enum is just an object, `toString()` doesn't print the actual contents of the enum.

```javascript
createEnum(['Up', 'Down', 'Left', 'Right']).toString(); // '[object Object]'
```

You should use `Object.keys()` instead, which returns an array of strings containing each of the enum property names.

```javascript
Object.keys(createEnum(['Up', 'Down', 'Left', 'Right'])); // ['Up', 'Down', 'Left', 'Right']
```

