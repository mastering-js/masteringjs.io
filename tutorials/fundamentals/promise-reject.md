The [`Promise.reject()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) is the most concise way to
create a [rejected promise](/tutorials/fundamentals/promise#promises-as-state-machines) that contains a given error. You
should then use [`.catch()`](/tutorials/fundamentals/catch) to handle the error.

```javascript
[require:Fundamentals Promise Reject basic example$]
```

With the Promise Constructor
----------------------------

When you create a promise using `new`, you call the [Promise constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
The Promise constructor takes a single parameter, an `executor` function.
The Promise constructor then executes the `executor` function with 2
arguments: `resolve()` and `reject()`.

```javascript
function executor(resolve, reject) {
  typeof resolve; // 'function'
  typeof reject; // 'function'
}

new Promise(executor);
```

To reject a promise from the executor function, you should just call
`reject()` with an [error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

```javascript
[require:Fundamentals Promise Reject with constructor$]
```

Reject With Non-Error
---------------------

You can reject a promise with any value, not just an error object.

```javascript
[require:Fundamentals Promise Reject non-error$]
```

However, many libraries and frameworks assume that promises are always
rejected with an error. So you should be careful if you choose to
call `Promise.reject()` with a value that isn't an error.