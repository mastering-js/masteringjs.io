[Mongoose connections have a `readyState` property](https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState) that contains a number representing the current state of the connection, 0-4. These states are as follows:

- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting
- 4 = invalid credentials

These event names will emit when the state changes.

```javascript
[require:Mongoose.*connection-status.*gh-32]
```
