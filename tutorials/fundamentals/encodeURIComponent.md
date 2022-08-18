The `encodeURIComponent()` function in JavaScript allows you to encode special characters in your query string that would otherwise change the meaning of your query string.

Characters like `+`, `/`, and `&` are special.
For example, suppose you wanted to send an HTTP request with the user's `email` address in the query string.

```javascript
fetch(`https://httpbin.org/get?email=${email}`);
```

What happens if `email` has an `&`, like `'john@gmail.com&param=somethingelse'`?
That would add an extra parameter `param=somethingelse` to the query string.

`encodeURIComponent()` ensures that `email`.
For example:

```javascript
const email = 'john@gmail.com&param=somethingelse';

await fetch(`https://httpbin.org/get?email?email=${email}`).
  then((res) => res.json()); // { email: 'john@gmail.com', param: 'somethingelse' }

await fetch(`https://httpbin.org/get?email=${encodeURIComponent(email)}`).
  then((res) => res.json()); // { email: 'john@gmail.com&param=somethingelse' }
```

Do not encode the entire url!
Just encode the individual values in the query string.

## Axios

If you're using [Axios query params](/tutorials/axios/get-query-params), you don't need to use `encodeURIComponent()`.
Axios calls `encodeURIComponent()` for you.

```javascript
[require:axios.*get request params$]
```