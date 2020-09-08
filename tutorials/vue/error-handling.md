[Vue instances have an `errorCaptured` hook](https://vuejs.org/v2/api/#errorCaptured) that Vue calls whenever an [event handler or lifecycle hook throws an error](https://github.com/vuejs/vue/issues/6953#issuecomment-340335435). For example,
the below code will increment a counter because the child component `test` throws an error every time the button is clicked.

```javascript
[require:Vue errorCaptured basic example$]
```

`errorCaptured` Only Catches Errors in Nested Components
-----------------------------------

A common gotcha is that Vue does **not** call `errorCaptured` when the error occurs in the same component that the
`errorCaptured` hook is registered on. For example, if you remove the 'test' component from the above example and
inline the `button` in the top-level Vue instance, Vue will **not** call `errorCaptured`.

```javascript
[require:Vue errorCaptured same component$]
```

Async Errors
------------

On the bright side, Vue does call `errorCaptured()` when an async function throws an error. For example, if a child
component asynchronously throws an error, Vue will still bubble up the error to the parent.

```javascript
[require:Vue errorCaptured async$]
```

Error Propagation
-----------------

You might have noticed the `return false` line in the previous examples. If your `errorCaptured()` function does not return `false`, Vue will bubble up the error to parent components' `errorCaptured()`:

```javascript
[require:Vue errorCaptured multi level propagation$]
```

On the other hand, if your `errorCaptured()` function returns `false`, Vue will stop propagation of that error:

```javascript
[require:Vue errorCaptured stop propagation$]
```