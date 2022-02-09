One way to delay execution of a function in NodeJS is to use the `seTimeout()` function.
Just put the code you want to delay in the [callback](/tutorials/fundamentals/callbacks).
For example, below is how you can [wait 1 second](/tutorials/fundamentals/wait-1-second-then) before executing some code.

```javascript
setTimeout(function() {
  console.log('This printed after about 1 second');
}, 1000);
```

## Using async/await

You can use async/await with [promises](/tutorials/fundamentals/promise) to delay execution without callbacks.

```javascript
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

run();

async function run() {
  await delay(1000);
  console.log('This printed after about 1 second');
}
```

## Using the Sleep Command

You can use `execSync` to invoke your OS' `sleep` command.

```javascript
const {execSync} = require('child_process');

execSync('sleep 1'); // block process for 1 second.
```

This is different from using the `delay(time)` function from the previous examples because `delay(time)` is still non-blocking.
For example, you can run multiple `delay()` calls in parallel using [`Promise.all()`](/tutorials/fundamentals/promise-all) 

```javascript
async function run() {
  const start = Date.now();
  await Promise.all([delay(1000), delay(1000)]);
  // Prints about 1000, because the `delay()` calls run in parallel
  console.log('Elapsed:', Date.now() - start);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
  
run();
```

However, with `execSync`, you cannot run multiple `execSync('sleep 1')` in parallel.
`execSync()` blocks the _entire_ Node process, meaning no other code can execute.
Be careful about using `execSync()`!

```javascript
const {execSync} = require('child_process');

const start = Date.now();
execSync('sleep 1');
execSync('sleep 1');
// Prints about 2000, because `execSync()` runs in series
console.log('Elapsed:', Date.now() - start);
```