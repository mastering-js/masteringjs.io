[Rules](https://eslint.org/docs/rules/) are the fundamental building block for ESLint. Every ESLint configuration
is a collection of rules and how strictly those rules are enforced.
Even [Standard is implemented as a collection of ESLint rules](https://github.com/standard/standard/blob/master/RULES.md).

For example, below is a minimal ESLint config `.eslintrc.json` file that makes ESLint error out if there are unused 
variables. Every ESLint rule has a name: this rule is called `no-unused-vars`. Here's the [documentation for `no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars).

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

Suppose you have the below one-line script `test.js` in the same folder as `.eslintrc.json`. The `message` variable is never used.

```javascript
const message = 'Hello, World!';
```

You can then run ESLint using `./node_modules/.bin/eslint ./test.js`, and get the below output.

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  1:7  error  'message' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)

$ 
```

Error vs Warning
----------------

The `"no-unused-vars": "error"` line tells ESLint that unused variables should cause the linter to fail. ESLint also
supports making a rule a [warning as opposed to an error](https://eslint.org/docs/user-guide/configuring#configuring-rules).
ESLint will still succeed if the only rule violations are warnings.

For example, below is how you make the `no-unused-vars` rule a warning rather than an error.

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

Run ESLint with the above configuration on `test.js`, and you'll get a warning rather than an error.

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  1:7  warning  'message' is assigned a value but never used  no-unused-vars

✖ 1 problem (0 errors, 1 warning)

$ echo $?
0
$ 
```

The `echo $?` command is how you [get the exit code of the last command in Linux](https://shapeshed.com/unix-exit-codes/). Exit code `0` means that the command succeeded, so `eslint` succeeded even though there were warnings.

More Complex Rules
------------------

The `no-unused-vars` rule doesn't leave much room for configuration: either a variable is unused, or it isn't.
A more interesting rule is the [`max-len` rule](https://eslint.org/docs/rules/max-len), which enforces the maximum
length of a line.

By default, setting `"max-len": "error"` will cause ESLint to error out if there's a line with more than 80 characters.
However, you can configure this by setting `max-len` to an array, where the 2nd element in the array is an `options`
object that configures `max-len`. Below is a `.eslintrc.json` that tells ESLint to error out if a line is longer
than 66 characters.

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

Suppose `test.js` contains one line that's 77 characters long:

```javascript
const message = 'This long string makes this line longer than 66 characters';
```

Running ESLint on the above file will report an error:

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  1:1  error  This line has a length of 77. Maximum allowed is 66  max-len

✖ 1 problem (1 error, 0 warnings)

$ 
```


Custom Rules from npm
---------------------

ESLint has a [wide variety of built-in rules](https://eslint.org/docs/rules/), but you can also find new
rules on npm. Many ESLint plugins provide additional rules for working with specific libraries and frameworks.

For example, [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) provides extra Vue-specific
rules. Run `npm install eslint-plugin-vue` and add a `plugins` list to your `.eslintrc.json`. Once you do that,
you get access to Vue-specific rules like [`no-async-in-computed-properties`](https://eslint.vuejs.org/rules/no-async-in-computed-properties.html).

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