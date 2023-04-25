[BigInts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) are a new [primitive type in JavaScript](/tutorials/fundamentals/primitives) that can contain arbitrarily large integers.
You can convert a BigInt to its corresponding number representation using the `Number()` function as follows:

```javascript
const answerBigInt = 42n;

const answerNum = Number(answerBigInt);

typeof answerNum; // 'number'
answerNum === 42; // true
```

Keep in mind that, if the BigInt is larger than [`Number.MAX_VALUE`](https://www.w3schools.com/jsref/jsref_max_value.asp#:~:text=Definition%20and%20Usage-,Number.,value%20of%201.7976931348623157e%2B308.) or smaller than [`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE), `Number(bigint)` will be positive or negative infinity.

```javascript
const tooBig = Number(10n**10000n);
tooBig === Number.POSITIVE_INFINITY; // true
tooBig; // Infinity

const tooSmall = Number((-10n)**10001n);
tooSmall === Number.NEGATIVE_INFINITY; // true
tooSmall; // -Infinity
```