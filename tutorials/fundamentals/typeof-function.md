`typeof` is a useful operator that returns, as a string,
the `typeof` the variable it is used against. `typeof` can
be used with function syntax, however, it is not a function
and so you must be careful to not trigger a syntax error.

```javascript
typeof(42); // `number`
typeof(typeof) // syntax error
```

You can use `typeof` on functions, and it will return as
`function`.

```javascript
function test() {
    console.log('hello world');
}
typeof test; // function. Omit the parenthesis, otherwise it will return undefined.
```
