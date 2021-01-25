With Mongoose, you can prevent duplicates in your databases using [Validation](https://mongoosejs.com/docs/validation.html). Validation is defined in the SchemaType and is a middleware. You can also create your own validation in the schema or you can use Mongooses's built in validation. Here is an example of how to define a validator that checks for the uniqueness of an email:

```javascript
[require:Mongoose validates-email]
```

It is important to note that the `unique` option is not a validator. It is a shortahnd for creating a MongoDB unique index on, in this case, `email`. If you wait for the index to be built, you can use either Mongoose's `Model.on('index')` event or you can you Mongoose's promised based alternative, `Model.init()`, which is shown below:

```javascript
[require:Mongoose unique-validates-email]
```
