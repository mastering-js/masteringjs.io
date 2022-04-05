The `createElement()` function in JavaScript is used to programatically add elements to a web file.
It takes one argument which is the type of element to create.
You should store it in a variable as you will most likely want to manipulate the newly created element's properties.

<div id="append-elements"></div>
<button onclick="addElement()">Click to Add</button>

<script>
function addElement() {
const doc = document.createElement('div');
doc.innerHTML = 'Hello World';
const descendant = document.querySelector('#append-elements');
console.log(descendant)
descendant.insertAdjacentElement('afterend', doc);
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
console.log(descendant)
descendant.insertAdjacentElement('afterend', doc);
}
```

The more nested, the more appending needs to be done.

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
