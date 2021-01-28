With Mongoose, you can prevent duplicates in your databases using [validation](https://mongoosejs.com/docs/validation.html). Validation is defined in the SchemaType and is a middleware. You can also create your own validation in the schema or you can use Mongooses's built in validation. To prevent duplicates, we recommend using the `unique` property as it tells Mongoose each document should have a [unique](https://masteringjs.io/tutorials/mongoose/unique) value for a given path. It is a shorthand for creating a MongoDB unique index on, in this case, `email`. If you wait for the index to be built, you can you Mongoose's promised based event, `Model.init()`, which is shown below::

```javascript
[require:Mongoose validates-email]
```

It is important to note that the [unique property](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator) is not a validator.
