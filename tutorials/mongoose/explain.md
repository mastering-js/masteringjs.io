In MongoDB, the [`explain` command](https://docs.mongodb.com/manual/reference/method/cursor.explain/) tells the MongoDB server to return stats about how it executed a query, rather than the results of the query. [Mongoose queries](https://mongoosejs.com/docs/queries.html) have an [`explain()` function](https://mongoosejs.com/docs/api/query.html#query_Query-explain) that converts a query into an `explain()`.

```javascript
[require:Mongoose explain basic example$]
```

Reading the `queryPlanner` Output
--------------------------

The `queryPlanner` object contains more detailed information about how
MongoDB decided to execute the query. For example, below is the `queryPlanner`
object from the above `explain()` call.

```javascript
{
  plannerVersion: 1,
  namespace: 'test.characters',
  indexFilterSet: false,
  parsedQuery: { name: { '$regex': 'Picard' } },
  winningPlan: {
    stage: 'COLLSCAN',
    filter: { name: { '$regex': 'Picard' } },
    direction: 'forward'
  },
  rejectedPlans: []
}
```

The most important piece of information is the `winningPlan` property, that
contains the information about the plan MongoDB decided on to execute
the query. In practice, `winningPlan` is useful for checking whether
MongoDB used an index for the query or not.

A _query plan_ is a list of stages used to identify the documents that
match the query. The above plan has only one stage, 'COLLSCAN', which
means MongoDB executed a full collection scan to answer the query.
A collection scan means MongoDB searched through every document in the
'characters' collection to see if `name` matched the given query.

Query plans get more sophisticated when you introduce indexes. For example,
suppose you add an index on `name` as shown below.

```javascript
[require:Mongoose explain queryPlanner index$]
```

The `queryPlanner` output looks like this:

```
{
  plannerVersion: 1,
  namespace: 'test.characters',
  indexFilterSet: false,
  parsedQuery: { name: { '$eq': 'Jean-Luc Picard' } },
  winningPlan: {
    stage: 'FETCH',
    inputStage: {
      stage: 'IXSCAN',
      keyPattern: { name: 1 },
      indexName: 'name_1',
      isMultiKey: false,
      multiKeyPaths: { name: [] },
      isUnique: false,
      isSparse: false,
      isPartial: false,
      indexVersion: 2,
      direction: 'forward',
      indexBounds: { name: [ '["Jean-Luc Picard", "Jean-Luc Picard"]' ] }
    }
  },
  rejectedPlans: []
}
```

The `winningPlan` property is a recursive structure: `winningPlan` points
to the last stage in the winning query plan, and each stage has an
`inputStage` property that described the previous stage.

In the above plan, there are two stages: 'IXSCAN' and 'FETCH'. That means
first MongoDB used the `{ name: 1 }` index to identify which documents
matched the query, and then fetched the individual documents.

Reading the `executionStats` Output
-------------------------------

The `executionStats` output is more complex than `queryPlanner`: it
includes stats about how long each stage took and how many documents
each stage scanned.

For example, below is the `executionStats` output for a simple
collection scan:

```
{
  executionSuccess: true,
  nReturned: 1,
  executionTimeMillis: 0,
  totalKeysExamined: 0,
  totalDocsExamined: 5,
  executionStages: {
    stage: 'COLLSCAN',
    filter: { name: { '$regex': 'Picard' } },
    nReturned: 1,
    executionTimeMillisEstimate: 0,
    works: 7,
    advanced: 1,
    needTime: 5,
    needYield: 0,
    saveState: 0,
    restoreState: 0,
    isEOF: 1,
    direction: 'forward',
    docsExamined: 5
  },
  allPlansExecution: []
}
```

The important details to note here are the top-level `executionTimeMillis`
and `totalDocsExamined` properties. `executionTimeMillis` is the amount of time
MongoDB spent executing the query, and `totalDocsExamined` is the number
of documents MongoDB had to look at to answer the query.

Keep in mind that `executionTimeMillis` does **not** include network latency
or [time spent blocked behind a slow train](https://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs). Just because `executionTimeMillis` is
small doesn't mean that the end user saw the result instantaneously.

When you have an index and multiple stages, `executionStats` breaks down
the approximate execution time and number of documents scanned per stage. Below
is the `executionStats` for a query with an index, with some of the less
important details excluded for brevity:

```
{
  executionSuccess: true,
  nReturned: 1,
  executionTimeMillis: 2,
  totalKeysExamined: 1,
  totalDocsExamined: 1,
  executionStages: {
    stage: 'FETCH',
    nReturned: 1,
    executionTimeMillisEstimate: 0,
    // ...
    docsExamined: 1,
    // ...
    inputStage: {
      stage: 'IXSCAN',
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      // ...
    }
  },
  allPlansExecution: []
}
```

The above `executionStats` output says that there were two stages: 'IXSCAN' and 'FETCH'.
The 'IXSCAN' stage executed in 0ms and resulted in one document being sent to the
'FETCH' stage. The 'FETCH' stage examined 1 document, and returned 1 document,
which was the final result of the query.