[ESLint](https://eslint.org/) analyzes your code to find issues based on pre-defined
rules. However, sometimes you need to break an ESLint rule. ESLint supports 2 mechanisms
for [ignoring rule violations in code](https://eslint.org/docs/user-guide/configuring):

- Using comments, which let you [disable certain rules](https://eslint.org/docs/user-guide/configuring#using-configuration-comments) for a line or code block.
- Using the [`.eslintignore` file](https://eslint.org/docs/user-guide/configuring#eslintignore).

Disabling ESLint With a Comment
-------------------------------

ESLint lets you disable individual lint rules using `/* eslint */` comments.
For example, many ESLint rules [disallow using JavaScript's `eval()` function](https://eslint.org/docs/rules/no-eval), because [`eval()` has several security concerns](https://alligator.io/js/eval/). However, if you're really certain you want to allow `eval()`,
you can disable the lint rule as follows:

```javascript
const res = eval('42'); // eslint-disable-line no-eval
```

The `// eslint-disable-line` comment disables the `no-eval` rule for just that line.

You can also disable the `no-eval` rule for an entire function block by using [`/* eslint-disable */`](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments).

```javascript
function usesEval() {
  /* eslint-disable no-eval */
  const res = eval('42');
  const res2 = eval('test');

  return res2 + res;
}
```

If you put `/* eslint-disable no-eval */` before any code in a `.js` file, that will disable the `no-eval` rule for the **entire** file.

You can also disable all ESLint rules by putting `/* eslint-disable */` at the top
of a file.

Using [`.eslintignore`](https://eslint.org/docs/user-guide/configuring#eslintignore)
---------------------

You can use comments to disable all ESLint rules for a file, but [doing so is often discouraged](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-abusive-eslint-disable.md). If you're certain you want to make ESLint ignore
a file, it is typically better to list it out in a `.eslintignore` file in your project's root directory.

`.eslintignore` syntax is similar to that of [`.gitignore`](https://git-scm.com/docs/gitignore). To ignore a file `myfile.js`, all you need to do is add the following line
to `.eslintignore`:

```
myfile.js
```

ESLint supports globbing files. To ignore all files that end in `.test.js`, you can
add this line to `.eslintignore`:

```
*.test.js
```

ESLint considers paths in `.eslintignore` relative to the location of the `.eslintignore` file. Below is how you ignore all files in your project's `data`
directory.

```javascript
data/*
```