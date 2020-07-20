There are several easy ways to clone an array in JavaScript. You can use the [`Array#slice()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), or the [spread operator](https://thecodebarbarian.com/object-assign-vs-object-spread.html).

```javascript
const arr = ['hello', 'world'];

// Clone using `slice()`
const arr2 = arr.slice();
arr2; // ['hello', 'world']
arr2 === arr; // false

// Clone using spread operator `...`
const arr3 = [...arr];
arr2; // ['hello', 'world']
arr2 === arr; // false
```

Two other common approaches are by [`concat()`-ing the array to an empty array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) and by using the `map()` method:

```javascript
// Clone using `concat()`
const arr4 = [].concat(arr);
arr4; // ['hello', 'world']
arr4 === arr; // false

// Clone using `map()`
const arr5 = arr.map(v => v);
arr5; // ['hello', 'world']
arr5 === arr; // false
```

These 4 approaches for copying an array are effectively identical and there isn't much reason to prefer one over
the other. The most significant difference is that [`slice()` enjoys slightly better browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#Browser_compatibility) - all the
way back to Internet Explorer 4.

Deep Copy vs Shallow Copy
-------------------------

Keep in mind that all 4 of the above approaches create a [shallow clone](/tutorials/fundamentals/shallow-copy) of the
array. In other words, they clone the array itself, but **not** the array elements.

This difference doesn't matter when you have an array of primitives (numbers, strings, `null`, `undefined`), but
it does when you have an array of objects.

```javascript
const arr = [{ answer: 42 }];

const arr2 = arr.slice();
arr2[0].answer = 0;

// `0`, because `arr[0]` is a reference to the same object as `arr2[0]`
arr[0].answer;
```

JavaScript doesn't have a built-in approach for deep cloning an array. You would need to use a library that
has a `cloneDeep()` function, like [lodash](/lodash).

```javascript
const arr = [{ answer: 42 }];

const arr2 = require('lodash').cloneDeep(arr);
arr2[0].answer = 0;

// `42`, because Lodash did a deep clone.
arr[0].answer;
```