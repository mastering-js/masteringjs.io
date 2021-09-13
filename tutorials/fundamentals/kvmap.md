To [iterate](/tutorials/fundamentals/iterate-object) over key-value pairs in javascript, use `Object.entries()`.

```javascript
function createEnum(obj) {
  const enumObject = {};
  for (const [key, value] of Object.entries(obj)) {
    enumObject[key] = value;
  }
  return Object.freeze(enumObject);
}

createEnum({firstName: 'Masteringjs', lastName: '.io', location: 'Florida', help: true});
```
