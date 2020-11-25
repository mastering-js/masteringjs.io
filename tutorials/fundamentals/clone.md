"Cloning" an object in JavaScript means creating a new object with the same properties as the
original object. Objects in JavaScript are stored by reference, which means that two variables
can point to the same object in memory. Modifying one object variable can impact other variables.

```javascript
const obj1 = { a: true, b: true };
const obj2 = obj1;

obj2.c = true;
obj1.c; // true, because `obj1` points to the same object as `obj2`
```

The two most common reasons to clone objects in JavaScript are:

1. Copying data so you can modify the object without affecting the original object
2. Working with frameworks that rely on immutability for diffing, like [React](https://reactjs.org/docs/update.html)

Whether you're cloning for one of these reasons, or a different reason entirely, is important for
determining what pattern you should use for cloning. Here are 3 different approaches:

Shallow Clone using Spread Operator or `Object.assign()`
----------------------------------------------------

The easiest ways to shallow clone an object in vanilla JavaScript are using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) or the [`Object.assign()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). These approaches are functionally similar, but the [spread operator is slightly faster](https://thecodebarbarian.com/object-assign-vs-object-spread.html).

```javascript
const obj1 = { a: true, b: true };

// Copy `obj1` using the spread operator:
const obj2 = { ...obj1 };

// Copy `obj1` using the `Object.assign()` function:
const obj3 = Object.assign({}, obj1);

obj2.c = true;
obj3.d = true;
Object.keys(obj1); // ['a', 'b']
```

The spread operator is commonly used for [immutable updates for React projects](https://redux.js.org/recipes/using-object-spread-operator). The idea is that every time you update an object, you clone
the object. Cloning the object every time you update it makes checking for changes easier, because
you can use `===` to check whether the object changed.

```javascript
const oldState = { count: 0, username: 'test' };

// Instead of `++oldState.count`, you can clone and create a new object
const newState = { ...oldState, count: 1 };

// Checking if something changed is much easier!
oldState === newState; // false
```

While pattern of copying objects to modify them is common, do **not** use this approach unless
you're using React and you're sure you need to. In most cases, cloning a whole object to modify
one property is highly wasteful, and this pattern can also lead to bugs in other frameworks.

Deep Clone using `JSON.stringify()`
---------------------------------

Shallow cloning using the spread operator is easy and relatively fast. But, because it is a
[shallow clone rather than a deep clone](/tutorials/fundamentals/shallow-copy), it doesn't recursively
clone nested objects!

```javascript
const obj1 = {
  a: { value: true },
  b: { value: true }
};

// Copy `obj1` using the spread operator:
const obj2 = { ...obj1 };

obj2.a.value = false;
// false, because `a` points to the same object after shallow cloning!
obj1.a.value;
```

In other words, "deep clone" just means "recursively shallow clone all objects." One trick you
can use to deep clone an object _without_ writing any recursion yourself is to use `JSON.parse(JSON.stringify(obj1))`. In other words, convert the object you want to clone into JSON, and then
parse it again.

```javascript
const obj1 = {
  a: { value: true },
  b: { value: true }
};

// Deep clone `obj1` using parse and stringify.
const obj2 = JSON.parse(JSON.stringify(obj1));

obj2.a.value = false;
// true, because `obj2` is a deep clone
obj1.a.value;
```

While `JSON.parse(JSON.stringify())` is easy, it comes with a lot of caveats. Using this pattern
works fine if your object only contains primitive values, [POJOs](/tutorials/fundamentals/pojo), and [arrays](http://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html). But once you introduce
classes like `Date`, this pattern fails to actually clone the object, because `JSON.stringify()` converts dates to strings.

```javascript
[require:Fundamentals.*shallow copy.*json stringify date]
```

Deep Clone Using Lodash
-----------------------

[Lodash's `deepClone()` function](https://lodash.com/docs/4.17.15#cloneDeep) is a much more robust
deep clone than `JSON.parse(JSON.stringify())`. It handles many common edge cases, like dates and
[Node.js buffers](/tutorials/node/buffer). For example:

```javascript
[require:lodash deepClone$]
```

If you're looking to copy an arbitrary object that may contain nested objects so you can safely
modify any property without affecting the original object, `_.cloneDeep()` is the way to go.
Recursively using the spread operator is tricky if you don't know the structure of the object,
although you can use the spread operator if you know for a fact the objects you're cloning don't
have nested objects.