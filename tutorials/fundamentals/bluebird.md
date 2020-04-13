[Bluebird](http://bluebirdjs.com/docs/getting-started.html) is a popular promises library for JavaScript. It is a drop-in replacement for native [Promises in JavaScript](/tutorials/fundamentals/promise).

```javascript
global.Promise = require('bluebird');

// Prints "42"
Promise.resolve(42).then(val => console.log(val));
```

Why do people use Bluebird as opposed to native promises? There's 2 reasons:

#### 1. Performance:

Early native promise implementations were slow - the below benchmark script shows that creating a native promise is 3x slower than creating a Bluebird promise in Node.js 8:

```javascript
// global.Promise = require('bluebird');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

// add tests
suite.
  add('new promise', function() {
    return new Promise((resolve, reject) => {});
  }).
  on('cycle', function(event) {
    console.log(String(event.target));
  }).
  on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  }).
  run();
```

Below is the output, first with Bluebird and then with native promises:

```
$ ~/Workspace/libs/node-v8.17.0-linux-x64/bin/node ./bluebird.js 
new promise x 36,846,162 ops/sec ±0.66% (95 runs sampled)
Fastest is new promise
$
$ ~/Workspace/libs/node-v8.17.0-linux-x64/bin/node ./bluebird.js 
new promise x 12,244,609 ops/sec ±1.80% (84 runs sampled)
Fastest is new promise
```

However, in Node.js 12.x native promises are significantly faster
than Bluebird.

#### 2. Long Stack Traces

Bluebird has built-in support for [async stack traces](https://thecodebarbarian.com/async-stack-traces-in-node-js-12). For example, the below script will not print the line where `fn()` was called:

```javascript
Promise.resolve().
  then(fn).
  catch(err => console.log(err));

function fn() {
  return new Promise((resolve, reject) => {
    setImmediate(() => reject(new Error('Oops')));
  });
}
```

You get the below output:

```
$ node ./test
Error: Oops
    at Immediate.setImmediate [as _onImmediate] (/app/test.js:8:31)
    at runCallback (timers.js:705:18)
    at tryOnImmediate (timers.js:676:5)
    at processImmediate (timers.js:658:5)
```

But with Bluebird, you can enable long stack traces as shown below.

```javascript
global.Promise = require('bluebird');
global.Promise.config({ longStackTraces: true });

Promise.resolve().
  then(fn).
  catch(err => console.log(err));

function fn() {
  return new Promise((resolve, reject) => {
    setImmediate(() => reject(new Error('Oops')));
  });
}
```

Running the above script gives you the below stack trace, which includes
the line number on which `fn()` was called:

```
$ node ./test
Error: Oops
    at Immediate.setImmediate [as _onImmediate] (/app/test.js:10:31)
From previous event:
    at fn (/app/test.js:9:10)
    at runCallback (timers.js:705:18)
    at tryOnImmediate (timers.js:676:5)
    at processImmediate (timers.js:658:5)
From previous event:
    at Object.<anonymous> (/app/test.js:5:3)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
```

Integration With Async/Await
----------------------

Unfortunately there is no way to get [async functions](https://thecodebarbarian.com/async-functions-in-javascript.html) to return Bluebird promises. Even if you set `global.Promise = require('bluebird');`, async functions will still return native promises.

```javascript
const NativePromise = global.Promise;
global.Promise = require('bluebird');

async function run() { return 'Hello, World'; }

const p = run();
p instanceof NativePromise; // true
p instanceof global.Promise; // false
```

Should You Use Bluebird or Native Promises?
------------------------------------------

The reality is that, in 2020, most JavaScript apps don't get much benefit
from using Bluebird. Bluebird no longer has a singificant performance advantage
over native promises in Node.js and modern browsers - native promises are
actually faster. However, Bluebird can be a great tool for ensuring you
get consistent performance with older browsers or older versions of Node.js.