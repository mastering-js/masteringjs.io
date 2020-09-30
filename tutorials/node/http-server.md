Node.js has a built in [`http.Server` class](https://nodejs.org/api/http.html#http_class_http_server). Here's how you can start an HTTP server
that responds to every request with the string 'Hello, World!':

```javascript
[require:Node http server hello, world$]
```

Node.js' event loop based concurrency makes it easy to test HTTP servers.
For example, you can start a server and then make an HTTP request to that
server using the [Axios HTTP library](/axios) without any threads.

```javascript
const http = require('http');

const server = http.createServer((req, res) => res.end('Hello, World!'));

server instanceof http.Server; // true
await server.listen(3000);

// Make an HTTP request to the server
const axios = require('axios');
const res = await axios.get('http://localhost:3000');
res.data; // 'Hello, World'
```

Versus [Express](/express)
--------------------------

Most apps use an HTTP framework rather than using the `http.Server` class directly.
The `http.createServer()` function just takes a single function as a parameter, so,
if you use Node's HTTP server directly, you're responsible for implementing routing,
HTTP body parsing, etc. Frameworks like [Express](https://expressjs.com) take care
of routing and body parsing, and provide patterns for organizing your code.

However, most frameworks use `http.Server` under the hood, and let you access
the raw Node.js HTTP server. For example, Express' `listen()` function returns
an instance of the `http.Server` class:

```javascript
const express = require('express');
const app = express();

const server = app.listen(3000);
server instanceof require('http').Server; // true
```