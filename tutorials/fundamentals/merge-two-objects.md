To merge two objects in JavaScript, you can use the [spread `...` operator](/tutorials/fudnamentals/spread).
The spread operator creates a new object with all the properties from the first and second object.
If there's two properties with the same name, the property from the second object wins out.

```javascript
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { d: 4, e: 5, f: 6 };
const obj3 = {...obj1, ...obj2}; // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

let user = { name: 'John Smith', age: 29 };
const changes = { name: 'John A. Smith' };
user = { ...user, ...changes }; // { name: 'John A. Smith', age: 29 }
```

## Using Object.assign()

If you want to merge the second object into the first object, instead of creating a new object, you can use `Object.assign()`.
The `Object.assign(target, source)` function merges the source into the target.

```javascript
const target = {a: 1, b: 2, c: 3};
const source = {d: 4, e: 5, f: 6};

Object.assign(target, source);

target; // {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
```

