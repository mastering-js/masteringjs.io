When making API requests, you can either use `.then()` or `async/await`. Internally, they are the same thing.
The difference is that in an `async/await` function, the entire function execution will be halted on the first instance of a promise whereas when using
`.then()`, only the `.then()` block execution will be halted.


```javascript
async function test() {
  console.log('Ready');
  let example = await fetch('http://httpbin.org/get');
  console.log('Hello');
  console.log('World');
}

function demo() {
    console.log('It\'s first words are:');
}

test();
demo();
```

```javascript
function test() {
  console.log('Ready');
  let example = fetch('http://httpbin.org/get').then((res) => {
  console.log('This is inside the then() block');
  });
  console.log('This is after the fetch statement where we are now executing other code that is not asynchronus');

}

test();
```