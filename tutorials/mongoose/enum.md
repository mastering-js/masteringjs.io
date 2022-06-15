Mongoose `String` and `Number` types have an `enum` validator.
The `enum` validator is an array that will check if the value given is an item in the array.
If the value is not in the array, Mongoose will throw a `ValidationError` when you try to `save()`.

```javascript
const testSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['valid', 'invalid']
  }
})

const Test = mongoose.model('Test', testSchema);

await Test.create({ name: 'not a status' }); // throws validation error
await Test.create({ name: 'valid' }); // works
```

## Typescript enums

You can also use [Typescript Enums](https://www.typescriptlang.org/docs/handbook/enums.html).
At runtime, TypeScript enums are just [POJOs](/tutorials/fundamentals/pojo) where the object's values are the enum values.
When you set `enum` to an object, Mongoose will run `Object.values()` on the object to get the desired values.

```typescript
enum Status {
  Valid,
  Invalid
};

const testSchema = new mongoose.Schema({
  rating: {
    type: Number,
    enum: Rating
  xw}
});

const Test = mongoose.model('Test', testSchema);

await Test.create({ name: 'invalid' }); // throws validation error
await Test.create({ name: 'Valid' }); // works
```
