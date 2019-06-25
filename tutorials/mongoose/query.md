Many Mongoose model functions, like [`find()`](https://thecodebarbarian.com/how-find-works-in-mongoose), return a [Mongoose query](https://mongoosejs.com/docs/queries.html). The [Mongoose Query class](https://mongoosejs.com/docs/api/query.html) provides a [chaining interface](https://schier.co/blog/2013/11/14/method-chaining-in-javascript.html) for finding, updating, and deleting documents.

```javascript
[require:Mongoose.*Query.*query class]
```

Chaining
--------

The first parameter to `Model.find()` is called the query _filter_. When you
call `find()`, MongoDB will return all documents that match the query filter.
You can use Mongoose's [numerous query helpers](https://mongoosejs.com/docs/api/query.html) to build up query filters. Just
make sure you specify the property name to add to the filter using [`where()`](https://mongoosejs.com/docs/api/query.html#query_Query-where).

```javascript
[require:Mongoose.*Query.*chaining]
```

Chainable operations let you add to the current query filter. You can get the
query's current filter using the [`Query#getFilter()` function](https://mongoosejs.com/docs/api/query.html#query_Query-getFilter).

```javascript
[require:Mongoose.*Query.*getFilter]
```

Here's a list of several useful query helpers:

- `lt(value)`, `gt(value)`: specify that a property must be less than (`lt()`) or greater than (`gt()`) a value. `value` can be a number, string, or date.
- `lte(value)`, `gte(value)`: specify that a property must be greater than or equal to (`gte()`), or less than or equal to (`gte()`), a value.
- `in(arr)`: specify that a property must be equal to one of the values specified in `arr`
- `nin(arr)`: specify that a property must **not** equal any of the values specified in `arr`
- `eq(val)`: specify that a property must be equal to `val`
- `ne(val)`: specify that a property must **not** be equal to `val`
- `regex(re)`: specify that a property must be a string that matches `re`

You can chain arbitrarily many `where()` calls and query helpers to build up
your query. For example:

```javascript
[require:Mongoose.*Query.*multiple]
```

Executing
---------

[Mongoose queries are **not** promises](https://mongoosejs.com/docs/queries.html#queries-are-not-promises). The key difference is that Mongoose doesn't actually send your query to the server until you explicitly execute the query. There's 2 ways to execute a query:

- [`Query#exec()`](https://mongoosejs.com/docs/api/query.html#query_Query-exec): executes the query and returns a native JavaScript promise.

```javascript
[require:Mongoose.*Query.*exec]
```

- [`Query#then()`](https://mongoosejs.com/docs/api/query.html#query_Query-then) and [`Query#catch()`](https://mongoosejs.com/docs/api/query.html#query_Query-catch): provides a pseudo-promise API for queries, so you can `await` on a Mongoose query. You can also use promise chaining with Mongoose queries as shown below.

```javascript
[require:Mongoose.*Query.*then]
```