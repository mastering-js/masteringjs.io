To parse a URL in JavaScript, use the [`new URL()` constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL).
This will create a new `URL` object with `hash`, `host`, `pathname`, `search`, and `hash` properties.
For the `hash` and `search` properties, it will default to an empty string if they do not exist on the URL.

```javascript
const url = new URL('https://www.masteringjs.io/tutorials/fundamentals/parse-url.html?num=123')
url.href; // https://www.masteringjs.io/tutorials/fundamentals/parse-url.html?num=123
url.host; // www.masteringjs.io
url.pathname; // "/tutorials/fundamentals/parse-url.html"
url.search; // "?num=123"
url.hash; // ""
```

