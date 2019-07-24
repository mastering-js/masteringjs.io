JavaScript doesn't have a built-in function to convert the first letter of a
string to uppercase. However, you can capitalize the first letter of a string
with one line of vanilla JS. You can also use [lodash](https://www.npmjs.com/package/lodash.capitalize) or CSS. In this tutorial,
you'll learn to use all 3.

Using Vanilla JS
----------------

JavaScript has a [`String#uppercase()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that converts an entire string to uppercase. That means you can
capitalize the first character and combine it with the [substring containing everything but the first character](/tutorials/fundamentals/substring).

```javascript
[require:Fundamentals.*capitalize.*vanilla]
```

Using Lodash
------------

[Lodash's `capitalize()` function](https://lodash.com/docs#capitalize) also capitalizes the first character in a string. It also converts the remaining characters to lowercase.

```javascript
[require:Fundamentals.*capitalize.*lodash]
```

Using CSS
---------

Depending on your use case, you might not need JavaScript at all. [CSS `text-transform: capitalize`](https://css-tricks.com/almanac/properties/t/text-transform/#article-header-id-0) capitalizes the first letter of each word in the string.

```css
.capitalize {
  text-transform: capitalize;
}
```

So given the string `'capitalize using CSS'`, the browser will render the
string as '<span style="text-transform: capitalize">capitalize using CSS</span>'.