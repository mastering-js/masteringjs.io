[The `vue.config.js` file](https://cli.vuejs.org/config/) is a config file for
the [Vue CLI](/tutorials/vue/cli). The `vue.config.js` file exports an object
that contains various config options. For example, the below is a valid `vue.config.js`:

```javascript
module.exports = {};
```

Starting a Dev Server
---------------------

One of the most common uses for the Vue CLI is [starting a local web server](https://medium.com/js-dojo/how-to-setup-vue-dev-server-with-a-running-web-server-7532c53b3198) for development work. The Vue CLI is one of the easiest ways to compile
your vanilla JS into a website, without needing to write any HTML.

First, run `npm install vue @vue/cli @vue/cli-service-global`. The `@vue/cli-service-global` plugin is required to run a server locally.
Next, create an `index.js` file that contains some Vue code:

```javascript
import Vue from 'vue';

new Vue({
  data: () => ({ count: 0 }),
  template: '<h1 v-on:click="++count">Clicked {{count}}</h1>'
});
```

Note that this code does **not** explicitly mount the Vue instance to
the DOM. The Vue CLI will take care of that.

Next, open up `vue.config.js` and set the [`devServer.port` option](https://cli.vuejs.org/config/#devserver) to tell the Vue CLI what port to run the web server on:

```javascript
'use strict';

module.exports = {
  devServer: {
    port: 3000
  }
};
```

Now, run `./node_modules/.bin/vue serve` to start the web server and
compile your `index.js` file. You should see output similar to the below:

```
 DONE  Compiled successfully in 337ms                                     5:56:59 PM


  App running at:
  - Local:   http://localhost:3000/ 
  - Network: http://10.87.106.132:3000/

```

Point your web browser to `http://localhost:3000`, and you should
see an `<h1>` tag that says "Clicked 0".