The [`app.use()`](/tutorials/express/app-use) function adds a new middleware to the app.
Essentially, whenever a request hits your backend, Express will execute the functions you passed to `app.use()` in order.
For example, if you wanted to print the HTTP method and the URL of every request, you would do the following:

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
It parses incoming JSON requests and puts the parsed data in `req.body`.

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

```javascript
const app = require('express')();
app.use(express.json({ limit: 1 }));


app.post('/limit-break', (req, res, next) => {
  console.log(req.body);
  res.send('ok');
});

// Test the above app using Axios
const server = await app.listen(3000);

const axios = require('axios');
// Throws `PayloadTooLargeError: request entity to large
const res = await axios.post('http://localhost:3000/limit-break', {name: 'Masteringjs', location: 'Flordia', helpful: true});
```

