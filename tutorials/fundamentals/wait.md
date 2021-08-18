To delay a function execution in JavaScript, wrap a promise execution inside a function in combination with using `setTimeout()`.
`setTimeout()` accepts time in milliseconds, so `1 second == 1000 milliseconds`.

```javascript
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

delay(3000).then(() => alert('ran after 3 seconds passed'));
```

You could also wrap the delay call in an async function to use `await` instead of `.then()`:

```javascript
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function test() {
  console.log('start timer');
  await delay(3000);
  console.log('after 3 seconds');
}

test();
```