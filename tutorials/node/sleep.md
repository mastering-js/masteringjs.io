One way to `sleep` in NodeJS is to use the `seTimeout()` function in tandem with callback functions.

```javascript
function example(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 
example(1000).then(() => console.log('ran after 1 second passed'));
```

## using async/await

You can use async/await in tandem with the Promise constructor to achieve the same effect.

```javascript
async function example() {
  console.log('start timer');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('after 1 second');
}

example();
```

## using the sleep command

You can use `execSync` to invoke the `sleep` command that will block the entire process, not the block of code, for the indicated time.

```javascript
const {execSync} = require('child_process');

execSync('sleep 1'); // block process for 1 second.
```