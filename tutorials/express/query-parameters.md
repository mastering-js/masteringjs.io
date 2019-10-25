The [query string](https://en.wikipedia.org/wiki/Query_string) portion of
a URL is the part of the URL after the question mark `?`. For example:

```
?answer=42
```

Each `key=value` pair is called a _query parameter_. If your query string has 
multiple query parameters, they're separated by `&`. For example, the below
string has 2 query parameters, `a` and `b`.

```
?a=1&b=2
```

Express automatically parses query parameters for you and stores them
on the [request object](/tutorials/express/req) as [`req.query`](http://expressjs.com/en/4x/api.html#req.query).

```javascript
[require:Express query parameters basic example$]
```

Objects and Arrays in Query Strings
-----------------------------------

If a query parameter appears multiple times in the query string, Express
will group the values into an array. For example, given the below query string:

```
?color=black&color=yellow
```

Express will set `req.query.color` to an array `['black', 'yellow']`.

```javascript
[require:Express query parameters array$]
```

If you use square brackets in a query string parameter, Express will parse
that parameter as an object. For example, Express will parse the below
query string into `{ shoe: { color: 'white' } }`

```javascript
?shoe[color]=white
```

This default behavior is often a nasty surprise and [can cause security vulnerabilities](https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html). To prevent Express from parsing
square brackets as object properties,
you should set the [`query parser` app setting to 'simple'](https://expressjs.com/en/api.html#app.settings.table).

```javascript
[require:Express query parameters simple$]
```