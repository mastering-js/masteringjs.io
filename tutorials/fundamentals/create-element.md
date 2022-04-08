The `createElement()` function in JavaScript is used to programatically add elements to the DOM.
It has one required argument, the type of elemtn to create, like `'div'` or `'img'`.

<div id="append-elements"></div>
<button onclick="addElement()">Click to Add</button>

<script>
  function addElement() {
    const doc = document.createElement('div');
    doc.innerHTML = 'Hello World';
    const descendant = document.querySelector('#append-elements');
    descendant.appendChild(doc);
  }
</script>

```html
<div id="append-elements"></div>
<button onclick="addElement()">Click to Add</button>
```

```javascript
  function addElement() {
    const doc = document.createElement('div');
    doc.innerHTML = 'Hello World';
    const descendant = document.querySelector('#append-elements');
    descendant.appendChild(doc);
  }
```

You can also use `appendChild()` on the newly created element to add more elements as shown below.

```html
<div id="nested">I am the Parent</div>
```

```javascript
const parent = document.querySelector('#nested');
const child = document.createElement('div');
child.innerText = 'I am the parent\'s child';
const grandChild = document.createElement('h1');
grandChild.innerText = 'I am the grandchild';
parent.appendChild(child);
child.appendChild(grandChild);
```

<div id="nested">I am the Parent</div>
<script>
const parent = document.querySelector('#nested');
const child = document.createElement('div');
child.innerText = 'I am the parent\'s child';
const grandChild = document.createElement('h1');
grandChild.innerText = 'I am the grandchild';
parent.appendChild(child);
child.appendChild(grandChild);
</script>
