Mongoose `String` and `Number` types have an `enum` validator.
The `enum` validator is an array that will check if the value given is an item in the array.
If the value is not in the array, Mongoose will throw a `ValidationError` when you try to `save()`.

```javascript
const testSchema = new mongoose.Schema({
    name: {type: String, enum: ['Test']}
})

const Test = mongoose.model('Test', testSchema);

await Test.create({ name: 'Monster'}); // will throw validation error
await Test.create({ name: 'Test'}); // no issue
```

## Typescript enums

You can also use [Typescript Enums](https://www.typescriptlang.org/docs/handbook/enums.html) to pass as an option to mongoose enums.
When you pass an object as a value to the `enum` property in mongoose, mongoose will run `Object.values()` on the object to get the desired values.

```typescript
enum Rating {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five
};

const testSchema = new mongoose.Schema({
    rating: {type: Number, enum: Rating}
});

const Test = mongoose.model('Test', testSchema);

await Test.create({ rating: 6}); // will throw validation error
await Test.create({ name: 3}); // no issue
```
