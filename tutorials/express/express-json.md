The [`app.use()`](/tutorials/express/app-use) function adds a new middleware to the app.
Essentially, whenever a request hits your backend, the `app.use()` functions will trigger.
For example, if you wanted to print HTTP method and the URL of every request, you would do the following:

```javascript
const app = require('express')();

app.use((req, res, next) => {
  // For example, a GET request to `/test` will print "GET /test"
  console.log(`${req.method} ${req.url}`);

  next();
});

app.get('/test', (req, res, next) => {
  res.send('ok');
});

// Test the above app using Axios
const server = await app.listen(3000);

const axios = require('axios');
// Prints "get /test"
const res = await axios.get('http://localhost:3000/test');

```


## Using express.json()

`express.json()` is a built in middleware function in Express starting from v4.16.0.
It parses incoming requests with JSON payloads.

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/test', function(req,res) {
    // without express.json(), this is undefined.
    console.log(`${req.body}`);
});

```

## Using the limit option in express.json()

The `limit` option allows you to specify the size of the request body.
Whether you input a string or a number, it will be interpreted as the maximum size of the payload in bytes.

```javascript
app.use(express.json({ limit: 10 }));
// or
app.use(express.json({ limit: '10' }));
```


