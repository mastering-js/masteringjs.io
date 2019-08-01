The `mongoose.connect()` function is the easiest way to
[connect to MongoDB using Mongoose](https://mongoosejs.com/docs/connections.html).
Once you've connected, you can then [create a Mongoose model](https://mongoosejs.com/docs/models.html) and start interacting with MongoDB.

```javascript
[require:Mongoose.*connect.*basic]
```

The [`mongoose.connect()` function returns a promise](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect) that fulfills if Mongoose successfully connects to MongoDB, or rejects if Mongoose could not connect.

```javascript
[require:Mongoose.*connect.*error]
```

Many [older tutorials recommend listening to connection events](https://theholmesoffice.com/mongoose-connection-best-practice/). This isn't strictly necessary because [Mongoose handles automatically reconnecting on its own](https://thecodebarbarian.com/managing-connections-with-the-mongodb-node-driver.html#handling-single-server-outages) if it loses connectivity to MongoDB after initial connection.

The promise `mongoose.connect()` returns only rejects if there is an error when
Mongoose is initially connecting to MongoDB. Once Mongoose successfully connects,
it automatically handles reconnecting if it loses connectivity.

The `reconnectFailed` Event
-------------------------

Mongoose handles automatically reconnecting to MongoDB. Internally, the underlying
MongoDB driver tries to reconnect `reconnectTries` times every `reconnectInterval`
milliseconds if you're connected to a single server. You can set
`reconnectTries` and `reconnectInterval` in the [`mongoose.connect()` options](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect).

```javascript
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, // Boilerplate
  // If you lose connectivity, try reconnecting every 2 seconds. After 60
  // attempts, give up and emit 'reconnectFailed'.
  reconnectTries: 60,
  reconnectInterval: 2000
})
```

When Mongoose gives up, it emits a 'reconnectFailed' event on the [connection](https://mongoosejs.com/docs/api/connection.html).

```javascript
// If Mongoose gave up trying to reconnect, kill the process.
mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error('Mongoose could not reconnect to MongoDB server');
  });
});
```

If you're connected to a replica set, `reconnectTries` and `reconnectInterval` don't do anything. Mongoose will continue to reconnect indefinitely if it loses connectivity to a replica set after initial connection.