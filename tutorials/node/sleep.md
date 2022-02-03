One way to `sleep` in NodeJS is to use the `seTimeout()` function in tandem with callback functions.

```javascript
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 
delay(1000).then(() => console.log('ran after 1 second passed'));
```

## using async/await

You can use async/await in tandem with the Promise constructor to achieve the same effect.

```javascript
async function delay() {
  console.log('start timer');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('after 1 second');
}

delay();
```

## using the sleep command

You can use `execSync` to invoke the `sleep` command that will block the entire process, not the block of code, for the indicated time.

```javascript
const {execSync} = require('child_process');

execSync('sleep 1'); // block process for 1 second.
```

This is different from using the `delay(time)` function from the previous examples because you could run several `delay(time)` functions in parallel. 
With `execSync`, you cannot run multiple `execSync('sleep 1')` in parallel.

```javascript
const {execSync} = require('child_process');


async function run() {
await Promise.all([delay(), delay()])
await Promise.all([example(), example()])
}

function example() {
    console.log('sleep');
    execSync('sleep 1')
}

async function delay() {
    console.log('start timer');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('after 1 second');
}
  
run();
```

When you run this code, you will see the log statements print simultaneously until the script gets to `console.log('sleep')` which will print with a small delay between them.