You can disable ESLint for a given line using a [`// eslint-disable-line` comment](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments). For example, the below code would
cause ESLint to complain because of the [`no-use-before-define` rule](https://eslint.org/docs/rules/no-use-before-define) if you remove the `eslint-disable-line` comment.

```javascript
const answer = getAnswer(); // eslint-disable-line

function getAnswer() {
  return 42;
}
```

A `eslint-disable-line` comment disables **all** ESLint rules for a given line.
That is dangerous, because you may unintentionally hide linter errors. For example,
the below line violates both the `no-use-before-define` rule and the [`no-undef` rule](https://eslint.org/docs/rules/no-undef), because `undefinedVar` is never declared.

```javascript
const answer = getAnswer(undefinedVar); // eslint-disable-line

function getAnswer() {
  return 42;
}
```

If you want to disable **just** the `no-use-before-define` rule and leave all other
ESLint rules, you should use `// eslint-disable-line no-use-before-undefined`.
After `// eslint-disable-line`, you can list out the rules you want to disable,
separated by spaces.

```javascript
const answer = getAnswer(undefinedVar); // eslint-disable-line no-use-before-define

function getAnswer() {
  return 42;
}
```

Disable the Next Line
---------------------

Sometimes `// eslint-disable-line` can make a single line too long. You can use
`eslint-disable-next-line` instead:

```javascript
// eslint-disable-next-line no-use-before-define
const answer = getAnswer(undefinedVar);

function getAnswer() {
  return 42;
}
```