Enum values have a couple limitations but you can work around those by doing the following:

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

This prevents the ability to modify the enum after the fact as well as prevent
values from being assigned to the wrong property, like `enumObject.Up == 'Down'`.

## Using toString() on an Enum

When you call `toString()` on an `enum`, the result is unexpected:

```javascript
createEnum(['Up', 'Down', 'Left', 'Right']).toString() // [object Object];
```

The reason why it prints that is because the `toString()` method has not been overriden in
the custom object. Therefore, we recommend using `Object.keys` to print out the property keys of
the enum.

## Why You Should Use Object.keys()

You should use `Object.keys()` as it will return an array of strings with a string in the array being one of the enum property names.

```javascript
Object.keys(createEnum(['Up', 'Down', 'Left', 'Right'])); // ['Up', 'Down', 'Left', 'Right']
```

