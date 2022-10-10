[Vue has solid support for server-side rendering in Node.js](https://vuejs.org/guide/scaling-up/ssr.html). This means that, given a Vue app,
you can render the app in an Express endpoint using the `renderToString` function in the `server-renderer` directory.

Below is an example of rendering a Vue app using [Express](https://www.npmjs.com/package/express).

```javascript
const express = require('express');
const { createSSRApp } = require('vue');
const { renderToString } = require('vue/server-renderer');

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

Note that the `renderToString()` function returns a promise. Make sure you [handle errors](https://thecodebarbarian.com/introducing-await-js-express-async-support-for-express-apps).