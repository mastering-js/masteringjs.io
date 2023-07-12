In the browser, `window.location.href` contains the current URL.
For example, if you open Chrome developer console on this page and type `window.location.href`, you'll see the following:

```
https://masteringjs.io/fundamentals/if-url-contains
```

From there, you can use our recommended process for checking if a [string contains a substring in JavaScript](/tutorials/fundamentals/contains-substring):

```javascript
window.location.href.includes('masteringjs.io'); // true
window.location.href.includes('foobar'); // false
```

Note that Internet Explorer does **not** support the `includes()` method on strings.
For IE support, you should use `indexOf()` instead.
If `indexOf()` returns `-1`, that means the substring is not present in the current URL.

```javascript
window.location.href.indexOf('masteringjs.io') !== -1; // true
window.location.href.indexOf('foobar') !== -1; // false
```

Other URL Components
--------------------

Sometimes you don't want to test whether the whole URL contains a given string, just part of the URL.
Browsers also expose some other common URL components as properties on `window.location`:

- `window.location.host`: the hostname, like `masteringjs.io`
- `window.location.pathname`: everything after `/`, like `/tutorials/fundamentals/if-url-contains`
- `window.location.search`: everything after `?`, like `?foo=bar`, or empty string
- `window.location.hash`: everything after `#`, like `#other-url-components`, or empty string

Using Regular Expressions
-------------------------

You can also test whether the current URL matches a regular expression using the [string `match()` function](/tutorials/fundamentals/string-match) as follows.

```javascript
window.location.href.match(/masteringjs/) != null; // true
window.location.href.match(/foobar/) != null; // false
```