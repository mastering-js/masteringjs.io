The easiest way to check what version of Node.js you're using is to run
`node --version` from your terminal. This will print your version of Node.js
as shown below.

```
$ node --version
v10.16.3
$ 
```

You can also get the currently running version of Node.js from Node.js'
built-in [`process.version` property](https://nodejs.org/api/process.html#process_process_version).

```javascript
// `process` is a built-in global in Node.js, no need to `require()`
console.log(process.version); // 'v10.16.3'
```