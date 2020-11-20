In Express, `app.use(express.static())` adds a [middleware for serving static files](/tutorials/express/static)
to your Express app.

For example, suppose you have the below `public` directory in your project:

```
$ ls -l public/
total 48
-rw-r--r--  1 ubuntu  ubuntu   1666 Mar 12 14:17 home.css
-rw-r--r--@ 1 ubuntu  ubuntu  17092 Mar 12 14:17 logo.png
$ 
```

You can use [the `express.static` middleware](https://expressjs.com/en/starter/static-files.html) to make it possible to access files from this folder via HTTP.

```javascript
const express = require('express');

const app = express();
// The first parameter to `express.static()` is the directory to serve.
app.use(express.static('./public'));

app.listen(3000);
```

With the above script, you can open `http://localhost:3000/home.css` in your browser and see the CSS file.

<img src="https://codebarbarian-images.s3.amazonaws.com/static-example.png" class="inline-image" style="width: 400px" alt="Displaying a CSS file in Google Chrome">

Order Matters!
--------------

Keep in mind the [`app.use()` function](/tutorials/express/app-use) executes [middleware](/tutorials/express/middleware) in order.
The `express.static()` middleware returns an HTTP 404 if it can't find a file, so
that means you should typically call `app.use(express.static())` **after** the rest of your app. Otherwise you'll end
up with an HTTP 404 error:

```javascript
const express = require('express');

const app = express();
app.use(express.static('./public'));

// Don't do this! If you do an HTTP request to `/test`, you'll get an
// HTTP 404 because this route handler is after `express.static()`!
app.get('/test', function requestHandler(req, res) {
  res.send('ok');
});

app.listen(3000);
```

Make sure you put `express.static()` last:

```javascript
const express = require('express');

const app = express();

// Works! Express will handle requests to `/test`, and defer to
// the `static` middleware for requests for other URLs.
app.get('/test', function requestHandler(req, res) {
  res.send('ok');
});

app.use(express.static('./public'));

app.listen(3000);
```