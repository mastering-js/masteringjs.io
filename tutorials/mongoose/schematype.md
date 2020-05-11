In [Mongoose](https://mongoosejs.com/), a [SchemaType](https://mongoosejs.com/docs/schematypes.html) is a configuration object for a single path within a schema.
A SchemaType says what type the path should be, how to validate that path, what
the default value for the path is, and other Mongoose-specific config options.

```javascript
[require:Mongoose SchemaType basic example$]
```

The `SchemaType` class is just a base class. There are several classes
that inherit from `SchemaType` that represent different core Mongoose Types:

- `mongoose.Schema.Types.String`
- `mongoose.Schema.Types.Number`
- `mongoose.Schema.Types.Date`
- `mongoose.Schema.Types.Buffer`
- `mongoose.Schema.Types.Boolean`
- `mongoose.Schema.Types.Mixed`
- `mongoose.Schema.Types.ObjectId` (or, equivalently, `mongoose.ObjectId`)
- `mongoose.Schema.Types.Array`
- `mongoose.Schema.Types.Decimal128`
- `mongoose.Schema.Types.Map`

For example:

```javascript
[require:Mongoose SchemaType with inheritance$]
```

Working With SchemaTypes
-----------------------

You normally don't have to work with `SchemaType` instances directly.
You can declare validators and defaults in your [schema definition](/tutorials/mongoose/schema). For example, the below example sets the default `age` to 25
and adds a validator that ensures `age` is at least 21.

```javascript
const schema = Schema({
  age: {
    type: Number,
    default: 25,
    validate: v => v >= 21
  }
});
```

The above is how you normally declare defaults and validators in Mongoose.
But there's nothing stopping you from adding them on the `age` SchemaType
after creating your schema.

```javascript
// Equivalent:
const schema = Schema({ age: Number });

schema.path('age').default(25);
schema.path('age').validate(v => v >= 21);
```

The latter syntax is equivalent to the former, but isn't commonly used.
The most common case for working with `SchemaType` instances directly
is with [embedded discriminators](https://thecodebarbarian.com/mongoose-4.12-single-embedded-discriminators.html).

For example, suppose you have an `Order` schema, and an `Order`
has an embedded list of `products`. Each product may be a book,
computer, or something else, and each type of product can have different properties.
Embedded discriminators let an array store subdocuments that conform
to different schemas based on each subdocument's `__t` property.

```javascript
const productSchema = new Schema({
  imageURL: String,
  name: String
}, { discriminatorKey: '__t' });

const bookSchema = new Schema({
  author: String
});

const computerSchema = new Schema({
  ramGB: Number
});

const orderSchema = new Schema({
  createdAt: Date,
  product: [productSchema]
});

// Add discriminators to the `products` SchemaType.
orderSchema.path('products').discriminator('Book', bookSchema);
orderSchema.path('products').discriminator('Computer', computerSchema);

const Order = mongoose.model('Order', orderSchema);
```