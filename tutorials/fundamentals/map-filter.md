JavaScript's [`Array#map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`Array#filter()`](/tutorials/fundamentals/array-filter) functions are great when used together because they allow you
to _compose_ simple functions.

For example, here's a basic use case for `filter()`: filtering out all numbers that are less than 100 from a numeric array.

```javascript
const nums = [25, 125, 75, 200];

function atLeast100(num) {
  return num >= 100;
}

nums.filter(atLeast100); // [125, 200]
```

This function works fine on an array of numbers. But what happens when you need to find the number of products based
on `price`? Do you need a separate `priceAtLeast100()` function? No, you can just use `map()` to transform the `products`
array to fit what the `atLeast100` function expects.

```javascript
const products = [
  { name: 'T-Shirt', price: 25 },
  { name: 'Headphones', price: 125 },
  { name: 'Keyboard', price: 75 },
  { name: 'Monitor', price: 200 }
];

// Gets the number of products whose price is at least 100.
products.map(product => product.price).filter(atLeast100).length;
```

This is an example of [composition](https://whatthefuck.is/composition): by combining `map()` and `filter()`, you can reuse the simple `atLeast100()` function to operate on a slightly different input.

Filter then Map
---------------

The previous example shows why you might want to use `map()` followed by `filter()`. There's also cases where you may
want to use `filter()` followed by `map()`. For example, you may want to check that a nested property exists before
calling `map()`.

```javascript
const orders = [
  { quantity: 2, item: { name: 'T-Shirt', price: 25 } },
  { quantity: 1, item: { name: 'Keyboard', price: 75 } },
  // Maybe there was a bug and a order with a null `item` ended up in the database!
  { quantity: 2, item: null }
];

const orderedItemNames = orders.
  filter(order => order.item != null).
  map(order => order.item.name);
```