'use strict';

const acquit = require('acquit');
const fs = require('fs');
const home = require('./components/home');
const layout = require('./components/layout');
const list = require('./components/list');
const marked = require('marked');
const moment = require('moment');
const transform = require('acquit-require');
const tutorialTemplate = require('./components/tutorial');

require('acquit-ignore')();

const highlight = require('highlight.js');
marked.setOptions({
  highlight: function(code) {
    return highlight.highlight('JavaScript', code).value;
  }
});

run().then(() => console.log('done')).catch(err => console.log(err));

async function run() {
  const tests = [
    ...acquit.parse(fs.readFileSync('./examples/axios.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/express.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/fundamentals.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/mongoose.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/vue.test.js', 'utf8'))
  ];

  const tutorials = [
    {
      title: 'Upserting Documents with Mongoose',
      raw: './tutorials/mongoose/upsert.md',
      url: '/tutorials/mongoose/upsert',
      description: 'Learn how to use insert a document in Mongoose if it doesn\'t already exist',
      tags: ['mongoose'],
      date: moment('2019-05-20')
    },
    {
      title: 'HTTP Request Error Handling With Axios Interceptors',
      raw: './tutorials/axios/error_handling.md',
      url: '/tutorials/axios/error-handling',
      description: 'Learn how to use Axios interceptors to make HTTP error messages readable',
      tags: ['axios'],
      date: moment('2019-05-17')
    },
    {
      title: 'Check if a String Contains a Substring in JavaScript',
      raw: './tutorials/fundamentals/contains-substring.md',
      url: '/tutorials/fundamentals/contains-substring',
      description: 'Learn how to check if a string contains a substring in vanilla JavaScript',
      tags: ['fundamentals'],
      date: moment('2019-05-16')
    },
    {
      title: '8 Neat Examples with forEach() in JavaScript',
      raw: './tutorials/fundamentals/foreach.md',
      url: '/tutorials/fundamentals/foreach',
      description: 'Learn how to iterate nested arrays, object keys, and other values using forEach() in JavaScript',
      tags: ['fundamentals'],
      date: moment('2019-05-15')
    },
    {
      title: 'Redirects With Express',
      raw: './tutorials/express/redirect.md',
      url: '/tutorials/express/redirect',
      description: 'Learn how to redirect to a different URL using Express',
      tags: ['express'],
      date: moment('2019-05-14')
    },
    {
      title: 'Understanding Vue.js Slots',
      raw: './tutorials/vue/slots.md',
      url: '/tutorials/vue/slots',
      description: 'Learn how to embed arbitrary content in Vue components using slots.',
      tags: ['vue'],
      date: moment('2019-05-13')
    },
    {
      title: 'Getting Started with Mongoose Virtuals',
      raw: './tutorials/mongoose/virtuals.md',
      url: '/tutorials/mongoose/virtuals',
      description: 'Learn about declaring and using virtuals in Mongoose.',
      tags: ['mongoose'],
      date: moment('2019-05-11')
    },
    {
      title: 'The Difference Between in and hasOwnProperty in JavaScript',
      raw: './tutorials/fundamentals/hasownproperty.md',
      url: '/tutorials/fundamentals/hasownproperty',
      description: 'Learn about the different ways to check if an object contains a given key in JavaScript',
      tags: ['fundamentals'],
      date: moment('2019-05-10')
    },
    {
      title: 'An Introduction to Vuex',
      raw: './tutorials/vue/vuex.md',
      url: '/tutorials/vue/vuex',
      description: 'Learn how to use vuex, the official state management library for Vue',
      tags: ['vue'],
      date: moment('2019-05-08')
    },
    {
      title: 'Enable HTTPS With Express',
      raw: './tutorials/express/https.md',
      url: '/tutorials/express/https',
      description: 'Learn how to enable your Express server to respond on https://localhost',
      tags: ['express'],
      date: moment('2019-05-07')
    },
    {
      title: 'Server Side Rendering with Vue and Express',
      raw: './tutorials/vue/ssr.md',
      url: '/tutorials/vue/ssr',
      description: 'Learn how to render Vue components on the server side with Express',
      tags: ['vue', 'express'],
      date: moment('2019-05-05')
    },
    {
      title: 'Basic Auth Using the Axios HTTP Client',
      raw: './tutorials/axios/basic_auth.md',
      url: '/tutorials/axios/basic_auth',
      description: 'Learn how to do HTTP basic authentication using Axios',
      tags: ['axios'],
      date: moment('2019-05-04')
    },
    {
      title: 'Format Dates Using Vanilla JavaScript',
      raw: './tutorials/fundamentals/date_format.md',
      url: '/tutorials/fundamentals/date_format',
      description: 'Learn about formatting dates using the `toLocaleString()` function, with no outside libraries',
      tags: ['fundamentals'],
      date: moment('2019-05-03')
    },
    {
      title: 'Updating Documents in Mongoose',
      raw: './tutorials/mongoose/update.md',
      url: '/tutorials/mongoose/update',
      description: 'Learn about the different ways to update a document in Mongoose.',
      tags: ['mongoose'],
      date: moment('2019-05-02')
    },
    {
      title: 'Calculate Standard Deviation in JavaScript',
      raw: './tutorials/fundamentals/stddev.md',
      url: '/tutorials/fundamentals/stddev',
      description: 'Use Mathjs to calculate standard deviation in Node.js and the browser.',
      tags: ['fundamentals'],
      date: moment('2019-05-01')
    },
    {
      title: 'Understand valueOf() in JavaScript',
      raw: './tutorials/fundamentals/valueof.md',
      url: '/tutorials/fundamentals/valueof',
      description: 'Learn what String valueOf(), Number valueOf(), and Date valueOf() have in common.',
      tags: ['mongoose'],
      date: moment('2019-04-30')
    },
    {
      title: 'Debug E11000 Errors in Mongoose',
      raw: './tutorials/mongoose/duplicate_key.md',
      url: '/tutorials/mongoose/e11000-duplicate-key',
      description: 'Learn how to understand and debug E11000 errors in Mongoose.',
      tags: ['mongoose'],
      date: moment('2019-04-29')
    },
    {
      title: 'Get the Current Timestamp in JavaScript',
      raw: './tutorials/fundamentals/timestamps.md',
      url: '/tutorials/fundamentals/timestamps',
      description: 'Learn how to get the current Unix time in JavaScript.',
      tags: ['fundamentals'],
      date: moment('2019-04-28')
    },
    {
      title: 'Setting Request Headers with Axios',
      raw: './tutorials/axios/headers.md',
      url: '/tutorials/axios/headers',
      description: 'Learn how to set HTTP request headers on GET and POST requests with the Axios HTTP client.',
      tags: ['axios'],
      date: moment('2019-04-27')
    }
  ];

  fs.writeFileSync('./index.html', home({ posts: tutorials }));

  for (const tutorial of tutorials) {
    console.log(tutorial);
    tutorial.content =
      marked(transform(fs.readFileSync(tutorial.raw, 'utf8'), tests));
    tutorial.content = tutorialTemplate({ tutorial, tutorials })
    const html = layout(tutorial);
    fs.writeFileSync('.' + tutorial.url + '.html', html);
  }

  fs.writeFileSync('./all.html', layout({
    title: 'All Tutorials',
    content: list({ posts: tutorials })
  }));
}