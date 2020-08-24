In [Express](https://expressjs.com/), [route parameters](/tutorials/express/route-parameters) are values derived
from portions of the URL that start with `:`. The [the `req.params` property](https://expressjs.com/en/4x/api.html#req.params) is where Express stores the values of the named sections in the URL.

```javascript
[require:Express route parameters basic example$]
```

Route parameters are also known as URL parameters.

Query String Parameters
-----------------------

[Query string params](/tutorials/express/query-parameters) are another commonly used type of parameter in Express.
The [query string](https://en.wikipedia.org/wiki/Query_string) portion of
a URL is the part of the URL after the question mark `?`.

By default, Express parses the query string and stores the parsed result on the [request object](/tutorials/express/req) as [`req.query`](http://expressjs.com/en/4x/api.html#req.query):

```javascript
[require:Express query parameters basic example$]
```