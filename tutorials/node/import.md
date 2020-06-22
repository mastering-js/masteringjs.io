[Node.js 12 introduced support for the `import` statement](https://thecodebarbarian.com/nodejs-12-imports) behind a `--experimental-modules` flag and a [`package.json` configuration option](https://nodejs.org/api/esm.html#esm_package_json_type_field). Node.js 14 removes the need
for the `--experimental-modules` flag, but you still need to configure your `package.json`.
Here's how you can use ES6 imports in Node.

Setup
-----

Suppose you have two JavaScript files: `index.js` and `test.js`. The `test.js` file
exports a simple function:

```javascript
export default function test() {
  console.log('Hello, World');
}
```

The `index.js` file imports the `test.js` file:

```javascript
import test from './test.js';

test();
```

When using ES6 imports in Node.js, you must put the file extension `.js`, except for [so-called "bare paths"](http://2ality.com/2019/04/nodejs-esm-impl.html#es-module-specifiers-in-nodejs) for importing packages your `./node_modules`. Putting `import test from './test'` will throw an error.

To run `index.js`, you need to create a `package.json` file with a [`type` property](https://nodejs.org/api/esm.html#esm_package_json_type_field) set to `"module"`.
Below is a minimal `package.json` file to enable running `index.js` in Node.js 14, or Node.js 12 with `--experimental-modules`.

```javascript
{ "type": "module" }
```

Importing NPM Modules
--------------------

To import a module you installed via [npm](https://thecodebarbarian.com/an-introduction-to-npm), you can import the package name. The below example
shows how you can import [Mongoose](https://mongoosejs.com/) using ES6 imports.

```javascript
import mongoose from 'mongoose';

console.log(mongoose.version); // 5.9.19
```

Node.js takes care of the quirks of interopability between CommonJS (Node's `require()`)
and ESM (ES6 `import`). So even though Mongoose 5 uses CommonJS internally, your project
can `import` it as it would any ESM module.

Note that bare paths **only** work for the top-level npm module, not for files in the
npm module. For example, you can get Lodash's `omit()` function in CommonJS by calling
`require('lodash/omit')`. Using ESM imports, you need to add `.js` at the end.

```javascript
import omit from 'lodash/omit.js';

console.log(omit({ a: 1, b: 2 }, ['b'])); // { a: 1 }
```