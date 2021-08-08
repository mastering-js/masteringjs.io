[Mongoose schemas have a `timestamps` option](https://mongoosejs.com/docs/guide.html#timestamps) that
tells Mongoose to automatically manage `createdAt` and `updatedAt` properties on your documents.
For example, here's how you can enable timestamps on a `User` model.

```javascript
const userSchema = mongoose.Schema(
  {
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const doc = await User.create({ email: "test@google.com" });

doc.createdAt; // 2020-07-06T20:36:59.414Z
doc.updatedAt; // 2020-07-06T20:36:59.414Z

doc.createdAt instanceof Date; // true
```

When you enable timestamps, Mongoose adds `createdAt` and `updatedAt` properties to your schema.
By default, `createdAt` and `updatedAt` are of type `Date`. When you [update a document](/tutorials/mongoose/update), Mongoose automatically increments `updatedAt`.

```javascript
doc.email = "sergey@google.com";
await doc.save();

doc.createdAt; // 2020-07-06T20:36:59.414Z
doc.updatedAt; // 2020-07-06T20:37:09.071Z
```

[Specific mongoose model write operations](https://mongoosejs.com/docs/api.html#query_Query-setOptions)
allow you to skip timestamps provided that `timestamps` were set in the schema. To do so, you must set
`timestamps` to `false` and the time will not be updated on that operation.

```javascript
[require:Update-Mongoose-Timestamps simple]
```

If you want to prevent only one of those
from updating, instead of setting timestamps to `false` as the value, create an object with key-value pairs. The
key(s) being `createdAt` and/or `updatedAt` and the value(s) being `true` or `false` depending on what you need.

```javascript
[require:Update-Mongoose-Timestamps complex]
```

## Alternate Property Names

By default, Mongoose uses `createdAt` and `updatedAt` as the property names for timestamps.
But you can make Mongoose use any property name you like. For example, if you prefer `snake_case`
property names, you can make Mongoose use `created_at` and `updated_at` instead:

```javascript
const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
};

const userSchema = mongoose.Schema({ email: String }, opts);
const User = mongoose.model('User', userSchema);

const doc = await User.create({ email: 'test@google.com' });
doc.updated_at; // 2020-07-06T20:38:52.917Z
```

## With Unix Timestamps

Although date types are normally sufficient, you can also make Mongoose store timestamps
as seconds since January 1, 1970 (the [Unix epoch](/tutorials/fundamentals/timestamps)).
Mongoose schemas support a `timestamps.currentTime` option that lets you pass a custom
function to use for getting the current time.

```javascript
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const userSchema = mongoose.Schema(
  {
    email: String,
  },
  opts
);
```
