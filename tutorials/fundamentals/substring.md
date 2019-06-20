The difference between the [`String#substring()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) and [`String#substr()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) functions is a common source of confusion. Even experienced JavaScript developers mix them up sometimes. There's also a third way to get a substring, the [`String#slice()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice), that you may see in the wild. In this tutorial, you'll learn the difference between these 3 ways to get a substring in JavaScript.

`String#substring()`
--------------------

The [`substring()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) is the most common way to get a substring in JavaScript. It takes two parameters: `indexStart` and `indexEnd`. It returns the portion of the string that starts at `indexStart` and ends the character immediately preceding `indexEnd`. For example:

```javascript
[require:Fundamentals.*substring.*with 2 args]
```

If you don't specify `indexEnd`, the `substring()` function returns the rest of the string starting at `indexStart`.

```javascript
[require:Fundamentals.*substring.*with 1 arg]
```

The `substring()` function has some quirky behavior in edge cases:

- If `indexStart` or `indexEnd` is less than 0, it is treated as 0.
- If `indexEnd < indexStart`, the two are swapped.

For example, `substring(4, -1)` is equivalent to `substring(4, 0)`, which in turn is equivalent to `substring(0, 4)` as shown below.

```javascript
[require:Fundamentals.*substring.*negative]
```

`String#substr()`
-----------------

The [`substr()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) is also common, but it is considered a "legacy function" in [Mozilla's docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr). You shouldn't use it when writing new code, but you may see it in existing JavaScript projects.

The key difference between `substring()` and `substr()` is that `substr()` has a different 2nd parameter. The first parameter to `substr()` is `start`, and the 2nd is `length`. For example:

```javascript
[require:Fundamentals.*substr with 2 args]
```

Unlike `substring()`, you can call `substr()` with a negative `start`. That will make `substr()` start counting at the end of the string as opposed to the beginning. For example:

```javascript
[require:Fundamentals.*substr with negative]
```

`String#slice()`
----------------

The [`slice()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) is less common than `substring()` and `substr()`. However, it has the best aspects of both `substring()` and `substr()`. Like `substring()`, the `slice()` function takes the start and end indices as parameters, and is not considered a legacy function. Like `substr()`, the `slice()` function supports negative indices. For example:

```javascript
[require:Fundamentals.*String#slice.*works]
```

The `slice()` function seems like the clear winner out of the 3:

- Not considered a "legacy function"
- Supports negative indices
- Less name confusion: there's no `String#splice()`