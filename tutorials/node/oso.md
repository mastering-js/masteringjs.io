[Oso](https://www.osohq.com/) is an authorization-as-a-service provider.
Oso lets you define authorization rules in [Oso's Polar language](https://www.osohq.com/tour-of-polar), an easy-to-read DSL for defining authorization policies.

## Getting Started with Oso

First, install the [oso-cloud npm package](https://www.npmjs.com/package/oso-cloud). Next, sign up on [cloud.osohq.com](https://ui.osohq.com/) and get an API key.

Then, set the `OSO_API_KEY` environment variable and initialize the Oso client in your Node.js app.

```javascript
const { Oso } = require("oso-cloud");

const oso = new Oso({
  apiKey: process.env.OSO_API_KEY
});
```

Now you're ready to start making authorization requests!

## Writing Your First Policy

Authorization rules in Oso are written in [Polar](https://www.osohq.com/docs/modeling-in-polar/reference). Below is a simple Polar policy which says that a User has permission to read an Item if they are an admin on that Item.

```ruby
actor User {}

resource Item {
  permissions = ["read"];
  roles = ["admin"];

  "read" if "admin";
}
```

## Making Authorization Checks

To check whether a user is allowed to perform an action, use `oso.authorize()`.
`oso.authorize()` returns `true` if the user is allowed and `false` otherwise.

```javascript
// `authorized` will be true if User "Alice" can read Item "test-item"
const authorized = await oso.authorize(
  { type: "User", id: "Alice" },
  "read",
  { type: "Item", id: "test-item" }
);
```

At first, the above `oso.authorize()` call will always return `false`.
In order to provide additional data to Oso, you need to also provide facts.
Facts are authorization data that Oso uses in conjunction with the policy to derive the result of your query.
To make the above `oso.authorize()` call succeed, you need to add a fact which tells Oso that User "Alice" is has the "admin" role on Item "test-item" as follows.

```javascript
await oso.insert([
  "has_role",
  {type: "User", id: "Alice"},
  "admin",
  {type: "Item", id: "test-item"}
]);
```
