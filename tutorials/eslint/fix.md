[ESLint's `--fix` option](https://eslint.org/docs/user-guide/command-line-interface#options) tells ESLint to fix whatever
errors in your code that it knows how to fix.

Getting Started
---------------

For example, ESLint's recommended config uses the [`no-extra-boolean-cast` rule](https://eslint.org/docs/rules/no-extra-boolean-cast), which removes unnecessary `!!` in `if` statements. For example, suppose you have the
below `test.js` file. The `!!` in the `if` statement is unnecessary, because JavaScript `if` statements already check
for [truthy values](/tutorials/fundamentals/truthy).

```javascript
if (!!(typeof window === 'undefined')) {
  console.log('Hello from Node.js!');
}
```

Suppose you have the below `.eslintrc.json` config file:

```javascript
{ 
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-extra-boolean-cast": "error"
  }
}
```

ESLint will report a "Redundant double negation" error:

```
$ ./node_modules/.bin/eslint ./test.js 

/scratch/test.js
  1:5  error  Redundant double negation  no-extra-boolean-cast

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.

$ cat ./test.js 
```

Notice the `1 error and 0 warnings potentially fixable with the --fix option` line. That tells you that ESLint knows
how to fix this error. Run `./node_modules/.bin/eslint --fix ./test.js` and that error goes away.

```javascript
$ ./node_modules/.bin/eslint --fix ./test.js 
$ 
$ cat ./test.js
if (typeof window === 'undefined') {
  console.log('Hello from Node.js!');
}
```

Note that ESLint removed the unnecessary `!!`.

ESLint can only automatically fix violations for certain ESLint rules. [ESLint's rules page](https://eslint.org/docs/rules/) has a complete list of built-in ESLint rules and explains which
rules it can automatically apply fixes for.

With npm Scripts
----------------

Developers often run ESLint using [npm run](https://thecodebarbarian.com/3-neat-tricks-with-npm-run). [How to run ESLint with fix via npm script](https://stackoverflow.com/questions/40271230/how-to-run-eslint-fix-from-npm-script) is a common question on StackOverflow.

For example, suppose your `package.json` file includes the below lines:

```javascript
"scripts": {
  "lint": "eslint ."
}
```

In order to run `eslint --fix`, you need to run `npm run lint -- --fix`. Note the extra `--`. You only need the `--` if you're running ESLint in an npm script!