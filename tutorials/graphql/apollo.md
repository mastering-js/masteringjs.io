The [apollo-server package](https://www.npmjs.com/package/apollo-server) provides a framework for
building GraphQL APIs. There are 2 components
you need to implement to build a GraphQL API:

* [Schema](https://graphql.org/learn/schema/): What types exist in your system and what operations are allowed on those types.
* Resolvers: How to load individual properties of your types.

Schema and Resolvers
--------------------

With a GraphQL schema and resolvers, you can define
a read-only API with Apollo.

First, a GraphQL schema is a string that defines
every type your API returns and every operation your
API allows. For example, the below GraphQL schema
defines one query operation, `getCount()`, that
returns an object of type `CountResult`.

```javascript
const schema = `
  type Query {
    getCount: CountResult
  }

  type CountResult {
    count: Int
    time: Float
  }
`;
```

In a GraphQL schema, the `Query` type is special: it lists out
all queries (read-only operations) that the server allows.

_Resolvers_ allow you to actually implement the `getCount()`
function. The below example shows how you can start up an
Apollo server with the above schema, and make an
HTTP request using Axios:

```javascript
[require:GraphQL apollo read-only count$]
```

Mutations
---------

The previous Apollo server is read-only. It just allows you to
get the current `count`, not increment it. In GraphQL, an operation
that modifies data is called a [mutation](https://graphql.org/graphql-js/mutations-and-input-types/).

Like `Query`, `Mutation` is a special type that lists out every
mutation your API allows.

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

In Apollo, mutations are just resolvers for the `Mutation` type
as shown below.

```javascript
[require:GraphQL apollo increment count$]
```