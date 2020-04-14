Promise chaining is what makes promises meaningfully better than
[callbacks](/tutorials/fundamentals/callbacks#node-style-callbacks).
The key idea is that a [Promise's `then()` function](/tutorials/fundamentals/then) returns another promise, so you can chain `.then()` calls together
to tell JavaScript to execute async calls in order.

```javascript
[require:Fundamentals Promise Chaining basic example$]
```

Return Values
-------------

The first parameter to the `then()` function is called `onFulfilled()`.
That's because JavaScript calls that function when the promise is fulfilled.
JavaScript calls the `onFulfilled()` function with the value the promise
was fulfilled with as the first parameter.

Promise chaining works because, if your `onFulfilled()` function
returns a promise `q`, the promise `then()` returns will [_adopt_](https://promisesaplus.com/#point-49) the state of `q`. So the promise `then()`
returns will have the same fulfilled value as `q`.

```javascript
[require:Fundamentals Promise Chaining return values$]
```

Error Handling
--------------

Promise chaining also consolidates error handling. All you need is one
[`.catch()` function](/tutorials/fundamentals/catch) call at the end
of your promise chain to handle any errors that occur in your promise chain.

```javascript
[require:Fundamentals Promise Chaining error handling$]
```

Summary
-------

The high level structure of a promise chain is a series of `.then()`
calls, each with an `onFulfilled()` parameter, and a single `.catch()`
at the end. JavaScript executes the `.then()` callbacks in order,
or goes straight to `.catch()` if one of the `onFulfilled()`
functions errors out.

<img src="/assets/chaining-diagram.png" class="inline-image" style="width: 50%">