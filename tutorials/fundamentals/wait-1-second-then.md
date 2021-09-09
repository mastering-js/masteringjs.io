To delay a function execution in JavaScript by 1 second, wrap a promise execution inside a function and wrap the [Promise's `resolve()`](/tutorials/fundamentals/promise-resolve) in a `setTimeout()` as shown below.
`setTimeout()` accepts time in milliseconds, so `setTimeout(fn, 1000)` tells JavaScript to call `fn` after 1 second.

```javascript
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

delay(1000).then(() => console.log('ran after 1 second1 passed'));
```

You could also wrap the delay call in an [async function](https://thecodebarbarian.com/async-functions-in-javascript.html) to use [async await](/tutorials/fundamentals/async-await) instead of [`then()`](/tutorials/fundamentals/then):

```javascript
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function test() {
  console.log('start timer');
  await delay(1000);
  console.log('after 1 second');
}

test();
```

You may also skip the extra `delay()` function and just inline the [Promise constructor](/tutorials/fundamentals/promise-new) call as shown below.

```javascript
async function test() {
  console.log('start timer');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('after 1 second');
}

test();
```