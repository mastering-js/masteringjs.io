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
    ...acquit.parse(fs.readFileSync('./examples/node.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/vue.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/webpack.test.js', 'utf8'))
  ];

  const tutorials = [
    {
      title: 'Uploading Images to Amazon S3 in Node.js',
      raw: './tutorials/node/s3.md',
      url: '/tutorials/node/s3',
      description: 'Learn how to upload files to Amazon S3 using the AWS Node.js SDK',
      tags: ['node'],
      date: moment('2019-06-11')
    },
    {
      title: 'WebSockets in Node.js',
      raw: './tutorials/node/websockets.md',
      url: '/tutorials/node/websockets',
      description: 'WebSockets enable two-way communication between browser and server, including pushing updates to the browser. Here\'s how you can use websockets in Node.js',
      tags: ['node'],
      date: moment('2019-06-10')
    },
    {
      title: 'An Introduction to Vue CLI',
      raw: './tutorials/vue/cli.md',
      url: '/tutorials/vue/cli',
      description: 'A brief introduction to Vue CLI with video',
      tags: ['vue'],
      date: moment('2019-06-07')
    },
    {
      title: 'An Introduction to Vue Components',
      raw: './tutorials/vue/components.md',
      url: '/tutorials/vue/components',
      description: 'A tutorial describing the basics of Vue components: templates, data, props, and events',
      tags: ['vue'],
      date: moment('2019-06-06')
    },
    {
      title: 'An Introduction to Webpack Watch',
      raw: './tutorials/webpack/watch.md',
      url: '/tutorials/webpack/watch',
      description: 'Learn how Webpack\'s watch mode (--watch) works, with examples.',
      tags: ['webpack'],
      date: moment('2019-06-05')
    },
    {
      title: 'Running Webpack from Node.js',
      raw: './tutorials/webpack/node.md',
      url: '/tutorials/webpack/node',
      description: 'Learn how to run Webpack from your Node.js scripts, no CLI required',
      tags: ['webpack'],
      date: moment('2019-06-04')
    },
    {
      title: 'Replace All Instances of a String in JavaScript',
      raw: './tutorials/fundamentals/string-replace.md',
      url: '/tutorials/fundamentals/string-replace',
      description: 'Learn how to replace all instances of a given substring in a JavaScript string',
      tags: ['fundamentals'],
      date: moment('2019-06-03')
    },
    {
      title: 'An Introduction to Vue Template Compiler',
      raw: './tutorials/vue/template-compiler.md',
      url: '/tutorials/vue/template-compiler',
      description: 'Learn how to use the vue-template-compiler npm module to compile Vue templates',
      tags: ['vue'],
      date: moment('2019-05-31')
    },
    {
      title: 'Sorting an Array in JavaScript',
      raw: './tutorials/fundamentals/array-sort.md',
      url: '/tutorials/fundamentals/array-sort',
      description: 'Learn how to use the built-in `Array#sort()` function in JavaScript',
      tags: ['fundamentals'],
      date: moment('2019-05-30')
    },
    {
      title: 'Maps in JavaScript',
      raw: './tutorials/fundamentals/map.md',
      url: '/tutorials/fundamentals/map',
      description: 'Learn how to use ES6 maps in JavaScript',
      tags: ['fundamentals'],
      date: moment('2019-05-29')
    },
    {
      title: 'Compare Two Strings in JavaScript',
      raw: './tutorials/fundamentals/string-compare.md',
      url: '/tutorials/fundamentals/string-compare',
      description: 'Learn how to compare two strings in JavaScript: whether one string is greater than, less than, or equal to the other.',
      tags: ['fundamentals'],
      date: moment('2019-05-28')
    },
    {
      title: 'Introduction to Vue Router',
      raw: './tutorials/vue/router.md',
      url: '/tutorials/vue/router',
      description: 'Learn how to handle page navigation in Vue using Vue Router',
      tags: ['vue'],
      date: moment('2019-05-27')
    },
    {
      title: '3 Ways to Define Templates in Vue',
      raw: './tutorials/vue/templates.md',
      url: '/tutorials/vue/templates',
      description: 'Learn how to define templates in Vue using string templates, inline templates, and single file components.',
      tags: ['vue'],
      date: moment('2019-05-24')
    },
    {
      title: 'Run Webpack Watch From Node.js',
      raw: './tutorials/webpack/programmatic-watch.md',
      url: '/tutorials/webpack/programmatic-watch',
      description: 'Learn how to run `webpack --watch` from your Node.js dev server using the Webpack Node API',
      tags: ['webpack'],
      date: moment('2019-05-23')
    },
    {
      title: 'File Uploads with Express',
      raw: './tutorials/express/file-upload.md',
      url: '/tutorials/express/file-upload',
      description: 'Learn how to upload files using Express, with help from the library Formidable.',
      tags: ['express'],
      date: moment('2019-05-22')
    },
    {
      title: 'Supporting Promises in Express Middleware',
      raw: './tutorials/express/promises.md',
      url: '/tutorials/express/promises',
      description: 'Express doesn\'t support promises by default. Learn what you can do about it.',
      tags: ['express'],
      date: moment('2019-05-21')
    },
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