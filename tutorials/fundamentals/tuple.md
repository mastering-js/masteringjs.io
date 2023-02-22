In JavaScript, a [tuple](https://github.com/tc39/proposal-record-tuple) is effectively an immutable array of primitives with known length.
You can use a plain [JavaScript array](https://thecodebarbarian.com/the-80-20-guide-to-javascript-arrays.html) as a tuple to handle cases like returning multiple values as follows.

```javascript
function getCoordinates() {
  const x = 1;
  const y = 2;
  const z = 3;

  return [x, y, z];
}

// Use array destructuring to get values from the "tuple"
const [x, y, z] = getCoordinates();
```

### In TypeScript

TypeScript supports a tuple type: `[number, number, number]` is a tuple of 3 numbers.
Attempting to access the 4th element of a tuple of length 3 throws a compiler error as follows.

```ts
function getCoordinates(): [number, number, number] {
  const x = 1;
  const y = 2;
  const z = 3;

  return [x, y, z];
}

// tuple.ts:10:17 - error TS2493: Tuple type '[number, number, number]' of length '3' has no element at index '3'.
const [w, x, y, z] = getCoordinates();
```

If you need a tuple type, TypeScript can help enforce tuple behavior at compile time.

### Using Proxies in JavaScript

You can use [proxies](https://thecodebarbarian.com/2015/04/24/80-20-guide-to-ecmascript-6-proxies) to enforce tuples at runtime.
Just to recap, a tuple has 3 properties:

1. Only stores primitives
2. Has known length - accessing outside the bounds of the array throws an error
3. Immutable - no writes allowed

Here's how you can implement a function that returns a tuple that satisfies the above constraints using proxies:

```javascript
const arr = [1, 2, 3];

function Tuple(arr) {
  if (arr.find(el => !['string', 'number', 'bigint', 'boolean', 'undefined', 'symbol', 'null'].includes(typeof el))) {
    throw new Error('Tuple can only store primitives');
  }
  return new Proxy(arr, {
    get(target, prop, receiver) {
      if (isNaN(prop)) {
        return undefined;
      }
      prop = +prop;
      if (prop < 0 || prop >= arr.length) {
        throw new Error('Cannot access tuple index ' + prop);
      }
      return arr[prop];
    },
    set() {
      throw new Error('Cannot modify tuple');
    }
  });
}

const tuple = Tuple([1, 2, 3]);

tuple[0];
tuple[4]; // Error: Cannot access tuple index 4
tuple.push(4); // TypeError: tuple.push is not a function
```

Unfortunately, there is no way to make two tuples `===` each other in JavaScript.
Objects are _always_ compared by reference in JavaScript.