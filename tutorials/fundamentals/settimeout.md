JavaScript has a built-in [`setTimeout()` function](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) that registers a function to run after a given amount of time has elapsed.

```javascript
// First param to `setTimeout()` is a callback function
// Second param is milliseconds to wait
setTimeout(function() {
  console.log('I ran after waiting for 1 second');
}, 1000);
```

The `setTimeout()` function registers the given [callback](/tutorials/fundamentals/callbacks) function with JavaScript's event loop, so `setTimeout()` won't block the currently executing function.
For example, the following code will print "In setTimeout" **after** "After setTimeout", even though `callback` is scheduled to run after 0 milliseconds.

```javascript
console.log('Before setTimeout');
setTimeout(function callback() {
  console.log('In setTimeout');
}, 0);
console.log('After setTimeout');
```

## Cancelling the Timeout

There's also a global `clearTimeout()` function.
`setTimeout()` returns a timer ID.
Pass the timer ID to `clearTimeout()` to cancel the timeout.

```javascript
const timeout = setTimeout(function() {
  console.log('This will not print');
}, 100);

clearTimeout(timeout); // Cancel the timeout
```

## With Promises

`setTimeout()` doesn't return a promise.
If you want to wait a certain amount of time before executing some code, like [waiting 1 second](/tutorials/fundamentals/wait-1-second-then), you should use the following pattern.

```javascript
function delay(time) {
  // Wrap `setTimeout()` in a promise
  return new Promise(resolve => setTimeout(resolve, time));
}

delay(1000).then(() => console.log('ran after 1 second'));
```