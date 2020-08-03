You can [configure ESLint](https://eslint.org/docs/user-guide/configuring) using either a `.eslint.*` file or an
`eslintConfig` option in your `package.json` file. Your `.eslint.*` file may be either `.eslintrc.json`, `.eslintrc.js`, or
`.eslintrc.yml`.

Below is a simple `.eslintrc.json` file that enables the [`no-unused-vars` ESLint rule](https://eslint.org/docs/rules/no-unused-vars):

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-unused-vars": "error"
  }
}
```

You can also define your ESLint config as a JavaScript object that exports a file. Below is the equivalent `.eslintrc.js` file.

```javascript
module.exports = {
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    no-unused-vars: 'error'
  }
};
```

If you prefer [YAML](https://yaml.org/), you can also write a `.eslintrc.yml` file.

```yaml
parserOptions:
  ecmaVersion: 2020
rules:
  no-unused-vars: error
```

Given each of the above ESLint config files, running ESLint on the below script `test.js` will print a "'message' is assigned a value but never used" error.

```javascript
const message = 'Hello, World';
```

Below is the output when you run `eslint` from the command line on the above `test.js` file.

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  1:7  error  'message' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)

$ 
```

Rules
------------------

The `rules` option is the most important. [ESLint rules](/tutorials/eslint/rules) let you configure what patterns
ESLint treats as errors or warnings. The `rules` option is a map from ESLint rule names to rule configurations. A
rule configuration may be either a string or an array.

If a rule configuration is a string, it must be either `'off'`, `'warn'`, or `'error'`. `'off'` tells ESLint to ignore
the given rule. `'warn'` tells ESLint to treat violations of the given as a warning. And `'error'` tells ESLint to error out when the given rule is violated. For example, below is a `.eslintrc.json` that treats `no-unused-vars` as a warning.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

If the rule configuration is an array, the first element of the array must be a string (either `'off'`, `'warn'`, or `'error'`), and the 2nd element is options for configuring that individual rule. For example, the below `.eslintrc.json` tells ESLint to error out when any line of code is more than 66 characters long using the [`max-len` rule](https://eslint.org/docs/rules/max-len).

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "max-len": ["error", { "code": 66 }]
  }
}
```

Using `extends`
---------------

Listing out every single ESLint rule you want to use is often infeasible, so ESLint provides an [`extends` option](https://eslint.org/docs/user-guide/configuring#extending-configuration-files)
that lets you extend an existing ESLint config, and make overrides.

For practical purposes, we recommend using ESLint's built-in `eslint:recommended` config as a starting point if you're
building your own ESLint config.

```javascript
{
  "extends": "eslint:recommended"
}
```

You can find a [complete list of rules in ESLint's recommended config here](https://eslint.org/docs/rules/).
You can overwrite individual rules in ESLint's recommended config by specifying your own `rules` property.
For example, the below ESLint config uses the recommended config, **except** for disabling the `no-undef` rule.

```javascript
{
  "extends": "eslint:recommended",
  "rules": {
    "no-undef": "off"
  }
}
```

Parser Options
--------------

The `parserOptions` config option tells ESLint what version of JavaScript you're targeting. For example, the below JavaScript is valid when you set `parserOptions.ecmaVersion` to `2017`:

```javascript
(async function() {
  console.log('Hello, World!');
})();
```

However, if you change `parser.ecmaVersion` to `2016`, ESLint will fail with the below error, because async functions were introduced in ES2017.

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  1:8  error  Parsing error: Unexpected token function

✖ 1 problem (1 error, 0 warnings)

$ 
```

ESLint also has built-in support for [JSX](https://thecodebarbarian.com/overview-of-jsx-with-non-react-examples.html).
For example, suppose you have the below `test.js` file:

```javascript
const hello = () => <h1>Hello, World</h1>;
```

Normally, ESLint would throw an error `Parsing error: Unexpected token <` on the above script. But you can enable
JSX by setting `parserOptions.ecmaFeatures.jsx` to `true` as shown below.

```javascript
{ 
  "parserOptions": {
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "jsx": false
    }
  }
} 
```

Environments
------------

Just specifying the `ecmaVersion` isn't always enough. Different JavaScript runtimes and frameworks have different global
variables and semantics. For example, the below script works fine in Node.js, but not in browsers because browsers
don't have a global variable `process`.

```javascript
process.env.MESSAGE = 'Hello, World';
```

With the below ESLint config, you'll get a "'process' is not defined" error.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-undef": "error"
  }
}
```

But once you tell ESLint that this script will run in Node.js using `"env": { "node": true }`, ESLint won't error
out on the above script.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "env": {
    "node": true
  },
  "rules": {
    "no-undef": "error"
  }
}
```

Another commonly used `env` is `browser`, which tells ESLint that this script will run in the browser. This lets your
script access browser-only global variables, like `window`.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "env": {
    "browser": true
  },
  "rules": {
    "no-undef": "error"
  }
}
```

The ESLint docs have a [complete list of supported environments](https://eslint.org/docs/user-guide/configuring#specifying-environments).

Plugins
-------

ESLint comes with a [wide variety of built-in rules](https://eslint.org/docs/rules/), but you can also find numerous
plugins that have additional rules on npm. Many ESLint plugins provide additional rules for working with specific libraries and frameworks.

For example, [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) provides extra Vue-specific
rules. After running `npm install eslint-plugin-vue`, you can add a list of `plugins` to your ESLint config that
includes 'eslint-plugin-vue', or just 'vue' for short because ESLint is smart enough to prefix 'eslint-plugin-' for you.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "plugins": ["eslint-plugin-vue"]
}
```

Once you do that,
you get access to Vue-specific rules like [`no-async-in-computed-properties`](https://eslint.vuejs.org/rules/no-async-in-computed-properties.html). The below ESLint config turns on the `no-async-in-computed-properties` rule.

```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "plugins": ["eslint-plugin-vue"],
  "rules": {
    "vue/no-async-in-computed-properties": "error"
  }
}
```

If you run ESLint on the below `test.js` file, the `vue/no-async-in-computed-properties` rule will error out because
`badProperty` is set to an async function:

```javascript
const Vue = require('vue');

module.exports = Vue.component('bad-component', {
  template: '<h1>Hello</h1>',
  computed: {
    badProperty: async function() { return 42; }
  }
});
```

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  6:18  error  Unexpected async function declaration in "badProperty" computed property  vue/no-async-in-computed-properties

✖ 1 problem (1 error, 0 warnings)

$ 
```