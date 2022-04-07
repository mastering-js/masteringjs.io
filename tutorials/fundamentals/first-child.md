The `firstChild` property returns the first child node of a node.
The `firstChild` property returns a node, which could be of type `text`, `comment`, or `element`.
When HTML is written like below, it will return type `text`, as the whitespace between the `ul` tag and `li` tag cause that issue.

```html
<ul id="example">
  <li>Gas</li>
  <li>Food</li>
</ul>
```
Any whitespace creates this issue and so the HTML would need to be written on one continuous line in order for it to return type `element`.

```html
<ul id="example"><li>Gas</li><li>Food</li></ul>
<script>
  const list = document.querySelector('#example');
  list.firstChild.innerHTML = 'Water';
</script>
```

<ul id="example"><li>Gas</li><li>Food</li></ul>
<script>
  const list = document.querySelector('#example');
  list.firstChild.innerHTML = 'Water';
</script>

You can use the `firstElementChild` property to negate this issue completely.

<ul id="firstElemChild">
<li>Gas</li>
<li>Food</li>
</ul>
<script>
  const elem = document.querySelector('#firstElemChild');
  elem.firstElementChild.innerHTML = 'Water';
</script>

The `firstChild` property will return null for empty `divs`.
<div id="example1"></div>
<script>
  console.log(document.querySelector('#example1').firstChild);
</script>

```html
<div id="example1"></div>
<script>
  console.log(document.querySelector('#example1').firstChild);
</script>
```