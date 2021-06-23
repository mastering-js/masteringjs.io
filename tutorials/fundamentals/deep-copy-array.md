When you copy an object in JavaScript, you can either create a [deep copy or a shallow copy](/tutorials/fundamentals/shallow-copy).
The benefit of a deep copy is that it copies nested objects, so you can modify the cloned array without affecting the original array.
The only problem is that you either need a library like [Lodash](https://lodash.com/docs/4.17.15#cloneDeep), or will need to use a combination of `JSON.stringify()` and `JSON.parse()`.

## Lodash

Lodash's `cloneDeep(value)` function will deep copy the array for you.

```javascript
const objects = [{ 'a': 1 }, { 'b': 2 }];
 
const deep = _.cloneDeep(objects);
deep[0] === objects[0]; // returns false

deep[0].a = 2;
objects[0].a; // 1, didn't change
```

Lodash's `cloneDeep()` does a good job of handling edge cases, like cloning dates:

```javascript
const objects = [{ createdAt: new Date('2017-06-01') }];
 
const deep = _.cloneDeep(objects);

deep[0].createdAt === objects[0].createdAt; // false
deep[0].createdAt instanceof Date; // true
objects[0].createdAt instanceof Date; // true
```

## JSON.stringify() and JSON.parse()

This combination of functions does get the job done but is not perfect.

```javascript
const obj = { name: { first: 'Jean-Luc', last: 'Picard' } };
const copy = JSON.parse(JSON.stringify(obj));

copy.name.first = 'Johnny';
obj.name.first; // Jean-Luc
```

**Note:** This approach only works on objects containing the following [JavaScript primitives](/tutorials/fundamentals/primitives):

- Numbers
- Strings
- Booleans
- Objects
- Arrays

If the object you want to copy contains a `date`, for example, it could lead to some problems later on:

```javascript
const obj = { date: new Date() };
const copy = JSON.parse(JSON.stringify(obj));

obj.date instanceof Date; // true
copy.date.instanceof Date; // false, date is now a string
```
