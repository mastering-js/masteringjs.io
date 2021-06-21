To remove leading zeroes from a number string in JavaScript, you can simply multiply the string by 1.

```javascript
let x = '0042';
x = x * 1;
x; // 42
```

## parseInt() and parseFloat()

Another way to remove leading zeroes is to use the `parseInt()` method, provided the string is not a `float`.
Use `parseFloat()` if the number string is a float.

```javascript
let x = '0042';
x = parseInt(x);
x; // 42

let y = '007.62';
y = parseFloat(y);
y; // 7.62
```

## Number()

Using the `Number` constructor is just as effective.

```javascript
let x = '007';
x = Number(x);
x; // 7;
```

## regexp and replace()

If you are familiar with regular expressions, you could also use the `replace()` function.

```javascript
let x = '0042';
x = x.replace(/^0+/, '');
x; // 42;
```
