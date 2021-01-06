['Mongoose has a readyState property in the Connection route of the API']('https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState') that is of type **property** and will return a number representing the current state of the connection, 0-4. These states are as follows:

- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting
- 4 = invalid credentials

These event names will emit when the state changes.
