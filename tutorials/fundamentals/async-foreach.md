You should **not** make the callback function parameter in `forEach()`
an async function as you cannot guarantee order of iteration.
[Here's More Info Why.](https://thecodebarbarian.com/basic-functional-programming-with-async-await.html)
If you wish to still pursue that path, here is a better alternative:

```javascript
async function test() {
    arr = [0,1,2,3,4,5];
    await Promise.all(arr.map(async (item) => {
        item; // 0,1,2,3,4,5
    }));
}

test();
```
