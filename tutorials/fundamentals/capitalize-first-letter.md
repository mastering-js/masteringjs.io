Capitalizing the first letter of a JavaScript string is easy
if you combine the [string `toUpperCase()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) with the [string `slice()` method](/tutorials/fundamentals/substring).

```javascript
[require:Fundamentals capitalize first letter works$]
```

The first part converts the first letter to upper case, and then appends
the rest of the string.

If you want to capitalize the first letter of every word in a string, you
can use `split()` to split the string into words and then `join()` the
string back together as shown below.

```javascript
[require:Fundamentals capitalize first letter all words$]
```

Using CSS
---------

Keep in mind that you don't need JavaScript to capitalize a
string on the frontend. CSS can do that for you:

```css
.capitalize {
  text-transform: capitalize;
}
```

For example, the below `<div>` has the `capitalize` class, with
'captain picard' as its inner text. CSS can convert all words in
a string to uppercase.

<style>
  .capitalize {
    text-transform: capitalize;
    padding: 3px;
    border: 1px solid #ddd;
  }
</style>
<div class="capitalize">captain picard</div>