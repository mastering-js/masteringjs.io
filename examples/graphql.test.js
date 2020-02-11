'use strict';

const assert = require('assert');

describe('GraphQL', function() {
  describe('apollo', function() {
    it('read-only count', async function() {
      const { ApolloServer, gql } = require('apollo-server');

      let count = 0;

      // The `gql()` function parses the schema
      const schema = gql(`
        type Query {
          getCount: CountResult
        }

        type CountResult {
          count: Int
          time: Float
        }
      `);

      // Resolvers define how the actual operations are implemented.
      // The `Query.getCount()` resolver defines what happens when
      // you call `getCount()`, and the `Query.CountResult` resolvers
      // define how to transform the individual properties.
      const resolvers = {
        Query: {
          getCount: () => ({ count, time: Date.now() })
        },
        CountResult: {
          count: obj => obj.count,
          time: obj => obj.time
        }
      };

      const server = new ApolloServer({ typeDefs: schema, resolvers });
      const handle = await server.listen();

      // Make a request to the Apollo server. GraphQL requests are
      // just plain old HTTP requests.
      const axios = require('axios');
      const { data } = await axios.post(handle.url, {
        query: `
          { getCount { count, time } }
        `
      });

      data.data; // { getCount: { count: 0, time: 1581442587371 } }
      // acquit:ignore:start
      assert.strictEqual(data.data.getCount.count, 0);
      await handle.server.close();
      // acquit:ignore:end
    });

    it('increment count', async function() {
      const { ApolloServer, gql } = require('apollo-server');

      let count = 0;

      const schema = gql(`
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
      `);

      const resolvers = {
        Query: {
          getCount: () => ({ count, time: Date.now() })
        },
        // `increment` is just a resolver for the Mutation type
        Mutation: {
          increment: () => ({ count: ++count, time: Date.now() })
        },
        CountResult: {
          count: obj => obj.count,
          time: obj => obj.time
        }
      };

      const server = new ApolloServer({ typeDefs: schema, resolvers });
      const handle = await server.listen();

      const axios = require('axios');
      // Call the `increment` mutation
      await axios.post(handle.url, {
        query: 'mutation { increment { count, time } }'
      });

      // After the `increment` mutation, `count` is now 1
      const { data } = await axios.post(handle.url, {
        query: '{ getCount { count, time } }'
      });

      data.data; // { getCount: { count: 1, time: 1581442587371 } }
      // acquit:ignore:start
      assert.strictEqual(data.data.getCount.count, 1);
      await handle.server.close();
      // acquit:ignore:end
    });
  });
});