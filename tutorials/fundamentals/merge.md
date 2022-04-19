To merge two objects in JavaScript, you can use the [spread `...` operator](/tutorials/fudnamentals/spread).

```javascript
const obj1 = {a: 1, b: 2, c: 3};
const obj2 = {d: 4, e: 5, f: 6};
const obj3 = {...obj1, ...obj2}; // {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
```

## Using Object.assign()

If you want to keep the properties contained in one object, you can use `Object.assign()`.
The `Object.assign(target, source)` function merges the source into the target.

```javascript
const target = {a: 1, b: 2, c: 3};
const source = {d: 4, e: 5, f: 6};

Object.assign(target, source);

target; // {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
```

