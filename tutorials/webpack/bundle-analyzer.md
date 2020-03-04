The [webpack-bundle-analyzer npm module](https://www.npmjs.com/package/webpack-bundle-analyzer) generates an interactive [treemap](https://en.wikipedia.org/wiki/Treemapping) (not to be confused with Java's `TreeMap` class) of a given Webpack bundle. This map is useful for finding what
are the npm packages that are adding the most to your bundle size,
so you can see where to focus when trying to trim your bundle size.

Setup
-----

First, you need to install Webpack, webpack-cli, and webpack-bundle-analyzer:

```
npm install webpack webpack-cli webpack-bundle-analyzer
```

Next, let's install [Vue](/vue) and [Axios](/axios) to put together
a trivial Vue app.

```
npm install vue axios
```

Here's an `src/index.js` file creates a simple Vue app.

```
const Vue = require('vue');
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users/1';

const app = new Vue({
  data: () => ({ user: '' }),
  template: `
    <div>
      Hello, {{user}}
    </div>
  `,
  mounted: function() {
    axios.get(url).
      then(res => res.data.name).
      then(user => { this.user = user; }).
      catch(err => console.log(err));
  }
});
```

Running the Bundle Analyzer
---------------------------

To run the bundle analyzer, first you need to run Webpack with the
`--profile` and `--json` flags to export the raw data that the bundle
analyzer needs:

```
$ ./node_modules/.bin/webpack --profile --json > stats.json
```

The `stats.json` file looks something like this:

```
$ head stats.json 
{
  "errors": [],
  "warnings": [
    "configuration\nThe 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.\nYou can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/"
  ],
  "version": "4.42.0",
  "hash": "a4433cf21bc97d0be252",
  "time": 269,
  "builtAt": 1583167656248,
  "publicPath": "",
$
```

Next, run the Webpack bundle analyzer on the `stats.json` file:

```
$ ./node_modules/.bin/webpack-bundle-analyzer stats.json
```

Webpack bundle analyzer will open up a browser window with the tree
map:

<img src="https://codebarbarian-images.s3.amazonaws.com/bundle-analyzer.png" class="inline-image">


[Here's a live example of the above image](/examples/webpack-bundle-analyzer).
The way to read the treemap is that the `node_modules` square contains
everything underneath it. So the bundled `node_modules` contains `vue/dist`
and `axios`. The size of the `vue/dist` square is proportional to the
size of the bundle, so you can tell that `vue/dist` is much bigger than
`axios`.

And underneath `vue/dist` and `axios/lib/core` are the individual files.
Vue is bundled into one `vue.runtime.esm.js` file. And `axios/lib/core`
has several smaller files, the largest one of which is `utils.js`.