[Mongoose's `aggregate()` function](https://mongoosejs.com/docs/api/model.html#model_Model.aggregate)
is how you use [MongoDB's aggregation framework](https://docs.mongodb.com/manual/aggregation/) with Mongoose. Mongoose's `aggregate()` is a thin wrapper, so any aggregation query that works in the [MongoDB shell](https://docs.mongodb.com/manual/mongo/) should work in Mongoose without any changes.

What is the Aggregation Framework?
----------------------------

Syntactically, an aggregation framework query is an array of stages. A
_stage_ is an object description of how MongoDB should transform any
document coming into the stage. The first stage feeds documents into
the second stage, and so on, so you can compose transformations using
stages. The array of stages you pass to the `aggregate()` function
is called an aggregation _pipeline_.

### The `$match` Stage

The `$match` stage filters out documents that don't match the given
`filter` parameter, similar to filters for [Mongoose's `find()` function](/tutorials/mongoose/find).

```javascript
[require:Mongoose Aggregate basic match$]
```

### The `$group` Stage

Aggregations can do much more than just filter documents. You can also use
the aggregation framework to tranform documents. For example, the `$group`
stage behaves like a [`reduce()` function](http://thecodebarbarian.com/javascript-reduce-in-5-examples.html). For example, the `$group` stage
lets you count how many characters have a given `age`.

```javascript
[require:Mongoose Aggregate group$]
```

### Combining Multiple Stages

The aggregation pipeline's strength is its composability. For example,
you can combine the previous two examples to only group characters
by `age` if their `age` is `< 30`.

```javascript
[require:Mongoose Aggregate combined$]
```

Mongoose `Aggregate` Class
------------------------

Mongoose's `aggregate()` function returns an instance of Mongoose's
[`Aggregate` class](https://mongoosejs.com/docs/api/aggregate.html).
`Aggregate` instances are [thenable](/tutorials/fundamentals/thenable),
so you can use them with `await` and [promise chaining](/tutorials/fundamentals/promise-chaining).

The `Aggregate` class also supports a chaining interface for building
aggregation pipelines. For example, the below code shows an alternative
syntax for building an aggregation pipeline with a `$match` followed by
a `$group`.

```javascript
[require:Mongoose Aggregate chaining$]
```

[Mongoose middleware](https://mongoosejs.com/docs/middleware.html) also
supports `pre('aggregate')` and `post('aggregate')` hooks. You can use
aggregation middleware to transform the aggregation pipeline.

```javascript
[require:Mongoose Aggregate middleware$]
```