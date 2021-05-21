To [check if a variable is undefined](/tutorials/fundamentals/undefined-check),
you should use the [`typeof` operator](/tutorials/fundamentals/typeof).
When used on an `undefined` variable, it will return
`'undefined'`. If you use that in conjunction with the
`===` operator, you can successfully check for those specific
values. The downside to using this method is that if the variable
has not been declared, it will not throw an error. An upside
is that there is [no risk of overwriting undefined](/tutorials/fundamentals/void)
if you use `typeof`.

```javascript
let x;
typeof x; // 'undefined'
if (x === undefined) {
  // will execute
}
if (typeof x === 'undefined') {
  // will also execute
}
```

The benefit of using `=== undefined` or `=== void 0` is that it will throw
an error if the variable has not been declared. The `typeof` operator won't
throw an error if you use it on an undeclared variable as shown below.

```javascript
let x;

typeof x2; // 'undefined' even though `x2` has not been declared!
```
