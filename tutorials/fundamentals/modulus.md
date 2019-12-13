The modulus operator, also known as the [remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder), returns the remainder when the first
operand is divided by the second operand.

A handy analogy for the modulus is buying things: if widgets cost $3 and you have $7, 
you can buy at most 2 widgets. Then you'll have $1 remaining. The modulus operator
`a % b` returns what's left if you buy as many widgets as possible if you have `a` 
dollars and widgets cost `b` dollars.

```javascript
7 % 3; // 1
```

In English, `a % b` is said as ["a mod b"](https://www.quora.com/What-does-a-mod-b-mean).

The modulus operator has several neat uses:

Is A Number Odd or Even?
------------------------

An integer `n` is [even](http://mathworld.wolfram.com/EvenNumber.html) if it is
divisible by 2. The modulus operator returns 0 if `a` is divisible `b`.
In other words, checking if a number is even is equivalent to checking if `n % 2 === 0`.

```javascript
function isEven(n) {
  return n % 2 === 0;
}

isEven(5); // false
isEven(7.6); // false
isEven(8); // true
```

Similarly, `n` is [odd](http://mathworld.wolfram.com/OddNumber.html) if and only if `n % 2 === 1`.

```javascript
function isOdd(n) {
  return n % 2 === 0;
}

isEven(5); // false
isEven(7.6); // false
isEven(8); // true
```

The [Fractional Part](https://en.wikipedia.org/wiki/Fractional_part) of a Number
----------------------------

Say you have a number `2.5` and you want to get just the part of the number
after the decimal point `0.5`. The most concise way to do this is to take
the number mod 1.

```javascript
function getFractionalPart(n) {
  return n % 1;
}

getFractionalPart(2.5); // 0.5
```

Converting Minutes to Hours
---------------------------

The modulus operator is handy for basic date arithmetic that you don't want to
pull in a heavy library for. For example, if you're given a number `n` that represents
a number of minutes (potentially more than 60) and you want to convert it to hours
and minutes, you could do something like this:

```javascript
const minutesToHoursAndMinutes = n => ({
  hours: Math.floor(n / 60),
  minutes: n % 60
});

minutesToHoursAndMinutes(59); // { hours: 0, minutes: 59 }
minutesToHoursAndMinutes(62); // { hours: 1, minutes: 2 }
minutesToHoursAndMinutes(123); // { hours: 2, minutes: 3 }
```