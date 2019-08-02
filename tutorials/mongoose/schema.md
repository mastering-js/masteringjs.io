In Mongoose, a [schema](https://mongoosejs.com/docs/guide.html) is a configuration
object for a model. Schemas do **not** allow you to read and write from MongoDB,
that's what models are for. But they do:

- Define what properties the documents you save in MongoDB can have
- Define custom [validation](https://mongoosejs.com/docs/validation.html)
- Declare [virtuals](/tutorials/mongoose/virtuals)
- Declare [getters and setters](https://mongoosejs.com/docs/tutorials/getters-setters.html)
- Define [statics](https://mongoosejs.com/docs/guide.html#statics) and [methods](https://mongoosejs.com/docs/guide.html#methods)

Schema Paths and Casting
------------------------

The first parameter to the [`Schema` class constructor](https://mongoosejs.com/docs/api/schema.html#schema_Schema) is a `definition` object.
This object defines what paths a schema has. For example, the below `userSchema` has a `name` path and an `age` path.

```javascript
[require:Mongoose.*Schema.*definition]
```

To create a model in Mongoose, you call the [`mongoose.model()` function](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-model) with a schema as the 2nd parameter. For example, `UserModel` in the below example will
have `name` and `age` properties, and will strip out any properties that aren't
defined in `userSchema`.

```javascript
[require:Mongoose.*Schema.*model]
```

Furthermore, Mongoose will cast documents to match the given schema types. This
means you can safely pass untrusted data to Mongoose and trust that the data
will match your schema.

```javascript
[require:Mongoose.*Schema.*casting]
```

Validation
----------

In addition to casting values, Mongoose also lets you define validation
in your schemas. For example, suppose you want to ensure your users have a
`name`. You can make the `name` property `required` in your schema as shown below.

```javascript
[require:Mongoose.*Schema.*validation]
```

Options
-------

The schema constructor takes 2 parameters: `definition` and `options`.
You can find a [complete list of schema options on the Mongoose docs](https://mongoosejs.com/docs/guide.html#options).

For example, the [`typeKey` option](https://mongoosejs.com/docs/guide.html#typeKey) lets you configure what key Mongoose looks for to determine if you're defining a nested path. Suppose you wanted to define a nested key named `type`:

```javascript
[require:Mongoose.*Schema.*nested]
```

There are [several workarounds](https://mongoosejs.com/docs/faq.html#type-key)
for this use case. One is to set the `typeKey` option as shown below.

```javascript
[require:Mongoose.*Schema.*typeKey]
```