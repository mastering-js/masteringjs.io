Mongoose provides numerous powerful features, like [middleware](https://mongoosejs.com/docs/middleware.html) and [validation](https://mongoosejs.com/docs/validation.html). But sometimes you want to bypass Mongoose and use the [MongoDB Node.js driver](https://www.npmjs.com/package/mongodb) directly. [Mongoose connections](https://mongoosejs.com/docs/api/connection.html) have a [`db` property](https://mongoosejs.com/docs/api/connection.html#connection_Connection-db) that let you access the [MongoDB driver's `db` handle](http://mongodb.github.io/node-mongodb-native/3.6/api/Db.html):

```javascript
[require:Mongoose using db$]
```

The `db` property is usually enough, but there are some cases where you need the [`MongoClient` instance](http://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html) instead of the `db` handle.

```javascript
[require:Mongoose using getClient$]
```