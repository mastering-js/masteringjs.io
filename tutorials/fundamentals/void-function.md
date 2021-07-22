[JavaScript's `void` operator](/tutorials/fundamentals/void) always returns `undefined`, no matter what argument you pass it.
`void 0` and `void(0)` are equivalent:

```javascript
void 0; // undefined
void(0); // undefined
```

`void(0)` is often used as a `href` attribute on an `a` tag. The below syntax makes `a` do nothing, preventing an unwanted page refresh:

```html
<a href="javascript:void(0)">
  Nothing Special Link
</a>
```

Although `void(0)` _looks_ like a function call, remember that `void` is **not** a function.

```javascript
void(void); // SyntaxError: Unexpected token ')'
```