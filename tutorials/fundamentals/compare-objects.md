In JavaScript, objets are always stored by reference. That means one object is [strictly equal](/tutorials/fundamentals/equality)
another _only_ if they both point to the same object in memory.

```javascript
const o1 = { answer: 42 };
const o2 = o1;
const o3 = { answer: 42 };

o1 === o2; // true, same reference
o1 === o3; // false, different reference but same keys and values
```

However, what if you want to check whether two [POJOs](/tutorials/fundamentals/pojo) have the same data? In other words, the same keys and values? Here's 3 possible approaches.

Keys and Values Shallow Equal
---------------------------

One simple approach is to iterate through each key and value in the two objects and check if the keys and values are strictly equal.

```javascript
[require:Fundamentals compare objects shallow equal$]
```

Deep Equality using `JSON.stringify()`
----------------------------

The previous section shows how to compare objects by checking if the two objects' keys and values are strictly equal. But what if one of the values is an object?

```javascript
const o1 = { name: { first: 'Arthur', lastName: 'Dent' }, planet: 'Earth' };
const o2 = { name: { first: 'Arthur', lastName: 'Dent' }, planet: 'Earth' };

objectsEqual(o1, o2); // false, because `o1.name !== o2.name`
```

You can make `objectsEqual()` recursive, but then you need to be careful about infinite recursion.
An easy way to compare whether two POJOs are deeply equal is comparing their JSON representations
using [`JSON.stringify()`](/tutorials/fundamentals/stringify):

```javascript
const o1 = { name: { first: 'Arthur', lastName: 'Dent' }, planet: 'Earth' };
const o2 = { name: { first: 'Arthur', lastName: 'Dent' }, planet: 'Earth' };

JSON.stringify(o1) === JSON.stringify(o2); // true

delete o2.planet;
JSON.stringify(o1) === JSON.stringify(o2); // false
```

The `JSON.stringify()` function comes with a few limitations that make it a lackluster choice for checking deep equality. First, key order matters:

```javascript
const o1 = { question: null, answer: 42 };
const o2 = { answer: 42, question: null };
JSON.stringify(o1) === JSON.stringify(o2); // false
```

Second, not all types are representable in JSON. The `JSON.stringify()` function converts dates
to strings, and ignores keys whose value is `undefined`, which can lead to surprising results.

```javascript
const o1 = { myDate: new Date('2016-06-01'), otherProperty: undefined };
const o2 = { myDate: '2016-01-01T00:00:00.000Z' };

JSON.stringify(o1) === JSON.stringify(o2); // true
```

Using Lodash's `isEqual()`
--------------------------

[Lodash's `isEqual()` function](https://lodash.com/docs/4.17.15#isEqual) is the most sophisticated way to compare two objects. It handles a wide variety of edge cases and avoids a lot of the pitfalls of the previous two approaches.

```javascript
[require:lodash isEqual built-in classes$]
```

```javascript
[require:lodash isEqual using classes$]
```

The `isEqual()` function is also smart enough to avoid infinite recursion.

```javascript
[require:lodash isEqual avoids infinite recursion$]
```

If you're already using Lodash, `isEqual()` is the best approach to comparing if two objects are deep equal. The shallow strict comparison approach is good for cases where you aren't worried about nested objects, and `JSON.stringify()` can help provide a rough deep equality check in cases where you can't use Lodash. But, if you can use Lodash, `isEqual()` is the best approach for checking whether two objects are deeply equal.