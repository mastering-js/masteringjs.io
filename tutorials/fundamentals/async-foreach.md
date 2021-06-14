You should **not** make the callback function parameter in `forEach()`
an async function as it is impossible to handle errors. Another reason is
that `forEach()` executes async callbacks in parallel, rather than in series.
[Here's More Info Why.](https://thecodebarbarian.com/basic-functional-programming-with-async-await.html)
If you wish to still pursue that path, here is a better alternative:

```javascript
async function parallel() {
    arr = [0,1,2,3,4,5];
    await Promise.all(arr.map(async (item) => {
        item; // 0,1,2,3,4,5
    }));
}

parallel();
```

```javascript
async function series(arr) {
    for(const item in arr) {
        await item(); // 'a', 'b', 'c'
    }
}

const a = async () => {
    return 'a'
}

const b = async () => {
    return 'b'
}

const c = async () => {
    return 'c'
}
arr = [a,b,c];
series(arr);
```
