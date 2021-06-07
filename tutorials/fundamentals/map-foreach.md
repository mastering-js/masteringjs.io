JavaScript's `Map` object has a handy function, `forEach()`,
which operates similarly to the `Array forEach()` function.
It takes a arrow or callback function as the first parameter, and you
can pass the `value`, `key`, and `map` as the parameters to the passed
function:

```javascript
const treasure = new Map();
treasure.set('0', 'x');
treasure.set('1', 'marks');
treasure.set('2', 'the spot');

treasure.forEach((value,key,treasure) => {
console.log('value, key ', value, key);
});
```

## Map.entries()

If you don't want to use `Map.forEach()`, you can use `Map.entries()`.
`Map.entries()` returns a new `Map` iterator object, and so to get to the
key value pairs you must chain `.next().value` onto `Map.entries()`:

```javascript
const treasure = new Map();
treasure.set('0', 'x');
treasure.set('1', 'marks');
treasure.set('2', 'the spot');

treasure.entries().next().value; // will return ['0', 'x']
```

You must subsequently call `treasure.entries().next().value` to get the other values.

## Map.keys()

If you only need the keys of the `Map`, you can use `Map.keys()`.
You must follow the same structure as `Map.entries()`, and will get
the corresponding key:

```javascript
const treasure = new Map();
treasure.set('0', 'x');
treasure.set('1', 'marks');
treasure.set('2', 'the spot');

treasure.keys().next().value; // will return '0'
```

## Map.values()

You can conversly use `Map.values()` to get the values of the `Map`:

```javascript
const treasure = new Map();
treasure.set('0', 'x');
treasure.set('1', 'marks');
treasure.set('2', 'the spot');

treasure.keys().next().value; // will return 'x'
```
