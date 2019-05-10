Given a general JavaScript object, there are two common ways to check whether an object contains a key: the [`in` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) and the [`hasOwnProperty()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty). With a simple POJO and no special keys, these two are equivalent:

```javascript
[require:Fundamentals.*hasOwnProperty.*basics]
```

Both also support [ES6 symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).

```javascript
[require:Fundamentals.*hasOwnProperty.*symbols]
```

So what's the difference between the two? The key difference is that `in` will return `true` for inherited properties, whereas `hasOwnProperty()` will return `false` for inherited properties.

For example, the `Object` base class in JavaScript has a [`__proto__` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto), a [`constructor` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor), and a [`hasOwnProperty` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty). The `in` operator will return `true` for these properties, but `hasOwnProperty()` will return `false`.

```javascript
[require:Fundamentals.*hasOwnProperty.*special properties]
```

Because `hasOwnProperty()` ignores inherited properties, it is the better choice for plain old JavaScript objects (POJOs). However, `hasOwnProperty()` will return `false` for class properties and class methods, like [ES6 getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).

```javascript
[require:Fundamentals.*hasOwnProperty.*inheritance]
```

Below is a summary of the tradeoffs between `in` and `hasOwnProperty()`.

<img src="/assets/hasownproperty.png">

In general, `hasOwnProperty()` is the right choice most of the time, because you avoid issues with special keys, like `constructor`. A good rule of thumb is that if you're looking to see whether an object has a property, you should use `hasOwnProperty()`. If you're looking to see if an object has a function that you intend to call, like checking if an object has `toString()`, you should use `in`.