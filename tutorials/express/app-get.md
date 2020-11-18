Express' [`app.get()` function](https://expressjs.com/en/api.html#app.get) lets you define a _route handler_ for GET
requests to a given URL. For example, the below code registers a route handler that Express will call when it receives
an HTTP GET request to `/test`.

```javascript
[require:Express app get basic example$]
```

Regular Expressions
-------------------

The first parameter to `app.get()` is called the `path`. The `path` string supports several [special characters](https://expressjs.com/en/guide/routing.html#route-paths) that let you use a subset of regular expressions in path strings.

For example, you may see `app.get('*')` in tutorials: this registers a route handler for _all_ GET requests.

```javascript
[require:Express app get wildcard$]
```

`?`, `+`, `*`, `(`, `)`, and `:` are special characters in Express paths. Although you typically shouldn't use these
characters as literals in URLs, you can escape them with a `\`:

```javascript
[require:Express app get literal plus$]
```

We typically don't recommend using `*`, `+`, `?`, `(`, or `)` in Express route paths. They are rarely useful, especially
since Express supports specifying a JavaScript regular expression as a path:

```javascript
[require:Express app get regexp$]
```

Route Parameters
----------------

[Route parameters](/tutorials/express/route-parameters) are essentially variables defined from named sections of the URL.
Express parses the URL, pulls the value in the named section, and stores it in the [`req.params` property](https://expressjs.com/en/4x/api.html#req.params).

```javascript
[require:Express route parameters basic example$]
```

Route parameters allow you to specify a parameterized GET route handler for a class of URLs. They're very useful for
building REST APIs.