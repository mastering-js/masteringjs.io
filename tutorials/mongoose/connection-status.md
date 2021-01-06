['Mongoose has a readyState property in the Connection route of the API']('https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState') that is of type **property** and will return a number 0-3. These numbers represent the current state of the connection and are listed below:

- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting

These event names will emit when the state changes.
