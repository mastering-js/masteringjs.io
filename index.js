'use strict';

const acquit = require('acquit');
const fs = require('fs');
const highlight = require('highlight.js');
const home = require('./components/home');
const layout = require('./components/layout');
const list = require('./components/list');
const marked = require('marked');
const moment = require('moment');
const transform = require('acquit-require');
const tutorialTemplate = require('./components/tutorial');

require('acquit-ignore')();

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
    ...acquit.parse(fs.readFileSync('./examples/lodash.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/mocha.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/mongoose.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/node.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/vue.test.js', 'utf8')),
    ...acquit.parse(fs.readFileSync('./examples/webpack.test.js', 'utf8'))
  ];

  const tutorials = [
    {
      title: 'Building a Basic Form with Vue',
      raw: './tutorials/vue/form.md',
      url: '/tutorials/vue/form',
      description: 'Vue\'s `v-model` directive is useful for collecting user data. Here\'s how you can use `v-model` to build a form.',
      tags: ['vue'],
      date: moment('2019-12-05')
    },
    {
      title: 'Vue Render Functions',
      raw: './tutorials/vue/render.md',
      url: '/tutorials/vue/render',
      description: 'You can use React-style JSX with Vue using render functions. Here\'s what you need to know.',
      tags: ['vue'],
      date: moment('2019-12-03')
    },
    {
      title: 'Disable ESLint for a Single Line',
      raw: './tutorials/eslint/disable-line.md',
      url: '/tutorials/eslint/disable-line',
      description: 'ESLint helps you avoid common code mistakes, but sometimes you need to make an exception for one line. Here\'s how you can disable an ESLint rule for one line.',
      tags: ['eslint'],
      date: moment('2019-11-28')
    },
    {
      title: 'Ignore Lines and Files In ESLint',
      raw: './tutorials/eslint/ignore.md',
      url: '/tutorials/eslint/ignore',
      description: 'ESLint helps you avoid common code mistakes, but sometimes you need to make an exception to an ESLint rule. Here\'s what you need to know.',
      tags: ['eslint'],
      date: moment('2019-11-27')
    },
    {
      title: 'Introduction to Mongoose Populate',
      raw: './tutorials/mongoose/populate.md',
      url: '/tutorials/mongoose/populate',
      description: 'Mongoose populate lets you store references to other collections and load referenced documents with one line. Here\'s what you need to know.',
      tags: ['mongoose'],
      date: moment('2019-11-12')
    },
    {
      title: 'Post Form Data With Axios',
      raw: './tutorials/axios/form-data.md',
      url: '/tutorials/axios/form-data',
      description: 'Here\'s how you can upload files from JavaScript using Axios and JavaScript\'s built-in FormData class.',
      tags: ['axios'],
      date: moment('2019-11-05')
    },
    {
      title: 'Truthy Values in JavaScript',
      raw: './tutorials/fundamentals/truthy.md',
      url: '/tutorials/fundamentals/truthy',
      description: 'JavaScript lets you put any type of value in an `if` statement, not just a boolean. JavaScript\'s native type coercion then takes over - a "truthy" value is a value that JavaScript\'s native type coercion converts to true.',
      tags: ['fundamentals'],
      date: moment('2019-11-04')
    },
    {
      title: 'Logical Operators in JavaScript',
      raw: './tutorials/fundamentals/logical-operators.md',
      url: '/tutorials/fundamentals/logical-operators',
      description: 'JavaScript has 3 logical operators: `&&`, `||`, and `!`. These 3 operators are usually used to structure `if` statements, but they also have some unique quirks that you can take advantage of. Here\'s what you need to know.',
      tags: ['fundamentals'],
      date: moment('2019-10-30')
    },
    {
      title: 'What is "Falsy" in JavaScript?',
      raw: './tutorials/fundamentals/falsy.md',
      url: '/tutorials/fundamentals/falsy',
      description: 'JavaScript type coercion is full of surprises, but if you understand the basics it can save you a lot of wasteful type checks. Here is what you need to know about falsy values.',
      tags: ['fundamentals'],
      date: moment('2019-10-28')
    },
    {
      title: 'Query Parameters in Express',
      raw: './tutorials/express/query-parameters.md',
      url: '/tutorials/express/query-parameters',
      description: 'Express automatically parses the URL query string and stores the parsed parameters in `req.query`. Here\'s what you need to know.',
      tags: ['express'],
      date: moment('2019-10-25')
    },
    {
      title: 'Route Parameters in Express',
      raw: './tutorials/express/route-parameters.md',
      url: '/tutorials/express/route-parameters',
      description: 'Express route parameters allow your users to pass parameters in the URL. Here\'s what you need to know.',
      tags: ['express'],
      date: moment('2019-10-23')
    },
    {
      title: 'Getting the Request Body in Express',
      raw: './tutorials/express/body.md',
      url: '/tutorials/express/body',
      description: 'Express doesn\'t set the request body for you by default, you need to attach middleware. Here\'s how you set up Express to parse the request body for you.',
      tags: ['express'],
      date: moment('2019-10-22')
    },
    {
      title: 'Introduction to Express\' Router',
      raw: './tutorials/express/router.md',
      url: '/tutorials/express/router',
      description: 'Express\' Router class lets you define request handlers for specific URIs and HTTP methods. Here\'s what you need to know.',
      tags: ['express'],
      date: moment('2019-10-17')
    },
    {
      title: 'Array `filter()` in JavaScript',
      raw: './tutorials/fundamentals/filter.md',
      url: '/tutorials/fundamentals/filter',
      description: 'The `filter()` function in JavaScript lets you filter out array elements that don\'t match certain criteria. Here\'s what you need to know.',
      tags: ['fundamentals'],
      date: moment('2019-10-15')
    },
    {
      title: 'Make a JavaScript Function Sleep',
      raw: './tutorials/fundamentals/sleep.md',
      url: '/tutorials/fundamentals/sleep',
      description: 'JavaScript doesn\'t have a built-in `sleep()` function, but that doesn\'t mean you can\'t pause a function in JavaScript.',
      tags: ['fundamentals'],
      date: moment('2019-10-14')
    },
    {
      title: 'Using Axios with Vue',
      raw: './tutorials/vue/axios.md',
      url: '/tutorials/vue/axios',
      description: 'The Vue cookbook recommends using Axios for HTTP requests with Vue. Here\'s an alternative tutorial on how to use Axios with Vue.',
      tags: ['vue', 'axios'],
      date: moment('2019-10-10')
    },
    {
      title: 'A Brief Overview of Cross-Origin Resource Sharing (CORS)',
      raw: './tutorials/fundamentals/cors.md',
      url: '/tutorials/fundamentals/cors',
      description: 'Cross-Origin Resource Sharing, or CORS for short, is a protocol for a browser to determine whether it is safe to make a request to a different domain. Here\'s what you need to know.',
      tags: ['fundamentals'],
      date: moment('2019-10-09')
    },
    {
      title: 'What is a Plain Old JavaScript Object (POJO)?',
      raw: './tutorials/fundamentals/pojo.md',
      url: '/tutorials/fundamentals/pojo',
      description: 'Plain old JavaScript objects are the most common way to store user-entered data in JavaScript. But how do you actually define a POJO?',
      tags: ['fundamentals'],
      date: moment('2019-10-08')
    },
    {
      title: 'Cloning an Object with Lodash',
      raw: './tutorials/lodash/clone.md',
      url: '/tutorials/lodash/clone',
      description: 'Lodash\'s `clone()` function shallow clones a given object. Here\'s how it differs from using `Object.assign()`.',
      tags: ['lodash'],
      date: moment('2019-09-20')
    },
    {
      title: 'The `create()` Function in Axios',
      raw: './tutorials/axios/create.md',
      url: '/tutorials/axios/create',
      description: 'Axios\' `create()` function lets you create a "template" HTTP request, with defaults for future requests.',
      tags: ['axios'],
      date: moment('2019-09-18')
    },
    {
      title: 'POST Requests with Axios',
      raw: './tutorials/axios/post.md',
      url: '/tutorials/axios/post',
      description: 'Sending an HTTP POST request with Axios is easy. Here\'s what you need to know.',
      tags: ['axios'],
      date: moment('2019-09-17')
    },
    {
      title: 'Express Response JSON',
      raw: './tutorials/express/json.md',
      url: '/tutorials/express/json',
      description: 'Express responses have a `res.json()` function that serializes a JavaScript object to JSON and puts it in the response body. Here\'s what you need to know.',
      tags: ['express'],
      date: moment('2019-09-13')
    },
    {
      title: 'CORS with Express',
      raw: './tutorials/express/cors.md',
      url: '/tutorials/express/cors',
      description: 'CORS (Cross-Origin Resource Sharing) headers allow browsers to make HTTP requests to different domains. Here\'s how you set CORS headers with Express and Node.js',
      tags: ['express'],
      date: moment('2019-09-12')
    },
    {
      title: 'The Promise then() Function in JavaScript',
      raw: './tutorials/fundamentals/then.md',
      url: '/tutorials/fundamentals/then',
      description: 'The `then()` function is the primary way you interact with promises in JavaScript, including promise chaining.',
      tags: ['fundamentals'],
      date: moment('2019-09-11')
    },
    {
      title: 'Promises in JavaScript',
      raw: './tutorials/fundamentals/promise.md',
      url: '/tutorials/fundamentals/promise',
      description: 'A promise is an object that represents an asynchronous operation. Promises are JavaScript\'s fundamental concurrency primitive - here\'s what you need to know.',
      tags: ['fundamentals'],
      date: moment('2019-09-10')
    },
    {
      title: 'ObjectIds in Mongoose',
      raw: './tutorials/mongoose/objectid.md',
      url: '/tutorials/mongoose/objectid',
      description: 'In MongoDB, every document\'s `_id` property is an ObjectId by default. Here\'s what you need to know about ObjectIds in Mongoose.',
      tags: ['mongoose'],
      date: moment('2019-09-03')
    },
    {
      title: 'Express Middleware',
      raw: './tutorials/express/middleware.md',
      url: '/tutorials/express/middleware',
      description: 'Middleware is the fundamental building block of Express apps - even routes are middleware under the hood. Here\'s what you need to know about middleware.',
      tags: ['express'],
      date: moment('2019-08-29')
    },
    {
      title: 'The instanceof Operator in JavaScript',
      raw: './tutorials/fundamentals/instanceof.md',
      url: '/tutorials/fundamentals/instanceof',
      description: 'The `instanceof` operator tells you whether a given object is an instance of a class.',
      tags: ['fundamentals'],
      date: moment('2019-08-28')
    },
    {
      title: 'Classes in JavaScript',
      raw: './tutorials/fundamentals/class.md',
      url: '/tutorials/fundamentals/class',
      description: 'As of ES6 / 2015, JavaScript has a built-in `class` keyword for object-oriented programming. Here\'s how it works.',
      tags: ['fundamentals'],
      date: moment('2019-08-27')
    },
    {
      title: 'JSON.stringify() in JavaScript',
      raw: './tutorials/fundamentals/stringify.md',
      url: '/tutorials/fundamentals/stringify',
      description: 'The `JSON.stringify()` function is the canonical way to convert a JavaScript object to a JSON string. This tutorial explains `JSON.stringify()` from a practical perspective with examples.',
      tags: ['fundamentals'],
      date: moment('2019-08-16')
    },
    {
      title: 'Object.seal() in JavaScript',
      raw: './tutorials/fundamentals/seal.md',
      url: '/tutorials/fundamentals/seal',
      description: 'The `seal()` function prevents adding or removing properties from an object, while still letting you modify existing properties. Here\'s what you need to know.',
      tags: ['fundamentals'],
      date: moment('2019-08-15')
    },
    {
      title: 'Throttling Functions With Lodash\'s debounce() Function',
      raw: './tutorials/lodash/debounce.md',
      url: '/tutorials/lodash/debounce',
      description: 'Lodash\'s `debounce()` function lets you ensure a function is only executed once every X seconds.',
      tags: ['lodash'],
      date: moment('2019-08-13')
    },
    {
      title: 'Using Lodash\'s find() Function',
      raw: './tutorials/lodash/find.md',
      url: '/tutorials/lodash/find',
      description: 'Lodash\'s `find()` function lets you find the first element in an array that matches a given criteria. Here\'s how it works.',
      tags: ['lodash'],
      date: moment('2019-08-12')
    },
    {
      title: 'Using v-bind in Vue',
      raw: './tutorials/vue/bind.md',
      url: '/tutorials/vue/bind',
      description: 'In Vue, `v-bind` provides one-way data binding and lets you pass props down the component tree. Here\'s how it works.',
      tags: ['vue'],
      date: moment('2019-08-09')
    },
    {
      title: 'The $emit Function in Vue',
      raw: './tutorials/vue/emit.md',
      url: '/tutorials/vue/emit',
      description: 'In Vue, the $emit function lets you pass events up the component tree. Here\'s how it works.',
      tags: ['vue'],
      date: moment('2019-08-08')
    },
    {
      title: 'Intro to Object Prototypes in JavaScript',
      raw: './tutorials/fundamentals/prototype.md',
      url: '/tutorials/fundamentals/prototype',
      description: 'JavaScript uses prototype-based inheritance, even when you use the ES6 class `extends` keyword. Here\'s what you need to know about prototypes.',
      tags: ['fundamentals'],
      date: moment('2019-08-07')
    },
    {
      title: 'Deep Copy vs Shallow Copy in JavaScript',
      raw: './tutorials/fundamentals/shallow-copy.md',
      url: '/tutorials/fundamentals/shallow-copy',
      description: 'In JavaScript, you often hear the terms "deep clone" and "shallow clone", also known as deep/shallow copy. This tutorial describes what these terms mean with examples.',
      tags: ['fundamentals'],
      date: moment('2019-08-06')
    },
    {
      title: 'Introduction to Mongoose Schemas',
      raw: './tutorials/mongoose/schema.md',
      url: '/tutorials/mongoose/schema',
      description: 'In Mongoose, schemas are a configuration object for models. They tell Mongoose what paths to cast/validate, what options to set, and what virtuals to create.',
      tags: ['mongoose'],
      date: moment('2019-08-02')
    },
    {
      title: 'Connecting to MongoDB with Mongoose',
      raw: './tutorials/mongoose/connect.md',
      url: '/tutorials/mongoose/connect',
      description: 'The `mongoose.connect()` function is the most common way to connect to MongoDB with Mongoose. This tutorial describes how to use `mongoose.connect()` and how to troubleshoot common issues.',
      tags: ['mongoose'],
      date: moment('2019-08-01')
    },
    {
      title: 'Object.assign() in JavaScript',
      raw: './tutorials/fundamentals/assign.md',
      url: '/tutorials/fundamentals/assign',
      description: 'The `Object.assign()` function lets you assign properties from one object to another. You can use it to shallow copy objects or assign multiple properties at once.',
      tags: ['fundamentals'],
      date: moment('2019-07-30')
    },
    {
      title: '3 Ways to Concatenate Strings in JavaScript',
      raw: './tutorials/fundamentals/string-concat.md',
      url: '/tutorials/fundamentals/string-concat',
      description: 'You can concatenate strings in JavaScript using the `+` operator, the `Array#join()` function, or the `String#concat()` function. Here\'s what you need to know.',
      tags: ['fundamentals'],
      date: moment('2019-07-29')
    },
    {
      title: 'Safe Navigation With Lodash\'s get() Function',
      raw: './tutorials/lodash/get.md',
      url: '/tutorials/lodash/get',
      description: 'Lodash has a `get()` function that helps with safe navigation (AKA the Elvis Operator, null coalescing). In other words, get() helps you avoid "Cannot read property \'prop\' of undefined" errors. Here\'s what you need to know.',
      tags: ['lodash'],
      date: moment('2019-07-26')
    },
    {
      title: 'Sorting Arrays With Lodash\'s sortBy() Function',
      raw: './tutorials/lodash/sortby.md',
      url: '/tutorials/lodash/sortby',
      description: 'Lodash has a `sortBy()` function that provides some neat syntactic sugar on top of `Array#sort()`. This tutorial will teach you what you need to know about `_.sortBy()`.',
      tags: ['lodash'],
      date: moment('2019-07-25')
    },
    {
      title: 'Capitalize the First Letter of a String in JavaScript',
      raw: './tutorials/fundamentals/capitalize.md',
      url: '/tutorials/fundamentals/capitalize',
      description: 'How to convert the string "dog" to "Dog" in JavaScript.',
      tags: ['fundamentals'],
      date: moment('2019-07-24')
    },
    {
      title: 'What Does void 0 Do in JavaScript?',
      raw: './tutorials/fundamentals/void.md',
      url: '/tutorials/fundamentals/void',
      description: 'The void operator in JavaScript is a common source of confusion because it is rarely taught, but has a couple of convenient uses. This tutorial explains the most common use cases for the void operator.',
      tags: ['fundamentals'],
      date: moment('2019-07-23')
    },
    {
      title: 'What is a JavaScript Expression?',
      raw: './tutorials/fundamentals/expressions.md',
      url: '/tutorials/fundamentals/expressions',
      description: 'Many frameworks, like Vue, allow you to embed JavaScript expressions in HTML. But what is an expression? Can you put `if` statements in an expression?',
      tags: ['fundamentals'],
      date: moment('2019-07-22')
    },
    {
      title: 'Error Handling Middleware in Express',
      raw: './tutorials/express/error-handling.md',
      url: '/tutorials/express/error-handling',
      description: 'Error handling middleware is the canonical way to handle errors in Express. This tutorial shows you how to use error handling middleware for several common use cases.',
      tags: ['express'],
      date: moment('2019-07-18')
    },
    {
      title: 'The res Object in Express',
      raw: './tutorials/express/res.md',
      url: '/tutorials/express/res',
      description: 'The `res` parameter in Express is used to craft an HTTP response. This tutorial teaches you how to use the `res` object by example.',
      tags: ['express'],
      date: moment('2019-07-17')
    },
    {
      title: 'Request Parameters in Express',
      raw: './tutorials/express/req.md',
      url: '/tutorials/express/req',
      description: 'An overview of the `req` parameter in Express.',
      tags: ['express'],
      date: moment('2019-07-16')
    },
    {
      title: 'Computed Properties in Vue',
      raw: './tutorials/vue/computed.md',
      url: '/tutorials/vue/computed',
      description: 'Are your Vue templates hard to read because you have extremely long template expressions in `{{}}`? This tutorial will show you how to fix this problem using computed properties.',
      tags: ['vue'],
      date: moment('2019-07-15')
    },
    {
      title: 'Find By ID in Mongoose',
      raw: './tutorials/mongoose/find-by-id.md',
      url: '/tutorials/mongoose/find-by-id',
      description: 'A tutorial about how to use the `findById()` function in Mongoose.',
      tags: ['mongoose'],
      date: moment('2019-07-11')
    },
    {
      title: 'Learn Mongoose find() by Example',
      raw: './tutorials/mongoose/find.md',
      url: '/tutorials/mongoose/find',
      description: 'The Mongoose `Model.find()` function finds all documents in a collection that match a query. In this tutorial, you will learn how to structure common queries in Mongoose.',
      tags: ['mongoose'],
      date: moment('2019-07-10')
    },
    {
      title: 'JavaScript Array Push Tutorial',
      raw: './tutorials/fundamentals/push.md',
      url: '/tutorials/fundamentals/push',
      description: 'The push() method adds an element to the end of a JavaScript array. This tutorial will show you how push() works.',
      tags: ['fundamentals'],
      date: moment('2019-07-09')
    },
    {
      title: 'Check if a JS Array Contains a Specific Value',
      raw: './tutorials/fundamentals/includes.md',
      url: '/tutorials/fundamentals/includes',
      description: 'There are two common ways to check if a JavaScript array contains a value: `includes()` and `indexOf()`. This tutorial shows you how to use both, and why you would use one versus the other.',
      tags: ['fundamentals'],
      date: moment('2019-07-08')
    },
    {
      title: 'Vue Event Handling with v-on',
      raw: './tutorials/vue/v-on.md',
      url: '/tutorials/vue/v-on',
      description: 'Learn how to propagate events from a child component to a parent component using v-on.',
      tags: ['vue'],
      date: moment('2019-07-05')
    },
    {
      title: 'Conditional Rendering in Vue with v-if',
      raw: './tutorials/vue/v-if.md',
      url: '/tutorials/vue/v-if',
      description: 'Learn how to use the v-if directive for conditional rendering in Vue.',
      tags: ['vue'],
      date: moment('2019-07-04')
    },
    {
      title: 'Two-Way Data Binding in Vue With v-model',
      raw: './tutorials/vue/v-model.md',
      url: '/tutorials/vue/v-model',
      description: 'Two way data binding lets you build sophisticated forms without outside libraries. In this tutorial, you will learn about Vue\'s mechanism for two-way data binding: the v-model property.',
      tags: ['vue'],
      date: moment('2019-07-03')
    },
    {
      title: 'Arrow Functions in JavaScript',
      raw: './tutorials/fundamentals/arrow.md',
      url: '/tutorials/fundamentals/arrow',
      description: 'Arrow functions let you write functions more concisely, but come with several syntactic quirks. This tutorial describes what you need to know to use arrow functions effectively.',
      tags: ['fundamentals'],
      date: moment('2019-07-02')
    },
    {
      title: 'Make JavaScript Objects Immutable with Object.freeze()',
      raw: './tutorials/fundamentals/freeze.md',
      url: '/tutorials/fundamentals/freeze',
      description: 'The `const` keyword in JavaScript does not prevent you from changing an object\'s properties. The Object.freeze() function does that, but comes with caveats.',
      tags: ['fundamentals'],
      date: moment('2019-07-01')
    },
    {
      title: 'What Does "use strict" Do in JavaScript?',
      raw: './tutorials/fundamentals/strict.md',
      url: '/tutorials/fundamentals/strict',
      description: '"use strict" enables strict mode in JavaScript. This tutorial explains what strict mode does for you.',
      tags: ['fundamentals'],
      date: moment('2019-06-28')
    },
    {
      title: 'Understanding Callbacks in JavaScript',
      raw: './tutorials/fundamentals/callbacks.md',
      url: '/tutorials/fundamentals/callbacks',
      description: 'The term "callback" can mean one of a few different concepts in JavaScript. This tutorial will help you wrap your mind around callbacks.',
      tags: ['fundamentals'],
      date: moment('2019-06-27')
    },
    {
      title: 'An Overview of the Object.keys() Function in JavaScript',
      raw: './tutorials/fundamentals/keys.md',
      url: '/tutorials/fundamentals/keys',
      description: 'An introduction to how to use Object.keys() in JavaScript',
      tags: ['fundamentals'],
      date: moment('2019-06-26')
    },
    {
      title: 'An Introduction to Queries in Mongoose',
      raw: './tutorials/mongoose/query.md',
      url: '/tutorials/mongoose/query',
      description: 'An overview of the Mongoose Query class and how to use it to query for documents',
      tags: ['mongoose'],
      date: moment('2019-06-25')
    },
    {
      title: 'How to Find All Documents in Mongoose',
      raw: './tutorials/mongoose/find-all.md',
      url: '/tutorials/mongoose/find-all',
      description: 'A tutorial about how to get all documents in a Mongoose model',
      tags: ['mongoose'],
      date: moment('2019-06-24')
    },
    {
      title: 'Understanding Array.splice() in JavaScript',
      raw: './tutorials/fundamentals/array-splice.md',
      url: '/tutorials/fundamentals/array-splice',
      description: 'A tutorial on how to use `splice()` to add and remove elements from JavaScript arrays',
      tags: ['fundamentals'],
      date: moment('2019-06-21')
    },
    {
      title: 'Substring vs Substr vs Slice in JavaScript',
      raw: './tutorials/fundamentals/substring.md',
      url: '/tutorials/fundamentals/substring',
      description: 'There are 3 ways to get a substring of a string in JavaScript. In this tutorial, you will learn the difference between `String#substring()`, `String#substr()`, and `String#slice()`',
      tags: ['fundamentals'],
      date: moment('2019-06-20')
    },
    {
      title: 'Vue Props Tutorial',
      raw: './tutorials/vue/props.md',
      url: '/tutorials/vue/props',
      description: 'Learn how to use Vue watchers to execute code when a value changes.',
      tags: ['vue'],
      date: moment('2019-06-19')
    },
    {
      title: 'An Introduction to Vue Watchers',
      raw: './tutorials/vue/watch.md',
      url: '/tutorials/vue/watch',
      description: 'Learn how to use Vue watchers to execute code when a value changes.',
      tags: ['vue'],
      date: moment('2019-06-18')
    },
    {
      title: 'An Introduction to Webpack Dev Server',
      raw: './tutorials/webpack/dev-server.md',
      url: '/tutorials/webpack/dev-server',
      description: 'Learn how to use webpack-dev-server to run your browser-side JavaScript',
      tags: ['webpack'],
      date: moment('2019-06-17')
    },
    {
      title: 'How to Test Async Code with Mocha',
      raw: './tutorials/mocha/async.md',
      url: '/tutorials/mocha/async',
      description: 'An introduction to using Chai with Mocha using expect and should',
      tags: ['mocha', 'node'],
      date: moment('2019-06-14')
    },
    {
      title: 'Using the Chai Assertion Library with Mocha',
      raw: './tutorials/mocha/chai.md',
      url: '/tutorials/mocha/chai',
      description: 'An introduction to using Chai with Mocha using expect and should',
      tags: ['mocha', 'node'],
      date: moment('2019-06-13')
    },
    {
      title: 'An Introduction to the Mocha Test Runner',
      raw: './tutorials/mocha/intro.md',
      url: '/tutorials/mocha/intro',
      description: 'A brief overview of writing tests with Mocha',
      tags: ['mocha', 'node'],
      date: moment('2019-06-12')
    },
    {
      title: 'Uploading Files to Amazon S3 in Node.js',
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
      tags: ['fundamentals'],
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

  const byTag = new Map();
  for (const tutorial of tutorials) {
    for (const tag of tutorial.tags) {
      if (!byTag.has(tag)) {
        byTag.set(tag, []);
      }
      byTag.get(tag).push(tutorial);
    }
  }

  for (const [tag, tutorials] of byTag.entries()) {
    fs.writeFileSync(`./${tag}.html`, layout({
      title: `${capitalize(tag)} Tutorials`,
      content: list({ posts: tutorials })
    }));
  }

  fs.writeFileSync('./all.html', layout({
    title: 'All Tutorials',
    content: list({ posts: tutorials })
  }));
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}