JavaScript's `void` operator is helpful for when you want a function or expression to return `undefined` as opposed to its value.
It will evaulate the given expression and then return `undefined`:


```javascript
void 10 == '10' // will return false as it executes void 10 first
void (10 == '10') // will return undefined as 10 == '10' executes first.
```

Adding `void` in front of a immediately-invoked function expression forces the function keyword to be treated
as an expression and execute immediately instead of a declaration.
```javascript
void function test() {
  console.log("Hello World");
}(); // will print Hello World

test(); // throws a reference error

// without void

function run() {
    console.log('Hello there');
};

run(); // Hello there

(function () {
    console.log('Ah, General Kenobi');
})(); // Ah, General Kenobi
```

When using a `href` element inside of an `a` tag, you can use the following syntax to
have the `href` return nothing and prevent an unwanted page refresh:

```html
<a href="javascript:void(0)">
    Nothing Special Link
</a>
```


