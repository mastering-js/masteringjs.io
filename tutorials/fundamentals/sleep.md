Unlike many other languages, JavaScript doesn't have a built-in function to pause execution for a given period of time. There's
a good reason for this: in languages like C, `sleep(2)` blocks
the current thread for 2 seconds. Since JavaScript is 
single-threaded, C-style `sleep(2)` would block the entire
JavaScript runtime for 2 seconds, and that isn't very useful.

However, you can pause an [async function](https://thecodebarbarian.com/async-functions-in-javascript.html) call 
without blocking the rest of the JavaScript runtime. You
just need to `await` on a promise that resolves after a given
period of time.

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  // Pause execution of this async function for 2 seconds
  await sleep(2000);

  console.log('Waited for 2 seconds');
}
```

The `new Promise()` call uses [JavaScript's promise constructor](/tutorials/fundamentals/promise#the-promise-constructor) to create a new promise that resolves after `ms` milliseconds. And when
you `await` on a promise, you pause execution of that function
until the promise resolves, without impacting other functions.

For example, you can call two functions in parallel that call
`sleep()`, and neither function will block the other.

```javascript
const start = Date.now();

async function pauseMe() {
  await sleep(2000);
  console.log('MS since start:', Date.now() - start);
}

// Will print something like "MS since start: 2006"
pauseMe();
// Will print something like "MS since start: 2010"
pauseMe();
```