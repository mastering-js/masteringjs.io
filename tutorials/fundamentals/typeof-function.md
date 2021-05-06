[`typeof`](/tutorials/fundamentals/typeof) is a useful operator that returns the [primitive type](/tutorials/fundamentals/primitives) of the given variable.
`typeof` can be used with function-like syntax, however, it is **not** a function.
Be careful, you will get a syntax error if you try to use `typeof` as a variable!

```javascript
typeof(42); // `number`
typeof(typeof); // syntax error
```

You can use `typeof` on functions, and it will return as
`function`.

```javascript
function test() {
  console.log('hello world');
}
typeof test; // 'function'
```
