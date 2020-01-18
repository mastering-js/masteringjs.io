[Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) are a new HTTP API for pushing events from the server to the client. Unlike [websockets](/tutorials/node/websockets), server-sent events (SSE for short) are built
on top of the HTTP protocol, so no need for `ws://` URLs or additional npm modules.
Server-side events also [handle reconnecting automatically](https://www.html5rocks.com/en/tutorials/eventsource/basics/#toc-reconnection-timeout), so you don't have to write
code to reconnect if the connection is lost.

Getting Started
---------------

On the client side, you use the [`EventSource` class](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Interfaces) to connect to a server-side event source.
The client side is easy: just point the `EventSource` class to an [Express route](/tutorials/express/router) that's configured to handle SSE and [add an event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```javascript
<html>
  <body>
    <div id="content"></div>

    <script type="text/javascript">
      const source = new EventSource('/events');

      source.addEventListener('message', message => {
        console.log('Got', message);

        // Display the event data in the `content` div
        document.querySelector('#content').innerHTML = event.data;
      });
    </script>
  </body>
</html>
```

The Express side is the tricky part. To support SSE, you need to
set 3 headers, and then [send the headers to the client using `flushHeaders()`](https://nodejs.org/api/http.html#http_request_flushheaders):

- `Cache-Control: no-cache`
- `Content-Type: text/event-stream`: So the client knows this response is an HTTP stream
- `Connection: keep-alive`: So Node.js knows to keep the HTTP socket open

Once you've called `flushHeaders()`, you can then start writing events using [the `res.write()` function](https://nodejs.org/api/http.html#http_request_write_chunk_encoding_callback). The `res.write()` function
writes to the HTTP connection without explicitly ending the HTTP response. Make sure you do **not** use [`res.send()` or `res.end()`](/tutorials/express/res), because those explicitly end the response.

Below is an example of a standalone Express server that handles SSE with the
`/events` endpoint:

```javascript
'use strict';

const express = require('express');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
  const app = express();

  app.get('/events', async function(req, res) {
    console.log('Got /events');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Emit', ++count);
      // Emit an SSE that contains the current 'count' as a string
      res.write(`data: ${count}\n\n`);
    }
  });

  const index = fs.readFileSync('./index.html', 'utf8');
  app.get('/', (req, res) => res.send(index));

  await app.listen(3000);
  console.log('Listening on port 3000');
}
```

Run the above server and navigate to `http://localhost:3000`, you
should see the below:

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b9601ab3d7694f59b59efd139a572f52" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>