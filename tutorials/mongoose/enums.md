Mongoose `String` and `Number` types had access to the `enum` validator.
The `enum` validator is an array that will check if the value given is an item in the array.
If it is not, it will throw an error.

```javascript
const testSchema = new mongoose.Schema({
    name: {type: String, enum: ['Test']}
})

const Test = mongoose.model('Test', testSchema);

await Test.create({ name: 'Monster'}); // will throw validation error
await Test.create({ name: 'Test'}); // no issue
```

## Typescript enums

