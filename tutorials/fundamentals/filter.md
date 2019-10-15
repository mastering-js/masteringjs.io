The [`Array#filter()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) takes a [`callback` function](/tutorials/fundamentals/callbacks), and returns a new array of elements for which `callback` returns a truthy value.

```javascript
[require:Fundamentals.*Array#filter.*even/odd$]
```

Remember that `filter()` returns a new array. It does **not**
modify the existing array.

```javascript
even === numbers; // false
odd === numbers; // false
even === odd; // false

numbers.length; // 6, `filter()` does not modify `numbers`
```

`filter()` behaves like a [shallow clone](/tutorials/fundamentals/shallow-copy): it only clones the top-level array, not any objects in the array.

```javascript
[require:Fundamentals.*Array#filter.*objects$]
```