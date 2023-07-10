In CommonJS mode, [`__dirname` is a variable that contains the current file's directory](https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname).
Many Node.js projects rely on this variable, but you can't use `__dirname` in ESM mode.
You have two options:

1) Disable ESM mode and use CommonJS instead, or
2) Polyfill `__dirname`

Disable ESM Mode
----------------

While ESM is likely the future of JavaScript imports, ESM comes with friction, and there's [nothing wrong with avoiding ESM for now](/tutorials/node/import-vs-require).
To disable ESM, you need to remove the following line from your `package.json` file:

```
{ "type": "module" }
```

Or, if your JavaScript files end in `.mjs`, you need to rename them to `.js`.

Polyfill `__dirname`
--------------------

In ESM mode, `import.meta.url` contains the URL (file path prefixed with `file://`) to the current JavaScript file.
In order to convert the file URL into the directory path, you need to:

1. Convert the file URL into a file path using [Node's `fileURLToPath()`](https://nodejs.org/api/url.html#urlfileurltopathurl)
2. Remove the file part of the file path, leaving you with just the current directory.

The following code gets you the correct `__dirname`.

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
```