'use strict';

const moment = require('moment');

const axiosPath = require('./axiosPath');

const tutorials = [
  {
    title: 'How to Remove the Last Character from a String in JavaScript',
    raw: './tutorials/fundamentals/remove-last-char.md',
    url: '/tutorials/fundamentals/remove-last-char',
    description: 'Placeholder Description',
    tags: ['fundamentals'],
    date: moment('2021-11-02')
  },
  {
    title: 'Defining Plugins with Webpack',
    raw: './tutorials/webpack/define-plugin.md',
    url: '/tutorials/webpack/define-plugin',
    description: 'All about Webpack\'s `definePlugin()` function: how it works, and when to use it.',
    tags: ['webpack'],
    date: moment('2021-10-29')
  },
  {
    title: 'How to Use Vue Router\'s router-view Component',
    raw: './tutorials/vue/router-view.md',
    url: '/tutorials/vue/router-view',
    description: 'Here\'s what you need to know about router-view in Vue Router.',
    tags: ['vue'],
    date: moment('2021-10-20')
  },
  {
    title: 'How to Use JavaScript\'s `Promise.allSettled()` Function',
    raw: './tutorials/fundamentals/promise-allsettled.md',
    url: '/tutorials/fundamentals/promise-allsettled',
    description: 'JavaScript\'s `Promise.allSettled()` function is like `Promise.all()`, but with a few key differences. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-10-19')
  },
  {
    title: 'How to Sort an Array by Date in JavaScript',
    raw: './tutorials/fundamentals/sort-by-date.md',
    url: '/tutorials/fundamentals/sort-by-date',
    description: 'Need to sort an array of JavaScript dates, or an array of JavaScript objects by a date property? Here\'s how 👉',
    tags: ['fundamentals'],
    date: moment('2021-10-14')
  },
  {
    title: 'Make Mongoose\'s findOneAndUpdate() Return the Updated Document',
    raw: './tutorials/mongoose/findoneandupdate-return-updated.md',
    url: '/tutorials/mongoose/findoneandupdate-return-updated',
    description: 'By default, Mongoose\'s `findOneAndUpdate()` function returns the document as it was before the update was applied. Here\'s how you can change that 👉',
    tags: ['mongoose'],
    date: moment('2021-10-13')
  },
  {
    title: 'How to Use Mongoose\'s findOneAndUpdate Function',
    raw: './tutorials/mongoose/findoneandupdate.md',
    url: '/tutorials/mongoose/findoneandupdate',
    description: 'Here\'s what you need to know about `findOneAndUpdate()` in Mongoose.',
    tags: ['mongoose'],
    date: moment('2021-10-12')
  },
  {
    title: 'Using Query String Parameters in Mongoose',
    raw: './tutorials/mongoose/query-string.md',
    url: '/tutorials/mongoose/query-string',
    description: 'Need to run a query in Mongoose using query string parameters? Here\'s what you need to know 👉',
    tags: ['mongoose'],
    date: moment('2021-10-08')
  },
  {
    title: 'How to Trim Characters from a String in JavaScript',
    raw: './tutorials/fundamentals/trim.md',
    url: '/tutorials/fundamentals/trim',
    description: 'Need to trim leading or trailing characters from a string in JavaScript? Here\'s how 👉',
    tags: ['fundamentals'],
    date: moment('2021-10-06')
  },
  {
    title: 'How to Compare Dates Without Time in JavaScript',
    raw: './tutorials/fundamentals/compare-without-time.md',
    url: '/tutorials/fundamentals/compare-without-time',
    description: 'Here\'s how you can compare whether two JavaScript dates are on the same day, ignoring time.',
    tags: ['fundamentals'],
    date: moment('2021-09-29')
  },
  {
    title: 'Using `map()` on JavaScript Enums',
    raw: './tutorials/fundamentals/enum-map.md',
    url: '/tutorials/fundamentals/enum-map',
    description: 'JavaScript doesn\'t support enum as a built-in type, but here\'s how you can use `map()` with userland enum objects.',
    tags: ['fundamentals'],
    date: moment('2021-09-28')
  },
  {
    title: 'How to Print An Enum\'s Properties in JavaScript',
    raw: './tutorials/fundamentals/enumtostring.md',
    url: '/tutorials/fundamentals/enum-to-string',
    description: 'JavaScript doesn\'t support enums, but here\'s how you can print out an enum object\'s properties.',
    tags: ['fundamentals'],
    date: moment('2021-09-22')
  },
  {
    title: 'How to Reverse a String in JavaScript',
    raw: './tutorials/fundamentals/reversestring.md',
    url: '/tutorials/fundamentals/reverse-string',
    description: 'Need to reverse a string in JavaScript? Here\'s 3 different ways to reverse strings.',
    tags: ['fundamentals'],
    date: moment('2021-09-21')
  },
  {
    title: 'How to Uppercase Strings in JavaScript',
    raw: './tutorials/fundamentals/uppercase.md',
    url: '/tutorials/fundamentals/uppercase',
    description: 'Here\'s how you can convert a string to uppercase in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-09-17')
  },
  {
    title: 'Convert HTML to Pug',
    raw: './tutorials/node/html2pug.md',
    url: '/tutorials/node/html-to-pug',
    description: 'Convert HTML to Pug in your browser, with syntax highlighting!',
    tags: ['node'],
    date: moment('2021-09-15')
  },
  {
    title: 'The Vue Button `click` Event',
    raw: './tutorials/vue/btnclick.md',
    url: '/tutorials/vue/button-click',
    description: 'Here\'s what you need to know about click events on buttons in Vue.',
    tags: ['vue'],
    date: moment('2021-09-09')
  },
  {
    title: 'How to Handle Window Resize Events in Vue',
    raw: './tutorials/vue/resize.md',
    url: '/tutorials/vue/resize-event',
    description: 'Here\'s how you can handle the `resize` event in Vue.',
    tags: ['vue'],
    date: moment('2021-09-01')
  },
  {
    title: 'How to Use JavaScript\'s Object.values() Function',
    raw: './tutorials/fundamentals/values.md',
    url: '/tutorials/fundamentals/object-values',
    description: 'Here\'s what you need to know about `Object.values()` in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-08-31')
  },
  {
    title: 'How to Wait 1 Second in JavaScript',
    raw: './tutorials/fundamentals/wait-1-second-then.md',
    url: '/tutorials/fundamentals/wait-1-second-then',
    description: 'It is easy to make your function wait for 1 second in JavaScript using promises and/or `await`. Here\'s how.',
    tags: ['fundamentals'],
    date: moment('2021-08-27')
  },
  {
    title: 'JavaScript `substring()` vs `slice()`',
    raw: './tutorials/fundamentals/subvsslice.md',
    url: '/tutorials/fundamentals/substring-vs-slice',
    description: 'Here\'s the difference between JavaScript\'s `substring()` and `slice()` functions, and why you would use one or the other.',
    tags: ['fundamentals'],
    date: moment('2021-08-24')
  },
  {
    title: 'How to Filter an Object by Key in JavaScript',
    raw: './tutorials/fundamentals/filter-key.md',
    url: '/tutorials/fundamentals/filter-key',
    description: 'Here\'s 2 ways you can create a new object using a subset of the original object\'s keys.',
    tags: ['fundamentals'],
    date: moment('2021-08-19')
  },
  {
    title: 'How to Filter an Object by Key and Value in JavaScript',
    raw: './tutorials/fundamentals/filter-kv.md',
    url: '/tutorials/fundamentals/filter-key-value',
    description: 'Here\'s how you can filter an object by key and value in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-08-13')
  },
  {
    title: 'Convert Pug to HTML',
    raw: './tutorials/node/pug2html.md',
    url: '/tutorials/node/pug-to-html',
    description: 'Convert Pug to HTML in your browser, with syntax highlighting!',
    tags: ['node'],
    date: moment('2021-08-12')
  },
  {
    title: 'How to Create a Custom Scroll Event in Vue',
    raw: './tutorials/vue/scroll.md',
    url: '/tutorials/vue/scroll',
    description: 'Here\'s how you can write a custom scroll directive in Vue.',
    tags: ['vue'],
    date: moment('2021-07-30')
  },
  {
    title: 'How to Send Headers With an Axios POST Request',
    raw: './tutorials/axios/post-headers.md',
    url: '/tutorials/axios/post-headers',
    description: 'Here\'s how you can set headers on an HTTP POST request with Axios.',
    tags: ['axios'],
    date: moment('2021-07-28')
  },
  {
    title: 'How to Use Vue Router\'s Push Function',
    raw: './tutorials/vue/router-push.md',
    url: '/tutorials/vue/router-push',
    description: 'The `push()` function is how you do programmatic navigation with vue-router. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2021-07-23')
  },
  {
    title: 'The void "Function" in JavaScript',
    raw: './tutorials/fundamentals/void-function.md',
    url: '/tutorials/fundamentals/void-function',
    description: 'void is an operator, not a function. But you can still use void with function-like syntax. Here\'s how.',
    tags: ['fundamentals'],
    date: moment('2021-07-22')
  },
  {
    title: 'How to Return a Value From a forEach Loop',
    raw: './tutorials/fundamentals/return-forEach.md',
    url: '/tutorials/fundamentals/foreach-return',
    description: 'The `return` keyword behaves differently with `forEach()` than with conventional loops. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-07-16')
  },
  {
    title: 'How to Use forEach() with Key Value Pairs',
    raw: './tutorials/fundamentals/foreach-keyvalue.md',
    url: '/tutorials/fundamentals/foreach-key-value',
    description: 'Here\'s how you can iterate through an array or object using `forEach()` and get both the key and the value.',
    tags: ['fundamentals'],
    date: moment('2021-07-14')
  },
  {
    title: 'How to Concatenate a Regular Expression',
    raw: './tutorials/fundamentals/concat-regexp.md',
    url: '/tutorials/fundamentals/concat-regexp',
    description: 'Here\'s how you can concatenate two regular expressions in JavaScript',
    tags: ['fundamentals'],
    date: moment('2021-07-08')
  },
  {
    title: 'HTTP DELETE Requests with Body in Axios',
    raw: './tutorials/axios/delete-with-body.md',
    url: '/tutorials/axios/delete-with-body',
    description: 'Here\'s how you can send an HTTP DELETE request with a request body in Axios.',
    tags: ['axios'],
    date: moment('2021-07-07')
  },
  {
    title: 'How to Concatenate a Number to a String in JavaScript',
    raw: './tutorials/fundamentals/concat-num-to-string.md',
    url: '/tutorials/fundamentals/concat-num-to-string',
    description: 'Here\'s how you can concatenate a number to a string in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-07-01')
  },
  {
    title: 'How to Left Trim a String in JavaScript',
    raw: './tutorials/fundamentals/left-trim.md',
    url: '/tutorials/fundamentals/left-trim',
    description: 'Here\'s how you can use `trimStart()` to remove leading whitespace from a JavaScript string, or `replace()` to remove any other leading characters.',
    tags: ['fundamentals'],
    date: moment('2021-06-29')
  },
  {
    title: 'How to Install Node.js on Ubuntu',
    raw: './tutorials/node/install-on-ubuntu.md',
    url: '/tutorials/node/install-on-ubuntu',
    description: 'Installing Node.js on Ubuntu with apt-get can be tricky if you want to install a specific version. Here\'s a better way.',
    tags: ['node'],
    date: moment('2021-06-24')
  },
  {
    title: 'How to Deep Copy an Array in JavaScript',
    raw: './tutorials/fundamentals/deep-copy-array.md',
    url: '/tutorials/fundamentals/deep-copy-array',
    description: 'Deep copying an array in JavaScript is tricky. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-06-23')
  },
  {
    title: 'How to Trim Leading Zeros from a String in JavaScript',
    raw: './tutorials/fundamentals/trim0.md',
    url: '/tutorials/fundamentals/trim-leading-zeros',
    description: 'Here\'s how you can remove leading zeros from a string in JavaScript',
    tags: ['fundamentals'],
    date: moment('2021-06-22')
  },
  {
    title: 'Add an Element to an Array in JavaScript',
    raw: './tutorials/fundamentals/add-to-array.md',
    url: '/tutorials/fundamentals/add-to-array',
    description: 'Here\'s how you can add an element to the beginning, middle, and end of an array, as well as how you can check for duplicates.',
    tags: ['fundamentals'],
    date: moment('2021-06-18')
  },
  {
    title: 'How to Use Vue with Axios to Make a PUT Request',
    raw: './tutorials/vue/axios-put.md',
    url: '/tutorials/vue/axios-put',
    description: 'Here\'s how you can make an HTTP PUT request from Vue using Axios.',
    tags: ['vue'],
    date: moment('2021-06-17')
  },
  {
    title: 'How to Use forEach in an Async/Await Function',
    raw: './tutorials/fundamentals/async-foreach.md',
    url: '/tutorials/fundamentals/async-foreach',
    description: 'You should not use async functions with `forEach()` in JavaScript. Here\'s why, and what you should use instead.',
    tags: ['fundamentals'],
    date: moment('2021-06-14')
  },
  {
    title: 'How to Concatenate Strings in an Array using JavaScript',
    raw: './tutorials/fundamentals/concat-string-array.md',
    url: '/tutorials/fundamentals/concat-string-array',
    description: 'Here\'s how you can concatenate an array of strings in JavaScript, including filtering out non-string values.',
    tags: ['fundamentals'],
    date: moment('2021-06-11')
  },
  {
    title: 'How to Use forEach() to Iterate Through a JavaScript Map',
    raw: './tutorials/fundamentals/map-foreach.md',
    url: '/tutorials/fundamentals/map-foreach',
    description: 'JavaScript maps have a `forEach()` function, as well as several helpers that let you iterate over a map\'s keys and values using `forEach()`. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-06-09')
  },
  {
    title: 'How to Drag and Drop File Upload with Vue',
    raw: './tutorials/vue/drag-and-drop.md',
    url: '/tutorials/vue/drag-and-drop',
    description: 'Here\'s how you can drag and drop file uploads with Vue.',
    tags: ['vue'],
    date: moment('2021-06-07')
  },
  {
    title: 'Using Firebase with Vue for File Uploads',
    raw: './tutorials/vue/firebase-file-upload.md',
    url: '/tutorials/fundamentals/firebase-file-upload',
    description: 'Here\'s how you can use Vue to upload files to Firebase.',
    tags: ['vue'],
    date: moment('2021-06-04')
  },
  {
    title: 'JavaScript Enumerability',
    raw: './tutorials/fundamentals/enumerable.md',
    url: '/tutorials/fundamentals/enumerable',
    description: 'JavaScript object properties have an `enumerable` property that controls whether that property shows up in `Object.keys()` and `for/in`. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-05-27')
  },
  {
    title: 'How to Determine if a Variable is a Date',
    raw: './tutorials/fundamentals/typeof-date.md',
    url: '/tutorials/fundamentals/typeof-date',
    description: 'Here\'s how you can determine if a variable is a date in JavaScript',
    tags: ['fundamentals'],
    date: moment('2021-05-26')
  },
  {
    title: 'How to Determine if a Variable is undefined',
    raw: './tutorials/fundamentals/typeof-undefined.md',
    url: '/tutorials/fundamentals/typeof-undefined',
    description: 'Here\'s how you can check if a variable is undefined in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-05-21')
  },
  {
    title: 'How to Determine if a Value is null',
    raw: './tutorials/fundamentals/typeof-null.md',
    url: '/tutorials/fundamentals/typeof-null',
    description: 'Here\'s how you can determine whether a given value is null in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-05-19')
  },
  {
    title: 'Using JavaScript\'s typeof Operator with Objects',
    raw: './tutorials/fundamentals/typeof-object.md',
    url: '/tutorials/fundamentals/typeof-object',
    description: 'Here\'s how you can check if a given JavaScript variable is an object.',
    tags: ['fundamentals'],
    date: moment('2021-05-17')
  },
  {
    title: 'How to Determine if a Variable is an Array',
    raw: './tutorials/fundamentals/typeof-array.md',
    url: '/tutorials/fundamentals/typeof-array',
    description: 'The `typeof` operator is not a good choice for checking if a variable is an array. Here\'s why.',
    tags: ['fundamentals'],
    date: moment('2021-05-14')
  },
  {
    title: 'Convert Decimal to Binary',
    raw: './tutorials/fundamentals/decimal-to-binary.md',
    url: '/tutorials/fundamentals/decimal-to-binary',
    description: 'JavaScript\'s typeof operator can be used with a function-like syntax. But it is technically not a function. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-05-07')
  },
  {
    title: 'How to Use typeof With Functions',
    raw: './tutorials/fundamentals/typeof-function.md',
    url: '/tutorials/fundamentals/typeof-function',
    description: 'JavaScript\'s typeof operator can be used with a function-like syntax. But it is technically not a function. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-05-06')
  },
  {
    title: 'How to use typeof with Numbers',
    raw: './tutorials/fundamentals/typeof-number.md',
    url: '/tutorials/fundamentals/typeof-number',
    description: 'JavaScript\'s typeof operator lets you check if a value is a number. Just be careful about `Number()` instances, BigInts, and NaN!',
    tags: ['fundamentals'],
    date: moment('2021-05-03')
  },
  {
    title: 'The Seven Standard Primitives in JavaScript',
    raw: './tutorials/fundamentals/primitives.md',
    url: '/tutorials/fundamentals/primitives',
    description: 'Here\'s what you need to know about primitive types in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-04-29')
  },
  {
    title: 'How to Convert an Array to a String in JavaScript',
    raw: './tutorials/fundamentals/array-to-string.md',
    url: '/tutorials/fundamentals/array-to-string',
    description: 'Here\'s two ways to convert an array to a string in JavaScript: using `toString()`, and using `join()`.',
    tags: ['fundamentals'],
    date: moment('2021-04-27')
  },
  {
    title: 'How to Use JSON with Axios',
    raw: './tutorials/axios/axios-json.md',
    url: '/tutorials/axios/json',
    description: 'Here\'s how you can use Axios to make GET requests for JSON data, as well as PUT and POST JSON data to a server.',
    tags: ['axios'],
    date: moment('2021-04-21')
  },
  {
    title: 'How to Use the User-Agent Header in Axios',
    raw: './tutorials/axios/user-agent.md',
    url: '/tutorials/axios/user-agent',
    description: 'Here\'s how you can set the User-Agent header when making an HTTP request with Axios.',
    tags: ['axios'],
    date: moment('2021-04-20')
  },
  {
    title: 'How to Use Named Parameters in JavaScript',
    raw: './tutorials/fundamentals/parameters.md',
    url: '/tutorials/fundamentals/parameters',
    description: 'JavaScript does not support named parameters, but you can get the same syntactic benefits using object destructuring. Here\'s how.',
    tags: ['fundamentals'],
    date: moment('2021-04-16')
  },
  {
    title: 'How to Use JavaScript\'s Spread Operator',
    raw: './tutorials/fundamentals/spread.md',
    url: '/tutorials/fundamentals/spread',
    description: 'Here\'s what you can do with the spread operator `...` in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2021-04-14')
  },
  {
    title: 'How to Read Files with Vue',
    raw: './tutorials/vue/file.md',
    url: '/tutorials/vue/file',
    description: 'Here\'s how you can display the contents of an `input type="file"` using Vue.',
    tags: ['vue'],
    date: moment('2021-04-13')
  },
  {
    title: 'How to Locally Scope the CSS in Your Vue Files',
    raw: './tutorials/vue/style-scoped.md',
    url: '/tutorials/vue/style-scoped',
    description: 'Here\'s how you can use `style scoped` in Vue to define CSS rules that apply to only one component.',
    tags: ['vue'],
    date: moment('2021-04-09')
  },
  {
    title: 'How to Use Webpack\'s url-loader',
    raw: './tutorials/webpack/url-loader.md',
    url: '/tutorials/webpack/url-loader',
    description: '`url-loader` lets you `import` arbitrary files, like images. Here\'s what you need to know.',
    tags: ['webpack'],
    date: moment('2021-04-05')
  },
  {
    title: 'How to Use Webpack\'s Module Aliasing',
    raw: './tutorials/webpack/alias.md',
    url: '/tutorials/webpack/alias',
    description: 'Here\'s how you can use Webpack aliases to make your `import` statements more readable.',
    tags: ['webpack'],
    date: moment('2021-04-02')
  },
  {
    title: 'Convert a String to an Array in JavaScript',
    raw: './tutorials/fundamentals/convert-string-to-array.md',
    url: '/tutorials/fundamentals/convert-string-to-array',
    description: 'Here\'s how you can convert a string to an array in JavaScript: either splitting by a separator or converting a string to an array of characters.',
    tags: ['fundamentals'],
    date: moment('2021-03-31')
  },
  {
    title: 'How to Use @change in Vue with select Tags',
    raw: './tutorials/vue/vue-select-onchange.md',
    url: '/tutorials/vue/select-onchange',
    description: 'Need to run a function when the user changes the value of a `select` tag in Vue? Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2021-03-25')
  },
  {
    title: 'How to Compare Objects in JavaScript',
    raw: './tutorials/fundamentals/compare-objects.md',
    url: '/tutorials/fundamentals/compare-objects',
    description: 'There are several ways to compare objects in JavaScript. Here\'s 3 different ways to compare objects in JavaScript and the tradeoffs between them.',
    tags: ['fundamentals'],
    date: moment('2021-03-23')
  },
  {
    title: 'Using Provide and Inject in Vue.js',
    raw: './tutorials/vue/vue-inject.md',
    url: '/tutorials/vue/inject',
    description: 'Here\'s how you can use Vue\'s `provide` and `inject` to avoid prop drilling.',
    tags:['vue'],
    date: moment('2021-03-22')
  },
  {
    title: 'How To Upload Files With Vue',
    raw: './tutorials/vue/vue-file-upload.md',
    url: '/tutorials/vue/file-upload',
    description: 'Here\'s how you can upload files using Vue and Axios.',
    tags: ['vue'],
    date: moment('2021-03-19')
  },
  {
    title: 'How to Use Boostrap With Vue to Make a Dropdown',
    raw: './tutorials/vue/vue-dropdown.md',
    url: '/tutorials/vue/dropdown',
    description: 'Here\'s how you can use Vue with Bootstrap dropdowns, no outside modules required.',
    tags: ['vue'],
    date: moment('2021-03-18')
  },
  {
    title: 'How to Use Vue With HTML Tables',
    raw: './tutorials/vue/vue-table.md',
    url: '/tutorials/vue/table',
    description: 'Here are some basic patterns for using Vue with the HTML `table` tag.',
    tags: ['vue'],
    date: moment('2021-03-10')
  },
  {
    title: 'How to Use the Select Tag with Vue',
    raw: './tutorials/vue/vue-select.md',
    url: '/tutorials/vue/select',
    description: 'Here\'s how you can use Vue with the `select` tag, including how to use two way data binding with `v-model`.',
    tags: ['vue'],
    date: moment('2021-03-09')
  },
  {
    title: 'Axios Multipart Form Data',
    raw: './tutorials/axios/axios-multi-form-data.md',
    url: '/tutorials/axios/axios-multi-form-data',
    description: 'Looking to send a POST request with FormData with Axios for a file upload? Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2021-03-04')
  },
  {
    title: 'How to use Axios\' create() Method with POST Requests',
    raw: './tutorials/axios/create-post.md',
    url: '/tutorials/axios/create-post',
    description: 'Here\'s how you can use Axios\' `create()` function to make an Axios instance that sends POST requests by default.',
    tags: ['axios'],
    date: moment('2021-03-01')
  },
  {
    title: 'How to Check if a JavaScript Variable is Undefined',
    raw: './tutorials/fundamentals/undefined-check.md',
    url: '/tutorials/fundamentals/undefined-check',
    description: 'There are a few nuances with checking whether a variable or object property is undefined in JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-02-25')
  },
  {
    title: 'The Difference Between let and var in JavaScript',
    raw: './tutorials/fundamentals/let-vs-var.md',
    url: '/tutorials/fundamentals/let-vs-var',
    description: 'There are two ways to declare a mutable variable in JavaScript: let and var. Here\'s how they\'re different, and why you should use let.',
    tags: ['fundamentals'],
    date: moment('2021-02-24')
  },
  {
    title: 'Handling POST Requests with Express',
    raw: './tutorials/express/post.md',
    url: '/tutorials/express/post',
    description: 'Here\'s how you can handle POST requests in Express, including handling JSON request bodies and file uploads.',
    tags: ['express'],
    date: moment('2021-02-23')
  },
  {
    title: 'How to Use D3.js in Your Vue Projects',
    raw: './tutorials/vue/vue-d3.md',
    url: '/tutorials/vue/vue-d3',
    description: 'Here\'s an example of how you can make a barchart in a Vue component with D3.js.',
    tags: ['vue'],
    date: moment('2021-02-19')
  },
  {
    title: 'How to Use Websockets With Your Vue Projects',
    raw: './tutorials/vue/vue-websocket.md',
    url: '/tutorials/vue/vue-websocket',
    description: 'Vue makes it easy to work with websockets. Here\'s an example of how you can use websockets in your Vue components.',
    tags: ['vue'],
    date: moment('2021-02-18')
  },
  {
    title: 'JavaScript String Interpolation',
    raw: './tutorials/fundamentals/string-interpolation.md',
    url: '/tutorials/fundamentals/string-interpolation',
    description: 'String interpolation means replacing placeholders in a string with computed values. Here\'s how you can do string interpolation in JavaScript using template literals.',
    tags: ['fundamentals'],
    date: moment('2021-02-17'),
    featured: true
  },
  {
    title: 'Best Books to Learn Vue in 2021',
    raw: './tutorials/vue/books.md',
    url: '/tutorials/vue/books',
    description: 'Looking to learn Vue in 2021? Or looking to level up your Vue skills? Here\'s a list of books that can help!',
    tags: ['vue'],
    date: moment('2021-02-12'),
    featured: true
  },
  {
    title: 'How to Use Chart.js with Vue',
    raw: './tutorials/vue/vue-chartjs.md',
    url: '/tutorials/vue/chartjs',
    description: 'Here\'s how you can use Chart.js and vue-chartjs to render charts in Vue.',
    tags: ['vue'],
    date: moment('2021-02-11')
  },
  {
    title: 'Vue Single-File Components',
    raw: './tutorials/vue/vue-sfc.md',
    url: '/tutorials/vue/vue-sfc',
    description: 'Vue single file components (.vue files) provide several advantages over writing vanilla JavaScript. Here\'s how you can get started with Vue single file components, including how to configure Webpack.',
    tags: ['vue'],
    date: moment('2021-02-10')
  },
  {
    title: 'How to Validate Unique Emails with Mongoose',
    raw: './tutorials/mongoose/mongoose-validate-unique-email.md',
    url: '/tutorials/mongoose/mongoose-validate-unique-email',
    description: 'Here\'s how you can validate emails, and ensure emails are unique, using Mongoose.',
    tags: ['mongoose'],
    date: moment('2021-02-04')
  },
  {
    title: 'Axios Response `data` Property',
    raw: './tutorials/axios/axios-data.md',
    url: '/tutorials/axios/data',
    description: 'Axios responses have a `data` property that contains the HTTP response body. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2021-02-03')
  },
  {
    title: 'Global Variables in JavaScript',
    raw: './tutorials/fundamentals/global-variable.md',
    url: '/tutorials/fundamentals/global-variable',
    description: 'Any JavaScript variable defined outside any function is a global variable, but that comes with caveats for Node.js and Webpack. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-02-02')
  },
  {
    title: 'Calling Axios as a Function',
    raw: './tutorials/axios/axios-call.md',
    url: '/tutorials/axios/call',
    description: 'In addition to `axios.get()` and `axios.post()`, Axios itself is a function that you can call. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2021-01-28')
  },
  {
    title: 'How to Use Mongoose find() with Async/Await',
    raw: './tutorials/mongoose/find-with-async.md',
    url: '/tutorials/mongoose/find-async',
    description: 'Mongoose\'s `find()` function works with async/await. Here\'s how you can use async/await with Mongoose queries.',
    tags: ['mongoose'],
    date: moment('2021-01-25')
  },
  {
    title: 'The `db` Property in Mongoose',
    raw: './tutorials/mongoose/db.md',
    url: '/tutorials/mongoose/db',
    description: 'Mongoose connections have a `db` property that lets you bypass Mongoose and talk to MongoDB directly. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2021-01-21')
  },
  {
    title: 'How to Use axios.all() to Make Concurrent HTTP Requests',
    raw: './tutorials/axios/axios-all.md',
    url: '/tutorials/axios/all',
    description: 'Here\'s how you can use `axios.all()` to make multiple HTTP requests in parallel.',
    tags: ['axios'],
    date: moment('2021-01-20')
  },
  {
    title: 'How to Check for `NaN` in JavaScript',
    raw: './tutorials/fundamentals/check-nans.md',
    url: '/tutorials/fundamentals/check-nan',
    description: 'Checking for `NaN` is tricky because `NaN === NaN` returns false in JavaScript. Here\'s how you can check whether a value is equal `NaN`.',
    tags: ['fundamentals'],
    date: moment('2021-01-19')
  },
  {
    title: 'How to Make PATCH Requests with Axios',
    raw: './tutorials/axios/axios-patch.md',
    url: '/tutorials/axios/axios-patch',
    description: 'Sending an HTTP PATCH request with Axios is easy. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2021-01-15')
  },
  {
    title: 'How to Use Axios in Node.js',
    raw: './tutorials/axios/axios-node.md',
    url: '/tutorials/axios/axios-node',
    description: 'Axios is an isomorphic HTTP client, which means it works the same way on both client and server. Here\'s how you can use Axios with Node.js.',
    tags: ['axios'],
    date: moment('2021-01-13')
  },
  {
    title: 'JavaScript Enums',
    raw: './tutorials/fundamentals/enum.md',
    url: '/tutorials/fundamentals/enum',
    description: 'JavaScript doesn\'t have an official enum type, but there are several design patterns that let you define enums using vanilla JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-01-11')
  },
  {
    title: 'Mongoose Connect Using Async/Await',
    raw: './tutorials/mongoose/mongoose-connect-async.md',
    url: '/tutorials/mongoose/mongoose-connect-async',
    description: 'How to use connect() and createConnection() in an async function.',
    tags: ['mongoose'],
    date: moment('2021-01-07')
  },
  {
    title: 'Check Mongoose Connection Status',
    raw: './tutorials/mongoose/connection-status.md',
    url: '/tutorials/mongoose/connection-status',
    description: 'Mongoose connections have a `readyState` property that lets you check if Mongoose is connected to MongoDB. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2021-01-06')
  },
  {
    title: 'JavaScript Trim String',
    raw: './tutorials/fundamentals/trim-string.md',
    url: '/tutorials/fundamentals/trim-string',
    description: 'JavaScript strings have a neat `trim()` method that removes leading and trailing whitespace. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2021-01-04')
  },
  {
    title: 'How to Filter an Object with JavaScript',
    raw: './tutorials/fundamentals/filter-object.md',
    url: '/tutorials/fundamentals/filter-object',
    description: 'JavaScript arrays have a neat `filter()` function. Here\'s how you can use the `filter()` pattern with objects.',
    tags: ['fundamentals'],
    date: moment('2020-12-21')
  },
  {
    title: 'How to Use forEach() in JavaScript',
    raw: './tutorials/fundamentals/foreach.md',
    url: '/tutorials/fundamentals/foreach',
    description: 'JavaScript\'s `forEach()` function is one of several ways to iterate through an array in JavaScript. Here\'s what you need to know about `forEach()`.',
    tags: ['fundamentals'],
    date: moment('2020-12-16')
  },
  {
    title: 'Reactivity in Vue 3',
    raw: './tutorials/vue/reactivity.md',
    url: '/tutorials/vue/reactivity',
    description: 'Here\'s what you need to know about Vue 3\'s brand new reactivity system, based on ES6 proxies.',
    tags: ['vue'],
    date: moment('2020-12-11')
  },
  {
    title: 'Components in Vue 3',
    raw: './tutorials/vue/vue-3-components.md',
    url: '/tutorials/vue/vue-3-components',
    description: 'Vue 3 was released on September 18, 2020. Here\'s what you need to know about defining components in Vue 3 vs Vue 2.',
    tags: ['vue'],
    date: moment('2020-12-09')
  },
  {
    title: 'What\'s New in Vue 3',
    raw: './tutorials/vue/vue-3.md',
    url: '/tutorials/vue/vue-3',
    description: 'Vue 3 was released on September 18, 2020. Here\'s how you can get started building a basic app with Vue 3 and no other dependencies.',
    tags: ['vue'],
    date: moment('2020-12-07')
  },
  {
    title: 'Compare Two Dates, Ignoring Time, in JavaScript',
    raw: './tutorials/fundamentals/compare-dates-without-time.md',
    url: '/tutorials/fundamentals/compare-dates-without-time',
    description: 'Here\'s how you can compare two dates in JavaScript, ignoring the time component.',
    tags: ['fundamentals'],
    date: moment('2020-12-04')
  },
  {
    title: '`null` in JavaScript',
    raw: './tutorials/fundamentals/null.md',
    url: '/tutorials/fundamentals/null',
    description: 'In JavaScript, `null` is a primitive that represents the intentional absence of a value. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-12-02')
  },
  {
    title: 'The `toString()` Function in JavaScript',
    raw: './tutorials/fundamentals/tostring.md',
    url: '/tutorials/fundamentals/tostring',
    description: 'The `toString()` method converts values into strings. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-11-30')
  },
  {
    title: 'Clone an Object in JavaScript',
    raw: './tutorials/fundamentals/clone.md',
    url: '/tutorials/fundamentals/clone',
    description: 'There are several ways to shallow clone an object in vanilla JavaScript, and a couple of ways to deep clone an object. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-11-25')
  },
  {
    title: 'Axios Cancel Request',
    raw: './tutorials/axios/cancel.md',
    url: '/tutorials/axios/cancel',
    description: 'Axios supports cancelling HTTP requests using cancel tokens. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-11-23')
  },
  {
    title: 'What Does `app.use(express.static())` Do in Express?',
    raw: './tutorials/express/app-use-static.md',
    url: '/tutorials/express/app-use-static',
    description: 'Calling `app.use(express.static())` adds a middleware to your Express app that serves static files. Here\'s what you need to know.',
    tags: ['express'],
    date: moment('2020-11-20')
  },
  {
    title: 'The `app.get()` Function in Express',
    raw: './tutorials/express/app-get.md',
    url: '/tutorials/express/app-get',
    description: 'Express apps have a `get()` function that creates a new route handler for GET requests. Here\'s what you need to know.',
    tags: ['express'],
    date: moment('2020-11-18')
  },
  {
    title: 'The `app.use()` Function in Express',
    raw: './tutorials/express/app-use.md',
    url: '/tutorials/express/app-use',
    description: 'Express apps have a `use()` function that adds a new middleware to the middleware stack. Here\'s what you need to know.',
    tags: ['express'],
    date: moment('2020-11-16')
  },
  {
    title: 'What are Vuex Actions?',
    raw: './tutorials/vue/vuex-actions.md',
    url: '/tutorials/vue/vuex-actions',
    description: 'Vuex actions are a neat way to handle async logic with Vuex. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-11-13')
  },
  {
    title: 'What is a Vuex Store?',
    raw: './tutorials/vue/vuex-store.md',
    url: '/tutorials/vue/vuex-store',
    description: 'Vuex stores are containers for your app\'s state. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-11-11')
  },
  {
    title: 'Vuex Getters',
    raw: './tutorials/vue/vuex-getters.md',
    url: '/tutorials/vue/vuex-getters',
    description: 'Getters are how you bind store data to local data in your Vue components. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-11-09')
  },
  {
    title: 'Compare Objects with Lodash',
    raw: './tutorials/lodash/compare-objects.md',
    url: '/tutorials/lodash/compare-objects',
    description: 'Lodash\'s `isEqual()` function provides a deep equality check for comparing objects. Here\'s what you need to know.',
    tags: ['lodash'],
    date: moment('2020-11-06')
  },
  {
    title: 'NaN in JavaScript',
    raw: './tutorials/fundamentals/nan.md',
    url: '/tutorials/fundamentals/nan',
    description: '`NaN`, "Not a Number", is a value that JavaScript returns when you attempt to use a non-numeric value as a number. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-11-04')
  },
  {
    title: 'Equality in JavaScript',
    raw: './tutorials/fundamentals/equality.md',
    url: '/tutorials/fundamentals/equality',
    description: 'There are 4 different algorithms JavaScript uses to determine whether two values are equal. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-11-03')
  },
  {
    title: 'Create a Simple HTTP Proxy in Node.js',
    raw: './tutorials/node/http-proxy.md',
    url: '/tutorials/node/http-proxy',
    description: 'Here\'s how you can create a simple HTTP proxy in Node.js.',
    tags: ['node'],
    date: moment('2020-10-30')
  },
  {
    title: 'Axios vs Fetch: Which Should You Use?',
    raw: './tutorials/axios/vs-fetch.md',
    url: '/tutorials/axios/vs-fetch',
    description: 'Should you use Axios or browsers\' native `fetch()`? Here\'s why you should use Axios.',
    tags: ['axios'],
    date: moment('2020-10-28')
  },
  {
    title: 'Using Axios\' Proxy Option',
    raw: './tutorials/axios/proxy.md',
    url: '/tutorials/axios/proxy',
    description: 'Axios has a `proxy` option that lets you send requests through a proxy. Here\'s how it works.',
    tags: ['axios'],
    date: moment('2020-10-26')
  },
  {
    title: 'JavaScript Append to Array',
    raw: './tutorials/fundamentals/array-append.md',
    url: '/tutorials/fundamentals/array-append',
    description: 'The `push()` function is the most common way to add a new element to a JavaScript array, but there are a few other alternatives. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-10-20')
  },
  {
    title: 'JavaScript Array `includes()`',
    raw: './tutorials/fundamentals/array-includes.md',
    url: '/tutorials/fundamentals/array-includes',
    description: 'The `includes()` array method tells you whether an array contains the given element. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-10-13')
  },
  {
    title: 'Get The Current Array Index in JavaScript forEach()',
    raw: './tutorials/fundamentals/foreach-index.md',
    url: '/tutorials/fundamentals/foreach-index',
    description: 'Here\'s how you can get the current index (counter) the `forEach()` loop is on.',
    tags: ['fundamentals'],
    date: moment('2020-10-09')
  },
  {
    title: 'Using Continue in JavaScript forEach()',
    raw: './tutorials/fundamentals/foreach-continue.md',
    url: '/tutorials/fundamentals/foreach-continue',
    description: 'The `continue` keyword doesn\'t work with `forEach()`, but there are ways to skip to the next iteration of a `forEach()`. Here\'s how.',
    tags: ['fundamentals'],
    date: moment('2020-10-07')
  },
  {
    title: 'How to Break Out of a JavaScript forEach() Loop',
    raw: './tutorials/fundamentals/foreach-break.md',
    url: '/tutorials/fundamentals/foreach-break',
    description: 'The `break` keyword doesn\'t work with `forEach()`, but there are several ways to simulate `break` with `forEach()`. Here\'s how.',
    tags: ['fundamentals'],
    date: moment('2020-10-05')
  },
  {
    title: 'How to Check Your Node.js Version',
    raw: './tutorials/node/version.md',
    url: '/tutorials/node/version',
    description: 'Checking what version of Node.js you\'re using is easy. You can either run `node --version`, or print `process.version`. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-10-02')
  },
  {
    title: 'HTTP Servers in Node.js',
    raw: './tutorials/node/http-server.md',
    url: '/tutorials/node/http-server',
    description: 'Node.js has a built-in HTTP server class that you can use to respond to HTTP requests. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-09-30')
  },
  {
    title: 'Websocket Server in Node.js',
    raw: './tutorials/node/websocket-server.md',
    url: '/tutorials/node/websocket-server',
    description: 'The ws package lets you start a websocket server in Node.js. You can also integrate ws with frameworks like Express. Here\'s how.',
    tags: ['node'],
    date: moment('2020-09-28')
  },
  {
    title: 'Get the Installed Version of an npm Package',
    raw: './tutorials/npm/version.md',
    url: '/tutorials/npm/version',
    description: '`npm list` lets you get the currently installed version of a given package. Here\'s what you need to know.',
    tags: ['npm'],
    date: moment('2020-09-23')
  },
  {
    title: 'Using npm update',
    raw: './tutorials/npm/update.md',
    url: '/tutorials/npm/update',
    description: '`npm update` lets you update a package that you previously installed. Here\'s what you need to know.',
    tags: ['npm'],
    date: moment('2020-09-23')
  },
  {
    title: 'Uninstall a Package with npm',
    raw: './tutorials/npm/uninstall-package.md',
    url: '/tutorials/npm/uninstall-package',
    description: '`npm uninstall` lets you uninstall a package that you previously installed, including all of the package\'s dependencies. Here\'s what you need to know.',
    tags: ['npm'],
    date: moment('2020-09-21')
  },
  {
    title: 'Drawing SVG Graphics with Vue',
    raw: './tutorials/vue/svg.md',
    url: '/tutorials/vue/svg',
    description: 'Vue has great support for SVG graphics, letting you draw customized images and charts. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-09-18')
  },
  {
    title: 'Vue Error Handling',
    raw: './tutorials/vue/error-handling.md',
    url: '/tutorials/vue/error-handling',
    description: 'Vue instances have a neat `errorCaptured` function that Vue calls whenever an error occurs in a method or lifecycle hook. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-09-16')
  },
  {
    title: 'Getting Started with Vue Test Utils',
    raw: './tutorials/vue/vue-test-utils.md',
    url: '/tutorials/vue/vue-test-utils',
    description: 'Vue Test Utils is Vue\'s official unit testing library for Node.js. Here\'s how you can get started testing Vue components in Node with Vue Test Utils.',
    tags: ['vue'],
    date: moment('2020-09-14')
  },
  {
    title: 'Axios DELETE Requests',
    raw: './tutorials/axios/delete.md',
    url: '/tutorials/axios/delete',
    description: 'Here\'s how you can send an HTTP DELETE request with Axios, including how to send a request body with a DELETE request.',
    tags: ['axios'],
    date: moment('2020-09-11')
  },
  {
    title: 'Axios Options',
    raw: './tutorials/axios/options.md',
    url: '/tutorials/axios/options',
    description: 'Axios\' `options` parameter contains numerous options for configuring HTTP requests. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-09-09')
  },
  {
    title: 'Axios GET with Data',
    raw: './tutorials/axios/get-with-data.md',
    url: '/tutorials/axios/get-with-data',
    description: 'Axios\' `data` parameter ends up in the HTTP request body, so you can\'t send GET requests with `data`. Here\'s a workaround.',
    tags: ['axios'],
    date: moment('2020-09-08')
  },
  {
    title: 'Compare Two JavaScript Strings, Ignoring Case',
    raw: './tutorials/fundamentals/compare-strings-ignore-case.md',
    url: '/tutorials/fundamentals/compare-strings-ignore-case',
    description: 'Here\'s how you can compare two strings in JavaScript, ignoring case.',
    tags: ['fundamentals'],
    date: moment('2020-09-04')
  },
  {
    title: 'Upload a File in JavaScript',
    raw: './tutorials/fundamentals/upload-file.md',
    url: '/tutorials/fundamentals/upload-file',
    description: 'Uploading a file to a server is a common task in JavaScript. Here\'s how you can upload a file and handle the upload on the server side using Node.js',
    tags: ['fundamentals'],
    date: moment('2020-09-02')
  },
  {
    title: 'Email Validation in JavaScript',
    raw: './tutorials/fundamentals/email-validation.md',
    url: '/tutorials/fundamentals/email-validation',
    description: 'There are a couple of ways to validate email addresses in JavaScript: using regular expressions, synchronous libraries, or APIs. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-08-31')
  },
  {
    title: 'Express Template Engines',
    raw: './tutorials/express/template-engine.md',
    url: '/tutorials/express/template-engine',
    description: 'Express template engines let you plug in support for templating languages like Pug (AKA Jade), Handlebars, or anything else. Here\'s how you can use existing templating engines, or write your own.',
    tags: ['express'],
    date: moment('2020-08-28')
  },
  {
    title: 'Express Render HTML',
    raw: './tutorials/express/render-html.md',
    url: '/tutorials/express/render-html',
    description: 'Given some plain HTML, how do you render it using Express? Here\'s what you need to know.',
    tags: ['express'],
    date: moment('2020-08-26')
  },
  {
    title: 'Params in Express',
    raw: './tutorials/express/params.md',
    url: '/tutorials/express/params',
    description: 'Express requests have a `params` object that contains route parameters, as well as a `query` object that contains query parameters. Here\'s what you need to know.',
    tags: ['express'],
    date: moment('2020-08-24')
  },
  {
    title: 'Using the Buffer `toString()` Function in Node.js',
    raw: './tutorials/node/buffer-to-string.md',
    url: '/tutorials/node/buffer-to-string',
    description: 'Node.js buffers have a `toString()` method you can use to convert raw data into various encodings, like hex and base64. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-08-21')
  },
  {
    title: 'Get the Length of a Buffer in Node.js',
    raw: './tutorials/node/buffer-length.md',
    url: '/tutorials/node/buffer-length',
    description: 'Node.js buffers have a length property that contains the number of bytes in the buffer. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-08-19')
  },
  {
    title: 'Compare Two Buffers in Node.js',
    raw: './tutorials/node/buffer-compare.md',
    url: '/tutorials/node/buffer-compare',
    description: 'Node.js buffers have a static function `compare()` that lets you check if two buffers are equal. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-08-17')
  },
  {
    title: 'Using JavaScript `map()` and `filter()` Together for Composition',
    raw: './tutorials/fundamentals/map-filter.md',
    url: '/tutorials/fundamentals/map-filter',
    description: 'When used together, JavaScript\'s `map()` and `filter()` functions let you write more composable code. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-08-14')
  },
  {
    title: 'Understand the JavaScript Array Filter Function in 5 Examples',
    raw: './tutorials/fundamentals/array-filter-function.md',
    url: '/tutorials/fundamentals/array-filter-function',
    description: 'JavaScript arrays have a `filter()` method that quickly lets you get just the elements of an array that match a given condition. Here\'s 5 common patterns with the `filter()` function.',
    tags: ['fundamentals'],
    date: moment('2020-08-12')
  },
  {
    title: 'Filter an Array of Objects in JavaScript',
    raw: './tutorials/fundamentals/filter-array-of-objects.md',
    url: '/tutorials/fundamentals/filter-array-of-objects',
    description: 'JavaScript arrays have a `filter()` method that quickly lets you get just the elements of an array that match a given condition. Here\'s how you can use it to filter an array of objects.',
    tags: ['fundamentals'],
    date: moment('2020-08-10')
  },
  {
    title: 'Using ESLint\'s --fix Flag',
    raw: './tutorials/eslint/fix.md',
    url: '/tutorials/eslint/fix',
    description: 'Running `eslint --fix` tells ESLint to automatically fix common errors. Here\'s what you need to know.',
    tags: ['eslint'],
    date: moment('2020-08-07')
  },
  {
    title: 'Intro to ESLint Config Files',
    raw: './tutorials/eslint/config.md',
    url: '/tutorials/eslint/config',
    description: 'ESLint config files let you define what rules ESLint enforces and what environment your project is targetting. Here\'s what you need to know.',
    tags: ['eslint'],
    date: moment('2020-08-05')
  },
  {
    title: 'Understanding ESLint Rules',
    raw: './tutorials/eslint/rules.md',
    url: '/tutorials/eslint/rules',
    description: 'Rules are how you configure ESLint. By configuring which rules are errors or warnings, you can build your own ESLint config. Here\'s what you need to know.',
    tags: ['eslint'],
    date: moment('2020-08-03')
  },
  {
    title: 'Convert an Array into an Object in JavaScript',
    raw: './tutorials/fundamentals/array-to-object.md',
    url: '/tutorials/fundamentals/array-to-object',
    description: 'Here\'s how you can convert a JavaScript array into an object.',
    tags: ['fundamentals'],
    date: moment('2020-07-31')
  },
  {
    title: 'Copy an Array in JavaScript',
    raw: './tutorials/fundamentals/copy-array.md',
    url: '/tutorials/fundamentals/copy-array',
    description: 'Here\'s several ways you can copy an array in JavaScript.',
    tags: ['fundamentals'],
    date: moment('2020-07-29')
  },
  {
    title: 'Debugging "TypeError: X is not a function" in JavaScript',
    raw: './tutorials/fundamentals/typeerror-is-not-a-function.md',
    url: '/tutorials/fundamentals/typeerror-is-not-a-function',
    description: '"TypeError: X is not a function" errors can be confusing. Here\'s what this error message means and how you can fix it.',
    tags: ['fundamentals'],
    date: moment('2020-07-27')
  },
  {
    title: 'GET Request Query Params with Axios',
    raw: './tutorials/axios/get-query-params.md',
    url: '/tutorials/axios/get-query-params',
    description: 'Axios can automatically serialize query strings for you. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-07-25')
  },
  {
    title: 'Get the HTTP Response Body with Axios',
    raw: './tutorials/axios/response-body.md',
    url: '/tutorials/axios/response-body',
    description: 'When you `await` on an Axios request, you get back an Axios response object. Here\'s how you can get the HTTP response body from an Axios response object.',
    tags: ['axios'],
    date: moment('2020-07-23')
  },
  {
    title: 'GET Requests with Axios',
    raw: './tutorials/axios/get.md',
    url: '/tutorials/axios/get',
    description: 'Axios makes it easy to send HTTP GET requests, including serializing query string parameters. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-07-20')
  },
  {
    title: 'Mongoose Timestamps',
    raw: './tutorials/mongoose/timestamps.md',
    url: '/tutorials/mongoose/timestamps',
    description: 'Mongoose has a built-in timestamps option that sets `createdAt` and `updatedAt` on your documents automatically. Here\'s how you can use it.',
    tags: ['mongoose'],
    date: moment('2020-07-17')
  },
  {
    title: 'The `create()` Function in Mongoose',
    raw: './tutorials/mongoose/create.md',
    url: '/tutorials/mongoose/create',
    description: 'Mongoose\'s `create()` function is a convenience wrapper around `save()`. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2020-07-15')
  },
  {
    title: 'Understanding `unique` in Mongoose',
    raw: './tutorials/mongoose/unique.md',
    url: '/tutorials/mongoose/unique',
    description: 'Mongoose lets you define schema paths as `unique`, but the `unique` option has a few important caveats. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2020-07-13')
  },
  {
    title: 'Loading Vue via CDN',
    raw: './tutorials/vue/cdn.md',
    url: '/tutorials/vue/cdn',
    description: 'You don\'t have to use bundlers to compile Vue, you can easily load Vue from a CDN. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-07-10')
  },
  {
    title: 'Handling Click Events with Vue',
    raw: './tutorials/vue/click.md',
    url: '/tutorials/vue/click',
    description: 'Vue\'s v-on:click lets you attach click handlers to DOM elements. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-07-08')
  },
  {
    title: 'Watch vs Computed in Vue',
    raw: './tutorials/vue/watch-vs-computed.md',
    url: '/tutorials/vue/watch-vs-computed',
    description: 'Watchers and computed properties are two ways to update one value when another value changes. Here\'s how they are different.',
    tags: ['vue'],
    date: moment('2020-07-06')
  },
  {
    title: 'How to Iterate through an Array in JavaScript',
    raw: './tutorials/fundamentals/array-iterate.md',
    url: '/tutorials/fundamentals/array-iterate',
    description: 'There are numerous ways to iterate through an array in JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-07-03')
  },
  {
    title: 'The JavaScript Array `filter()` Method',
    raw: './tutorials/fundamentals/array-filter.md',
    url: '/tutorials/fundamentals/array-filter',
    description: 'The `filter()` method creates a new array of elements that match a given test. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-07-01')
  },
  {
    title: 'JavaScript Iterators',
    raw: './tutorials/fundamentals/iterator.md',
    url: '/tutorials/fundamentals/iterator',
    description: 'Iterators and iterables define sequences of values in JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-06-29')
  },
  {
    title: 'Import vs Require in Node.js',
    raw: './tutorials/node/import-vs-require.md',
    url: '/tutorials/node/import-vs-require',
    description: 'Now that Node.js has native support for ESM imports, should you use `require()` or `import`? Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-06-26')
  },
  {
    title: 'Using `import` Statements in Node.js',
    raw: './tutorials/node/import.md',
    url: '/tutorials/node/import',
    description: 'Node has limited support for ES6 import statements. Here\'s how you can make JavaScript that uses `import` work in Node.',
    tags: ['node'],
    date: moment('2020-06-24')
  },
  {
    title: 'Making an HTTP Request in Node.js',
    raw: './tutorials/node/http-request.md',
    url: '/tutorials/node/http-request',
    description: 'Node\'s built-in HTTP library lets you make HTTP requests, but is hard to work with. Here\'s what you need to know.',
    tags: ['node', 'axios'],
    date: moment('2020-06-22')
  },
  {
    title: 'An Introduction to Symbols in JavaScript',
    raw: './tutorials/fundamentals/symbol.md',
    url: '/tutorials/fundamentals/symbol',
    description: 'Symbols are a way to create hidden properties on JavaScript objects. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-06-19')
  },
  {
    title: 'Get Query String Values in Vanilla JavaScript',
    raw: './tutorials/fundamentals/query-string.md',
    url: '/tutorials/fundamentals/query-string',
    description: 'Here\'s how you can parse the query string parameters in vanilla JavaScript.',
    tags: ['fundamentals'],
    date: moment('2020-06-17')
  },
  {
    title: 'Capitalize the First Letter of a String in JavaScript',
    raw: './tutorials/fundamentals/capitalize-first-letter.md',
    url: '/tutorials/fundamentals/capitalize-first-letter',
    description: 'Here\'s how you can capitalize the first letter of a JavaScript string without any external libraries.',
    tags: ['fundamentals'],
    date: moment('2020-06-15')
  },
  {
    title: 'POST JSON with Axios',
    raw: './tutorials/axios/post-json.md',
    url: '/tutorials/axios/post-json',
    description: 'Axios automatically serializes JavaScript objects into JSON, but you can also send a manually serialized JSON string. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-06-12')
  },
  {
    title: 'Error Handling in Axios using `catch()`',
    raw: './tutorials/axios/catch.md',
    url: '/tutorials/axios/catch',
    description: 'Axios requests are JavaScript promises, so you can use the `.catch()` function to handle errors. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-06-10')
  },
  {
    title: 'Axios Interceptors',
    raw: './tutorials/axios/interceptors.md',
    url: '/tutorials/axios/interceptors',
    description: 'Axios interceptors let you transform requests and responses. You can think of interceptors as Axios\' equivalent to middleware in Express or Mongoose. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-06-08')
  },
  {
    title: '`find()` with LIKE in Mongoose',
    raw: './tutorials/mongoose/find-like.md',
    url: '/tutorials/mongoose/find-like',
    description: 'MongoDB does not have a LIKE operator akin to SQL, but MongoDB does support queries by regular expressions. Here\'s how you can use regexp queries to simulate SQL\'s LIKE operator in Mongoose.',
    tags: ['mongoose'],
    date: moment('2020-06-05')
  },
  {
    title: 'Using MongoDB Explain with Mongoose',
    raw: './tutorials/mongoose/explain.md',
    url: '/tutorials/mongoose/explain',
    description: 'Mongoose queries have an `explain()` helper that let you inspect what indexes a query used. Here\'s how you can use `explain()` to figure out how a query performed.',
    tags: ['mongoose'],
    date: moment('2020-06-03')
  },
  {
    title: 'An Introduction to Mongoose\'s `save()` Function',
    raw: './tutorials/mongoose/save.md',
    url: '/tutorials/mongoose/save',
    description: 'Mongoose\'s `save()` function persists the changes you made to a document to the database. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2020-06-01')
  },
  {
    title: 'Iterating Through an Object with `forEach()`',
    raw: './tutorials/fundamentals/foreach-object.md',
    url: '/tutorials/fundamentals/foreach-object',
    description: 'You can use `forEach()` to iterate over a JavaScript object using `Object.key()`, `Object.values()`, and `Object.entries()`. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-05-29')
  },
  {
    title: 'Immediately Invoked Function Expressions (IIFE) in JavaScript',
    raw: './tutorials/fundamentals/iife.md',
    url: '/tutorials/fundamentals/iife',
    description: 'Immediately invoked function expressions (IIFE) is a design pattern commonly used to encapsulate variables. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-05-27')
  },
  {
    title: 'Disable a Button in JavaScript',
    raw: './tutorials/fundamentals/disable-button.md',
    url: '/tutorials/fundamentals/disable-button',
    description: 'Here\'s how you can disable a button using vanilla JavaScript.',
    tags: ['fundamentals'],
    date: moment('2020-05-25')
  },
  {
    title: 'An Introduction to Mongoose Arrays',
    raw: './tutorials/mongoose/array.md',
    url: '/tutorials/mongoose/array',
    description: 'Mongoose arrays supports arrays of primitives and arrays of subdocuments. Here\'s how you can work with Mongoose arrays effectively.',
    tags: ['mongoose'],
    date: moment('2020-05-22')
  },
  {
    title: 'An Introduction to Mongoose SchemaTypes',
    raw: './tutorials/mongoose/schematype.md',
    url: '/tutorials/mongoose/schematype',
    description: 'In Mongoose, a SchemaType is a configuration object for a given path within a schema. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2020-05-20')
  },
  {
    title: 'An Introduction to Mongoose Aggregate',
    raw: './tutorials/mongoose/aggregate.md',
    url: '/tutorials/mongoose/aggregate',
    description: 'Aggregations in Mongoose let you perform complex transformations on your data in MongoDB. Here\'s what you need to know.',
    tags: ['mongoose'],
    date: moment('2020-05-18')
  },
  {
    title: 'Vue Login with Axios',
    raw: './tutorials/vue/axios-login.md',
    url: '/tutorials/vue/axios-login',
    description: 'Here\'s how you can build a basic login form using Vue and Axios.',
    tags: ['vue'],
    date: moment('2020-05-15')
  },
  {
    title: 'The `router-link` Component in Vue',
    raw: './tutorials/vue/router-link.md',
    url: '/tutorials/vue/router-link',
    description: 'The `router-link` component is the preferred way to create links with Vue router. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-05-13')
  },
  {
    title: 'The `mounted()` Hook in Vue',
    raw: './tutorials/vue/mounted.md',
    url: '/tutorials/vue/mounted',
    description: 'The `mounted()` hook is the most commonly used lifecycle hook in Vue. Here\'s what you can use `mounted()` for and why you should use it rather than the `created()` hook.',
    tags: ['vue'],
    date: moment('2020-05-11')
  },
  {
    title: 'Using Webpack CSS Loader',
    raw: './tutorials/webpack/css-loader.md',
    url: '/tutorials/webpack/css-loader',
    description: 'Here\'s how you can use Webpack and the css-loader package to import styles.',
    tags: ['webpack'],
    date: moment('2020-05-08')
  },
  {
    title: 'Using Webpack to Compile TypeScript',
    raw: './tutorials/webpack/typescript.md',
    url: '/tutorials/webpack/typescript',
    description: 'Webpack can bundle and compile TypeScript using ts-loader. Here\'s what you need to know.',
    tags: ['webpack'],
    date: moment('2020-05-06')
  },
  {
    title: 'Webpack Externals',
    raw: './tutorials/webpack/externals.md',
    url: '/tutorials/webpack/externals',
    description: 'Externals let you exclude certain imports from the bundle so they can be resolved at runtime (like loaded via a script tag). Here\'s what you need to know.',
    tags: ['webpack'],
    date: moment('2020-05-04')
  },
  {
    title: 'FormData in JavaScript',
    raw: './tutorials/fundamentals/formdata.md',
    url: '/tutorials/fundamentals/formdata',
    description: 'The `FormData` class is useful for uploading files from JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-05-01')
  },
  {
    title: 'Blobs in JavaScript',
    raw: './tutorials/fundamentals/blob.md',
    url: '/tutorials/fundamentals/blob',
    description: 'Blobs (binary large objects) are a file-like data structure in JavaScript. Like buffers, but for the client side. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-04-29')
  },
  {
    title: 'Read Local Files in JavaScript with FileReader',
    raw: './tutorials/fundamentals/filereader.md',
    url: '/tutorials/fundamentals/filereader',
    description: 'The FileReader class lets you read files from a native file input. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-04-27')
  },
  {
    title: 'Vue Router Redirects',
    raw: './tutorials/vue/router-redirect.md',
    url: '/tutorials/vue/router-redirect',
    description: 'Here\'s how you can redirect to a different URL using Vue Router, using the built-in `redirect` option or programatically.',
    tags: ['vue'],
    date: moment('2020-04-24')
  },
  {
    title: 'Vue Dynamic Components',
    raw: './tutorials/vue/dynamic-component.md',
    url: '/tutorials/vue/dynamic-component',
    description: 'Here\'s how you can use Vue\'s `component` component to render a different component based on the state of your app.',
    tags: ['vue'],
    date: moment('2020-04-22')
  },
  {
    title: 'Show a Modal in Vue',
    raw: './tutorials/vue/modal.md',
    url: '/tutorials/vue/modal',
    description: 'A modal is an in-app pop-up. Here\'s how you can build a basic modal component in Vue.',
    tags: ['vue'],
    date: moment('2020-04-20')
  },
  {
    title: 'Thenables in JavaScript',
    raw: './tutorials/fundamentals/thenable.md',
    url: '/tutorials/fundamentals/thenable',
    description: 'A thenable is an object that behaves like a promise for the purposes of chaining and async/await, but is not necessarily a promise. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-04-17'),
    cta: 'asyncawait'
  },
  {
    title: 'Reject a Promise in JavaScript',
    raw: './tutorials/fundamentals/promise-reject.md',
    url: '/tutorials/fundamentals/promise-reject',
    description: 'Rejecting a promise in JavaScript is how you mark a promise as errored. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-04-16'),
    cta: 'asyncawait'
  },
  {
    title: 'JavaScript Promise Chaining',
    raw: './tutorials/fundamentals/promise-chaining.md',
    url: '/tutorials/fundamentals/promise-chaining',
    description: 'Promise chaining is a powerful pattern for composing promises. The key benefit is that you can handle all errors with one `catch()` handler. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-04-15'),
    cta: 'asyncawait'
  },
  {
    title: 'Using Bluebird Promises',
    raw: './tutorials/fundamentals/bluebird.md',
    url: '/tutorials/fundamentals/bluebird',
    description: 'Bluebird is a popular alternative Promise library for JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-04-13'),
    cta: 'asyncawait'
  },
  {
    title: 'Lodash\'s `pick()` Function',
    raw: './tutorials/lodash/pick.md',
    url: '/tutorials/lodash/pick',
    description: 'Lodash has a `pick()` function that creates a new object from a subset of the given object\'s keys. Here\'s what you need to know.',
    tags: ['lodash'],
    date: moment('2020-04-10')
  },
  {
    title: 'Lodash\'s `merge()` Function',
    raw: './tutorials/lodash/merge.md',
    url: '/tutorials/lodash/merge',
    description: 'Lodash has a `merge()` function behaves like `Object.assign()`, but with a couple key differences. Here\'s what you need to know.',
    tags: ['lodash'],
    date: moment('2020-04-09')
  },
  {
    title: 'Lodash\'s `map()` Function',
    raw: './tutorials/lodash/map.md',
    url: '/tutorials/lodash/map',
    description: 'Lodash has a `map()` function that transform arrays and objects value by value. Here\'s what you need to know.',
    tags: ['lodash'],
    date: moment('2020-04-08')
  },
  {
    title: 'Lodash\'s `filter()` Function',
    raw: './tutorials/lodash/filter.md',
    url: '/tutorials/lodash/filter',
    description: 'Lodash has a `filter()` function that lets you filter an array using a custom function. Here\'s what you need to know.',
    tags: ['lodash'],
    date: moment('2020-04-06')
  },
  {
    title: 'PUT Requests with Axios',
    raw: './tutorials/axios/put.md',
    url: '/tutorials/axios/put',
    description: 'Sending an HTTP PUT request with Axios is easy. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-04-03')
  },
  {
    title: 'Set the Authorization Header with Axios',
    raw: './tutorials/axios/authorization.md',
    url: '/tutorials/axios/authorization',
    description: 'Here\'s how you can set the authorization header on an Axios HTTP request.',
    tags: ['axios'],
    date: moment('2020-04-01')
  },
  {
    title: 'The `then()` Function in Axios',
    raw: './tutorials/axios/then.md',
    url: '/tutorials/axios/then',
    description: 'Axios request objects have a `then()` function, which means you can use them with promise chains and async/await. Here\'s what you need to know.',
    tags: ['axios'],
    date: moment('2020-03-30')
  },
  {
    title: 'JavaScript Create Promise',
    raw: './tutorials/fundamentals/promise-create.md',
    url: '/tutorials/fundamentals/promise-create',
    description: 'There are several ways to create a new promise in JavaScript. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-03-27')
  },
  {
    title: 'The Promise `catch()` Function in JavaScript',
    raw: './tutorials/fundamentals/catch.md',
    url: '/tutorials/fundamentals/catch',
    description: 'The `catch()` function is a convenient bit of syntactic sugar that helps you handle promise errors. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-03-25')
  },
  {
    title: 'Promises in Mongoose',
    raw: './tutorials/mongoose/promise.md',
    url: '/tutorials/mongoose/promise',
    description: 'Everything you need to know about the `mongoose.Promise` property.',
    tags: ['mongoose'],
    date: moment('2020-03-23')
  },
  {
    title: 'Compare Arrays in JavaScript',
    raw: './tutorials/fundamentals/compare-arrays.md',
    url: '/tutorials/fundamentals/compare-arrays',
    description: 'Comparing two arrays in JavaScript can be tricky. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-03-20')
  },
  {
    title: 'Compare Dates in JavaScript',
    raw: './tutorials/fundamentals/compare-dates.md',
    url: '/tutorials/fundamentals/compare-dates',
    description: 'Comparing dates in JavaScript is tricky. Since dates are objects, `===` compares dates by reference rather than by value. Here\'s how you can compare dates in vanilla JavaScript.',
    tags: ['fundamentals'],
    date: moment('2020-03-18')
  },
  {
    title: 'Compare Strings in JavaScript',
    raw: './tutorials/fundamentals/compare-strings.md',
    url: '/tutorials/fundamentals/compare-strings',
    description: 'JavaScript\'s comparison operators make it easy to compare strings. There\'s also a `localeCompare()` method for sorting.',
    tags: ['fundamentals'],
    date: moment('2020-03-16')
  },
  {
    title: 'Send Static Files in Express with sendFile()',
    raw: './tutorials/express/sendfile.md',
    url: '/tutorials/express/sendfile',
    description: 'The `sendFile()` method lets you send a static file as an Express response. Here\'s what you need to know.',
    tags: ['express'],
    date: moment('2020-03-13')
  },
  {
    title: 'Serving Static Files in Express',
    raw: './tutorials/express/static.md',
    url: '/tutorials/express/static',
    description: 'Here\'s how you can serve static assets directly from a folder using Node.js and Express.',
    tags: ['express'],
    date: moment('2020-03-12')
  },
  {
    title: 'Handling Websockets with Express',
    raw: './tutorials/express/websockets.md',
    url: '/tutorials/express/websockets',
    description: 'Handling websockets with an Express server in Node.js is easy with the ws module. Here\'s how it works.',
    tags: ['express'],
    date: moment('2020-03-09')
  },
  {
    title: 'Upload Files to Google Cloud Storage in Node.js',
    raw: './tutorials/node/google-cloud-storage.md',
    url: '/tutorials/node/google-cloud-storage',
    description: 'Google Cloud has a Node.js API that lets you upload Google Cloud Functions, launch new VMs, and compile code on Google Cloud. Here\'s how you can upload files to Google Cloud Storage.',
    tags: ['node'],
    date: moment('2020-03-06')
  },
  {
    title: 'Analyze JavaScript Bundles with Webpack Bundle Analyzer',
    raw: './tutorials/webpack/bundle-analyzer.md',
    url: '/tutorials/webpack/bundle-analyzer',
    description: 'Webpack Bundle Analyzer generates a zoomable treemap of the contents of your Webpack bundle. Here\'s how you can get started with webpack-bundle-analyzer.',
    tags: ['webpack'],
    date: moment('2020-03-04')
  },
  {
    title: 'An Introduction to Webpack Configs',
    raw: './tutorials/webpack/config.md',
    url: '/tutorials/webpack/config',
    description: 'Webpack configs are a common source of confusion, but they are actually pretty simple to write by hand. Here\'s what you need to know.',
    tags: ['webpack'],
    date: moment('2020-03-02')
  },
  {
    title: 'The `typeof` Operator in JavaScript',
    raw: './tutorials/fundamentals/typeof.md',
    url: '/tutorials/fundamentals/typeof',
    description: 'The typeof Operator tells you the type of a value - whether the value is a number, string, object, etc. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-02-28')
  },
  {
    title: 'Sort an Array of Objects in JavaScript',
    raw: './tutorials/fundamentals/sort-array-of-objects.md',
    url: '/tutorials/fundamentals/sort-array-of-objects',
    description: 'JavaScript\'s built in `sort()` function lets you sort arrays by an object property. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-02-26')
  },
  {
    title: 'How to Iterate Over a JavaScript Object',
    raw: './tutorials/fundamentals/iterate-object.md',
    url: '/tutorials/fundamentals/iterate-object',
    description: 'There are numerous ways to iterate over all keys and values in a JavaScript object. Here\'s 3 ways and the tradeoffs between them.',
    tags: ['fundamentals'],
    date: moment('2020-02-24')
  },
  {
    title: 'Node.js Buffer Tutorial',
    raw: './tutorials/node/buffer.md',
    url: '/tutorials/node/buffer',
    description: 'Node.js has a built-in Buffer type that lets you store arbitrary binary data. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-02-21')
  },
  {
    title: 'Deploy a Function to Lambda Using the Node.js AWS SDK',
    raw: './tutorials/node/lambda.md',
    url: '/tutorials/node/lambda',
    description: 'AWS is powerful, but their UI leaves a lot to be desired. Here\'s how you can skip the AWS console and deploy Lambda functions from a Node.js script.',
    tags: ['node'],
    date: moment('2020-02-19')
  },
  {
    title: 'The `util.promisify()` Function in Node.js',
    raw: './tutorials/node/promisify.md',
    url: '/tutorials/node/promisify',
    description: 'The `util.promisify()` function converts functions that use Node.js callbacks into functions that return promises. Here\'s what you need to know.',
    tags: ['node'],
    date: moment('2020-02-17')
  },
  {
    title: 'GraphQL Mutations in Apollo',
    raw: './tutorials/graphql/mutations.md',
    url: '/tutorials/graphql/mutations',
    description: 'GraphQL operations are broken up into 2 types: queries and mutations. Queries are read-only, mutations modify data. Here\'s what you need to know about mutations in Apollo.',
    tags: ['graphql'],
    date: moment('2020-02-13')
  },
  {
    title: 'An Introduction to GraphQL with Apollo',
    raw: './tutorials/graphql/apollo.md',
    url: '/tutorials/graphql/apollo',
    description: 'Apollo is a GraphQL server - it parses your GraphQL schema and provides a framework for you to define resolvers and mutations. Here\'s what you need to know.',
    tags: ['graphql'],
    date: moment('2020-02-11')
  },
  {
    title: 'Vue v-for Tutorial',
    raw: './tutorials/vue/v-for.md',
    url: '/tutorials/vue/v-for',
    description: 'The `v-for` directive lets you render a separate item for each element in an array. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-02-07')
  },
  {
    title: 'Two Patterns for Unit Testing Vue Apps',
    raw: './tutorials/vue/unit-testing.md',
    url: '/tutorials/vue/unit-testing',
    description: 'Unit testing is tricky, especially on the frontend. Here\'s a couple of patterns we use at Mastering JS for testing Vue components in isolation.',
    tags: ['vue'],
    date: moment('2020-02-05')
  },
  {
    title: 'An Introduction To Vue $refs',
    raw: './tutorials/vue/refs.md',
    url: '/tutorials/vue/refs',
    description: 'Vue instances have a `$refs` property that lets you access a Vue instance\'s child components. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-02-03')
  },
  {
    title: 'Introduction to Puppeteer',
    raw: './tutorials/fundamentals/puppeteer.md',
    url: '/tutorials/fundamentals/puppeteer',
    description: 'Puppeteer is a great tool for testing JavaScript apps in a real browser. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-01-31')
  },
  {
    title: 'A Practical Introduction to Finite State Machines',
    raw: './tutorials/fundamentals/state-machines.md',
    url: '/tutorials/fundamentals/state-machines',
    description: 'State machines may seem like a dull abstract topic, but they are extremely useful for JavaScript developers. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-01-29')
  },
  {
    title: 'Understanding Async/Await in JavaScript',
    raw: './tutorials/fundamentals/async-await.md',
    url: '/tutorials/fundamentals/async-await',
    description: 'Async/await lets you write async code in a way that looks sync. No callbacks or promise chains, just `for` loops and `if` statements. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-01-27'),
    cta: 'asyncawait'
  },
  {
    title: 'Understanding `new Promise` in JavaScript',
    raw: './tutorials/fundamentals/promise-new.md',
    url: '/tutorials/fundamentals/promise-new',
    description: 'When you call `new Promise` in JavaScript, you invoke the Promise constructor. Here\'s how you can use the Promise constructor like a pro.',
    tags: ['fundamentals'],
    date: moment('2020-01-24'),
    cta: 'asyncawait'
  },
  {
    title: 'Resolve a Promise in JavaScript',
    raw: './tutorials/fundamentals/promise-resolve.md',
    url: '/tutorials/fundamentals/promise-resolve',
    description: 'Resolving a promise in JavaScript is how you mark a promise as fulfilled. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-01-22'),
    cta: 'asyncawait'
  },
  {
    title: 'The `Promise.all()` Function in JavaScript',
    raw: './tutorials/fundamentals/promise-all.md',
    url: '/tutorials/fundamentals/promise-all',
    description: 'The `Promise.all()` function lets you execute multiple promises in parallel, and accumulates the results. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-01-20'),
    cta: 'asyncawait'
  },
  {
    title: 'What is a Webhook?',
    raw: './tutorials/express/webhook.md',
    url: '/tutorials/express/webhook',
    description: 'A webhook is an API endpoint designed to be called by an outside service when an event occurs. Here\'s what you need to know about webhooks in Express.',
    tags: ['express'],
    date: moment('2020-01-17')
  },
  {
    title: 'Server-Sent Events with Express',
    raw: './tutorials/express/server-sent-events.md',
    url: '/tutorials/express/server-sent-events',
    description: 'Server-sent events are an alternative to websockets for pushing events from your Express server to your client. Here\'s how you can get started with server-sent events in Node.js with Express.',
    tags: ['express'],
    date: moment('2020-01-15')
  },
  {
    title: 'The Switch/Case Statement in JavaScript',
    raw: './tutorials/fundamentals/switch-case.md',
    url: '/tutorials/fundamentals/switch-case',
    description: 'The switch statement is like a multi-tiered `if` statement that can execute different code for different cases. This tutorial shows you how to use the `switch` and `case` statements.',
    tags: ['fundamentals'],
    date: moment('2020-01-13')
  },
  {
    title: 'An Overview of the vue.config.js File',
    raw: './tutorials/vue/config.md',
    url: '/tutorials/vue/config',
    description: 'The `vue.config.js` file configures the Vue CLI. Here\'s what you need to know.',
    tags: ['vue'],
    date: moment('2020-01-10')
  },
  {
    title: 'Vue Component Lifecycle',
    raw: './tutorials/vue/lifecycle.md',
    url: '/tutorials/vue/lifecycle',
    description: 'Vue components have lifecycle hooks just like React components. Vue calls these functions whenever it does certain things to your component.',
    tags: ['vue'],
    date: moment('2020-01-08')
  },
  {
    title: 'Conditional Classes in Vue',
    raw: './tutorials/vue/conditional-class.md',
    url: '/tutorials/vue/conditional-class',
    description: 'Learn how to set classes on an element conditionally in Vue.js.',
    tags: ['vue'],
    date: moment('2020-01-06')
  },
  {
    title: '`this` in JavaScript',
    raw: './tutorials/fundamentals/this.md',
    url: '/tutorials/fundamentals/this',
    description: 'The `this` keyword, also known as a function\'s "context" or "scope", is a powerful but confusing concept. Here\'s how you can wrap your head around it.',
    tags: ['fundamentals'],
    date: moment('2020-01-03')
  },
  {
    title: 'Triple Equals vs Double Equals in JavaScript',
    raw: './tutorials/fundamentals/equals.md',
    url: '/tutorials/fundamentals/equals',
    description: 'Whether you should use `==` or `===` is a common cause of confusion in JavaScript. The TLDR is that you should use `===`, with one minor exception. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2020-01-02')
  },
  {
    title: 'Get Tomorrow\'s Date in JavaScript',
    raw: './tutorials/fundamentals/tomorrow.md',
    url: '/tutorials/fundamentals/tomorrow',
    description: 'You can get tomorrow\'s date using vanilla JavaScript, although it is often easier with a library like Moment.js. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2019-12-30')
  },
  {
    title: 'Static Properties and Functions in JavaScript',
    raw: './tutorials/fundamentals/static.md',
    url: '/tutorials/fundamentals/static',
    description: 'The `static` keyword lets you define properties and functions on ES6 classes. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2019-12-18')
  },
  {
    title: 'The Modulus Operator in JavaScript',
    raw: './tutorials/fundamentals/modulus.md',
    url: '/tutorials/fundamentals/modulus',
    description: 'The modulus operator in JavaScript returns the remainder when the first operand is divided by the second operand. Here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2019-12-13')
  },
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
    date: moment('2019-09-11'),
    cta: 'asyncawait'
  },
  {
    title: 'Promises in JavaScript',
    raw: './tutorials/fundamentals/promise.md',
    url: '/tutorials/fundamentals/promise',
    description: 'A promise is an object that represents an asynchronous operation. Promises are JavaScript\'s fundamental concurrency primitive - here\'s what you need to know.',
    tags: ['fundamentals'],
    date: moment('2019-09-10'),
    cta: 'asyncawait'
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
    date: moment('2019-08-01'),
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
    description: 'Learn how to use ES6 maps.',
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
    raw: './tutorials/fundamentals/foreach-examples.md',
    url: '/tutorials/fundamentals/foreach-examples',
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
].map(tutorial => {
  const index = axiosPath.findIndex(_tutorial => _tutorial.url === tutorial.url);
  if (index !== -1) {
    if (index + 1 < axiosPath.length) {
      tutorial.next = axiosPath[index + 1];
    }
    if (index - 1 >= 0) {
      tutorial.prev = axiosPath[index - 1];
    }
  }

  return tutorial;
});

module.exports = tutorials;