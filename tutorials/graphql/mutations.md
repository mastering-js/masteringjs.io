A [GraphQL mutation](https://graphql.org/learn/queries/#mutations) is an
API operation that modifies data. Like `Query`, `Mutation` is a special
type in your [GraphQL schema](https://graphql.org/learn/schema/):

```javascript
const schema = `
  type Query {
    getCount: CountResult
  }

  type Mutation {
    increment: CountResult
  }

  type CountResult {
    count: Int
    time: Float
  }
`;
```

Every member of the `Mutation` type is a distinct API operation that
you can use to modify data. In the above schema, there is exactly
one mutation: `increment()`. The `increment()` operation returns
an object of type `CountResult`.

Implementing a Mutation
-----------------------

A GraphQL schema is just a list of type definitions. You also need
to implement the business logic of the `increment()` mutation.
Like for queries, you implement the `increment()` mutation as a
[resolver](https://graphql.org/learn/execution/#root-fields-resolvers)
on the `Mutation` type:

```javascript
[require:GraphQL apollo increment count$]
```

Note that, to actually call a mutation, you need to start your
GraphQL query with the string `'mutation'`:

```javascript
await axios.post(handle.url, {
  // Note 'mutation' below. Not necessary for queries, but
  // necessary for mutations.
  query: 'mutation { increment { count, time } }'
});
```

Mutation Arguments
------------------

A GraphQL mutation is a function like any other. You can pass arguments
to your mutation as well. For example, if you want to allow `increment()`
with a value other than 1, you can add a `Number` parameter to the
`increment()` mutation:

```javascript
const schema = `
  type Query {
    getCount: CountResult
  }

  type Mutation {
    increment(num: Int): CountResult
  }

  type CountResult {
    count: Int
    time: Float
  }
`;
```

Apollo passes the arguments passed in to your mutation as the 2nd
parameter to your mutation's resolver function:

```javascript
increment: (obj, args) => {
  args.num; // Whatever the user passed in `increment()`
}
```

Below is a full implementation of `increment()` with arguments:

```javascript
[require:GraphQL mutations increment with args$]
```