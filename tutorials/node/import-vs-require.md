[Node.js introduced support for the `import` statement](https://thecodebarbarian.com/nodejs-12-imports) in Node.js 12, although you need to opt in by setting a [`package.json` configuration option](https://nodejs.org/api/esm.html#esm_package_json_type_field).
However, Node.js has no plans to drop support for `require()` (CommonJS). Which should
you use?

Below is a high-level summary of the tradeoffs:

1. ESM `import` is part of the JavaScript language spec, `require()` is not.
2. `import` requires a special configuration option in `package.json`.
3. `import` does not support importing JSON files. You'll get a `Unknown file extension ".json"` error if you try to `import` a file that ends in `.json`.
4. Even though ESM modules work in both the browser and Node.js, there's no guarantee that your Node.js code will work in the browser and vice-versa.
5. Several Node.js features don't work with ESM: `NODE_PATH`, `__dirname`, `__filename`, and `require.extensions` don't work if you opt in to `{ "type": "module" }`.

Recommendations
--------------

Even though there are numerous tradeoffs, none of the tradeoffs is sufficiently important
for us to recommend using one or the other in all cases. Here's a few reasons why you
might prefer one over the other:

1. If you're building a full-stack application and want to use the same syntax all the way through, using ESM imports is a good choice.
2. If your app uses `__dirname` for relative file paths with `fs`, you need to use `require()` or refactor your app.
3. If you rely on importing JSON files (configuration, seed data, etc.) you need to use `require()`, or refactor your app to instead read JSON files using `fs`.

For now, Mastering JS will stick to using `require()`, because that's what we're used to and we don't know of a compelling enough reason to switch.