When making API requests, you can either use `.then()` or `async/await`. `async/await` and `.then()` are very similar.
The difference is that in an `async/await` function, JavaScript will pause the function execution until the promise settles.
With `.then()`, the rest of the function will continue to execute but JavaScript won't execute the `.then()` callback until
the promise settles.


```javascript
async function test() {
  console.log('Ready');
  let example = await fetch('http://httpbin.org/get');
  console.log('I will print second');
}

test();
console.log('I will print first');

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
console.log('this is after the entire function');
```