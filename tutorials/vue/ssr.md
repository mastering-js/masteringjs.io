[Vue has solid support for server-side rendering in Node.js](https://vuejs.org/guide/scaling-up/ssr.html). This means that, given a Vue app,
you can render the app in an Express endpoint using the `renderToString` function in the `server-renderer` directory.

Below is an example of rendering a Vue app using [Express](https://www.npmjs.com/package/express).

```javascript
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

Note that the `renderToString()` function returns a promise. Make sure you [handle errors](https://thecodebarbarian.com/introducing-await-js-express-async-support-for-express-apps).

## Making the button interactive

The way this is currently set up, the button will not be interactive. 
To make the button interactive, you must use `createSSRApp` on the frontend of your application instead of `createApp()`.

```javascript
// frontend

import { createSSRApp } from 'vue';

const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<div @click="count++">{{ count }}</div>`,
});

export app;

app.mount('#app');

```

```javascript
// backend

import express from 'express';
import { renderToString } from 'vue/server-renderer';
// import app from the frontend
const server = express();

server.get('/', (req, res) => {
  
  // const app = app

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <!--<script type="module" src=""></script>Put the frontend file in the src tag-->
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static('.'));

server.listen(3000, () => {
  console.log('ready');
});

```

Now when you click the button, it will increment.