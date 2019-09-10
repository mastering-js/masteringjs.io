A common pattern in JavaScript is passing an inline function as a parameter to another function. For example:

```javascript
[1, 2, 3].forEach(function callback(v) {
  console.log(v); // 1, 2, 3
});

fetch('https://google.com').then(function callback(res) {
  console.log(res);
});

new EventEmitter().on('event', function callback(ev) {
  console.log(ev);
});
```

In the most generic sense, a _callback_ in JavaScript is a function that will
be called for you by someone else. The "someone else" may be a built-in JavaScript
function like [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout), a framework like Express, a library like Axios, or any other bit of
JavaScript code. Callbacks are _reactive_ as opposed to _imperative_: you define a function that should be called by another section of code, but you are not responsible for calling that function.

```javascript
// The JavaScript runtime is responsible for calling `callback`
// in 5 seconds
setTimeout(function callback() {
  console.log('Hello, World!');
}, 5000); 

const app = require('express')();

// Express is responsible for calling `callback` with the
// correct parameters
app.get('/', function callback(req, res) {
  res.send('Hello, World!');
});
```

## Node-style Callbacks

[Promises](/tutorials/fundamentals/promise) are a relatively new addition to JavaScript, they were first added
in 2015. Before promises and async/await, the de facto paradigm for async
operations in Node.js was passing a callback function that took 2 parameters,
an error `err` and a result `res`. When someone talks about ["callback hell"](https://thecodebarbarian.com/2015/03/20/callback-hell-is-a-myth),
they're usually referring to using Node-style callbacks.

For example, the [Node.js SDK for Amazon AWS' S3](https://masteringjs.io/tutorials/node/s3) currently only supports callbacks. For the AWS SDK to notify you when your file upload is complete, you need to pass a callback function.

```javascript
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const options = {
  Bucket: process.env.AWS_BUCKET,
  Body: fs.createReadStream('./package.json'),
  Key: 'package.json'
};

// Pass a `callback` that takes 2 params: `err` and `res`. If `err` is
// null or undefined, you can assume the upload succeeded.
s3.upload(options, function callback(err, res) {
  if (err != null) {
    // If `err` is set, you should handle the error
  }
});
```

The primary purpose of Node-style callbacks is to tell you whether an asynchronous
operation succeeded or failed, and, if it succeeded, what the result was.
Promises have largely replaced Node-style callbacks for this purpose, because
nesting callbacks is syntactically painful, and because Node-style callbacks
were never standardized.

## Callbacks to Promises

[Node.js has a built-in `promisify()` function](https://nodejs.org/api/util.html#util_util_promisify_original) that converts callback-based APIs into functions that return promises. Here's how you can use `promisify()` to convert a Node-callback-based function to a function that returns a promise:

```javascript
[require:Fundamentals.*promisify]
```