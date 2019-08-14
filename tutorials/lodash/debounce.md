[Lodash's `debounce()` function](https://lodash.com/docs/4.17.15#debounce) lets you delay invoking a function until a certain number of milliseconds passes. One common use case for `debounce()` is HTTP API calls for autocompletes: suppose when the user is typing in an input, you only want to execute an HTTP request once. Below is a stubbed out example of how `debounce()` works.

```javascript
[require:lodash.*debounce.*autocomplete]
```

In practice, the `autocomplete()` function would make an HTTP request. With
`debounce()`, the `autocomplete()` function would **not** get called until the
user stopped typing for 100ms.

[This blog post has a handy metaphor for `debounce()`](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-0): `debounce()` works like an elevator. The elevator doesn't leave until the door closes and the door stays open for at least 100ms. If another function call comes in, that's like someone holding the door open, and then the door waits another 100ms before closing. 

There's also a `maxWait` option that the function will wait before executing.
For example, if `maxWait = 120`, the 2nd 'change' event in the below example
will execute after 60ms instead of 100ms.

```javascript
[require:lodash.*debounce.*maxWait$]
```