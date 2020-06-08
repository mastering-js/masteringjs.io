Axios requests are promises, which means they have a [`then()` function](/tutorials/axios/then) for [promise chaining](/tutorials/fundamentals/promise-chaining), and
a `catch()` function for handling errors. Below is how you can `catch()`
an error in Axios.

```javascript
[require:axios catch basic error$]
```

Axios' `catch()` behaves exactly the same as the [promise `catch()` function](/tutorials/fundamentals/catch). So you can use promise chaining, and add a `catch()` at the
end to handle any errors that occur in the promise chain.

```javascript
[require:axios catch chain$]
```

You can also use `catch()` to transform the error, just make sure you
rethrow the error afterwards.

```javascript
[require:axios catch rethrow$]
```

You can also make Axios [transform errors automatically using interceptors](/tutorials/axios/interceptors#error-handling).