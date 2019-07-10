In [Mongoose](https://mongoosejs.com/), the
[`Model.find()` function](https://mongoosejs.com/docs/api/model.html#model_Model.find) 
is the primary tool for querying the database. The first parameter to
`Model.find()` is a `filter` object. MongoDB will search for all documents
that match the `filter`. If you pass an empty filter,
[MongoDB will return all documents](https://masteringjs.io/tutorials/mongoose/find-all).

In this tutorial, you'll see how to execute common queries in Mongoose by
structuring the `filter` object using [MongoDB query operators](https://docs.mongodb.com/manual/reference/operator/query/).

Equality Checks
---------------

Suppose you have a `Character` model that contains 5 characters from
Star Trek: The Next Generation.

```javascript
[require:Mongoose.*find.*setup]
```

Suppose you want to find all characters whose `rank` is 'Lieutenant'. The way
to do this is to pass `{ rank: 'Lieutenant' }` as the `filter`.

```javascript
[require:Mongoose.*Model\.find.*basic]
```

You can also query by age. For example, the below query will find all characters
whose `age` is 29.

```javascript
[require:Mongoose.*Model\.find.*number]
```

The above examples don't use any query operators. If you set the value of `rank`
to an object with a [`$eq` property](https://docs.mongodb.com/manual/reference/operator/query/eq/#op._S_eq), you get an equivalent query, but using a _query operator_. The `$eq` query operator
is usually not useful. But this example demonstrates the query operator syntax,
which you need for structuring non-trivial queries.

```javascript
[require:Mongoose.*Model\.find.*eq query operator]
```

Comparisons
-----------

The `$eq` query operator checks exact equality. There are also
[comparison query operators](https://docs.mongodb.com/manual/reference/operator/query/#comparison) like `$gt` and `$lt`. For example, suppose you want to find all characters whose age
is strictly less than 29. You can use the [`$lt` query operator](https://docs.mongodb.com/manual/reference/operator/query/lt/#op._S_lt) as shown below.

```javascript
[require:Mongoose.*Model\.find.*lt]
```

Suppose you wanted to find all characters whose age is at least 29. For that,
you should use the [`$gte` query operator](https://docs.mongodb.com/manual/reference/operator/query/gte/#op._S_gte).

```javascript
[require:Mongoose.*Model\.find.*gte]
```

The comparison operators `$lt`, [`$gt`](https://docs.mongodb.com/manual/reference/operator/query/gt/#op._S_gt), [`$lte`](https://docs.mongodb.com/manual/reference/operator/query/lte/#op._S_lte), and `$gte` work with more than just numbers. You can also use them on strings,
dates, and other types. MongoDB compares strings using [unicode order](https://www.w3.org/TR/xml-entity-names/bycodes.html).
If that order doesn't work for you, you can configure it using
[MongoDB collations](https://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-34-collations).

```javascript
[require:Mongoose.*Model\.find.*lte string]
```

Regular Expressions
-------------------

Suppose you want to find characters whose `rank` contains 'Commander'. In SQL,
you would use the [`LIKE` operator](https://www.w3schools.com/sql/sql_like.asp).
In Mongoose, you can simply query by a regular expression as shown below.

```javascript
[require:Mongoose.*Model\.find.*regexp]
```

Equivalently, you can use the [`$regex` query operator](https://docs.mongodb.com/manual/reference/operator/query/regex/#op._S_regex). This enables you to pass the regular expression as a string, which is convenient if you're getting the query from an HTTP request.

```javascript
[require:Mongoose.*Model\.find.*regex query operator]
```

Composition with `$and` and `$or`
---------------------------------

If you set multiple `filter` properties, MongoDB finds documents that match
all the filter properties. For example, the below query will find all characters
whose `age` is at least 29 **and** whose `rank` equals 'Commander'.

```javascript
[require:Mongoose.*find.*multiple filters]
```

Suppose you want to find characters whose `age` is at least 29 **or** whose
`rank` equals 'Commander'. You would need the [`$or` query operator](https://docs.mongodb.com/manual/reference/operator/query/or/#op._S_or).

```javascript
[require:Mongoose.*Model\.find.*\$or query operator]
```

There is also a [`$and` query operator](https://docs.mongodb.com/manual/reference/operator/query/and/#op._S_and). You will rarely need to use the `$and` query operator. The primary use case for `$and` is to compose multiple `$or` operators. For example, suppose you want
to find characters whose that satisfy both of the below conditions:

1. `age` at least 29 or whose `rank` equals 'Commander'
2. `name` starts with a letter before 'D' or after 'W'.

```javascript
[require:Mongoose.*Model\.find.*\$and query operator]
```