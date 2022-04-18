The `firstChild` property contains the first child DOM node of a DOM node, which could be of type `text`, `comment`, or `element`.
For example, the below code changes the text in the first `<li>` element from "Gas" to "Water".

```html
<ul id="example"><li>Gas</li><li>Food</li></ul>
<script>
  const list = document.querySelector('#example');
  list.firstChild.innerHTML = 'Water';
</script>
```

Whitespace matters when using `firstChild`!
The below example does **not** work as expected, because `firstChild` returns a text node containing the whitespace between `<ul id="example">` and the first `<li>`

```html
<ul id="example">
  <li>Gas</li>
  <li>Food</li>
</ul>
<script>
  const list = document.querySelector('#example');
  // `firstChild` below is a text node containing whitespace, **not** the first `<li>`
  list.firstChild.innerHTML = 'Water';
</script>
```

You can use the `firstElementChild` property to avoid this issue, and get the first DOM element node, ignoring text nodes.

```html
<ul id="firstElemChild">
  <li>Gas</li>
  <li>Food</li>
</ul>
<script>
  const elem = document.querySelector('#firstElemChild');
  elem.firstElementChild.innerHTML = 'Water';
</script>
```

If the DOM node has no children, `firstElement` contains [`null`](/tutorials/fundamentals/null).

```html
<div id="example1"></div>
<script>
  // Prints "null"
  console.log(document.querySelector('#example1').firstChild);
</script>
```