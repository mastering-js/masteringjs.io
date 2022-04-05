The `firstChild` property returns the first child node of a node.
If you wish to change the text of that property, you need to use the `firstElementChild` property instead.
The `firstChild` property returns a node, which could be of type `text` or `element`.
When HTML is written like below, it will return type `text`, as the whitespace between the `ul` tag and `li` tag cause that issue.
Any whitespace creates this issue and so the HTML would need to be written on one continuous line in order for it to return element.

<ul id="example">
<li>Gas</li>
<li>Food</li>
</ul>
<script>
const list = document.querySelector('#example');
list.firstElementChild.innerHTML = 'Water';
</script>

```html
<ul id="example">
<li>Gas</li>
<li>Food</li>
</ul>
<script>
const list = document.querySelector('#example');
list.firstElementChild.innerHTML = 'Water';
</script>
```

The `firstChild` property will return null for empty `divs`.
<div id="example1"><div></div></div>
<script>
console.log(document.querySelector('#example1').firstChild);
</script>

```html
<div id="example1"><div></div></div>
<script>
console.log(document.querySelector('#example1').firstChild);
</script>
```