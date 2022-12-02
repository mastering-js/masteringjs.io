In Node, you can use `"type": "module"` in package.json

```json
{
  "type:": "module"
}
```

## In the browser

In the script tag, you add `type="module"` like so:

```html
<script type="module" src="./file.js">import
</script>
```
<script type="module" src="./file.js">import
</script>

```html
<script src="./file.js">import
</script>
```
<script>
import
</script>

Observe how the error is thrown without that change by pressing ctrl+shift+i if you are on windows.