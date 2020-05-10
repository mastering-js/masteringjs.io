Here's [the official guide for using Webpack to compile TypeScript](https://webpack.js.org/guides/typescript/). This tutorial provides an abridged version
explaining how to use Webpack to compile `.ts` files.

Webpack Config
-----

Everything in Webpack starts with the [Webpack config](/tutorials/webpack/config). The key part of `webpack.config.js` for transpilers is the `module.rules`
option. This is where you tell Webpack to use a special loader to
compile a file before bundling. For TypeScript, you need the
[ts-loader npm module](https://www.npmjs.com/package/ts-loader), in
addition to the [typescript npm module](https://www.npmjs.com/package/typescript).

```
npm install typescript ts-loader
```

The [`module.rules` option](https://webpack.js.org/configuration/module/) is an array of rules. The below `webpack.config.js` tells Webpack to use the `ts-loader` module to compile any files that end in '.ts'.

```javascript
module.exports = {
  entry: './index.ts',
  module: {
    // Use `ts-loader` on any file that ends in '.ts'
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // Bundle '.ts' files as well as '.js' files.
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: `${process.cwd()}/dist`,
  }
};
```

Compiling a TypeScript File
---------------------

Below is the `index.ts` file:

```
const str: string = 'Hello, World';

console.log(str);
```

You also need to add a [`tsconfig.json` file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), otherwise TypeScript will error out. For the purposes of this tutorial, the below `tsconfig.json` is enough:

```
{"files":["./index.ts"]}
```

Run `node ./dist/main.js` and you should see Node print out "Hello, World".

```
$ node ./dist/main.js 
Hello, World
$
```