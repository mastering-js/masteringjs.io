A [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) is a number
representing the number of **seconds** since January 1, 1970. Unix timestamps
are a common method for representing points in time because they only require 64 bits (or 32 bits [until 2038](https://developers.slashdot.org/story/13/01/22/1447205/youve-got-25-years-until-unix-time-overflows)), can be compared using basic math operators like `>` and `<=`, and are timezone-independent.

[JavaScript's `Date.now()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) returns the number of **milliseconds** since January 1, 1970. In other words, `Date.now()` doesn't give you the Unix timestamp, but you can easily convert by dividing by 1000:

```javascript
[require:Fundamentals.*timestamps]
```

Given an existing date, you can use either the [`getTime()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime) or the [`valueOf()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf) to get the number of milliseconds since January 1, 1970. These two functions are equivalent.

```javascript
[require:Fundamentals.*from date]
```

The reason why `getTime()` and `valueOf()` are separate functions is that [JavaScript uses `valueOf()` functions for implicit type conversions](https://blog.klipse.tech/javascript/2016/09/21/valueOf-js.html).