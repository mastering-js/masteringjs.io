[Express](http://expressjs.com/) has a built-in [middleware](/tutorials/express/middleware) for serving static files from a directory. For example, suppose you have a `public` directory that contains files like images, CSS, and HTML.

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
app.use(express.static('./public'));

app.listen(3000);
```

With the above script, you can open `http://localhost:3000/home.css` in your browser and see the CSS file.

<img src="https://codebarbarian-images.s3.amazonaws.com/static-example.png" class="inline-image" style="width: 400px">

Serving HTML Files
------------------

The `static` middleware is how you can use Express to serve static HTML files. If you have a vanilla HTML file `test.html`, you can open that file in your browser and the browser will render the HTML.

<img src="https://codebarbarian-images.s3.amazonaws.com/static-example-2.png" class="inline-image" style="width: 400px">

This means that you can use `express.static()` to host an entire frontend web app, including JavaScript, CSS, images, and HTML.