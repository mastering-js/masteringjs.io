The easiest way to check whether a file exists in Node.js is using the `fs/promises` module's [`access()` function](https://nodejs.org/api/fs.html#fspromisesaccesspath-mode).
The `access()` function returns a [promise](/tutorials/fundamentals/promise) that rejects if the file does not exist.
With `await`, `await fsPromise.access(filename)` will throw an error if the file does not exist.

```javascript
const fsPromises = require('fs/promises');

async function run() {
  // Works, returns undefined
  await fsPromises.access(__filename);

  // Throws "Error: ENOENT: no such file or directory"
  await fsPromises.access('./some-file-that-does-not-exist');
}

run().catch(err => {
  console.error(err);
  process.exit(-1);
});
```

## Legacy Alternatives

In older Node.js projects, you may see the fs module's [`exists()`](https://nodejs.org/api/fs.html#fsexistspath-callback) or [`existsSync()`](https://nodejs.org/api/fs.html#fsexistssyncpath) functions used instead.
`exists()` is currently deprecated, so we do not recommend using it.


`existsSync()` is not currently deprecated. However, `existsSync()` is synchronous, which means you should never use it in any transactional code, like [Express](https://expressjs.com/) route handlers.
You may use `existsSync()` in scripts for convenience, but you should prefer to use `fsPromises.access()` unless you have a good reason to use `existsSync()`.