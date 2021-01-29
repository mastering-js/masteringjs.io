In JavaScript, any variable defined outside any function is part of the [global scope](https://www.w3schools.com/js/js_scope.asp) and is a global variable that any function can access.

```javascript
const answer = 42;

function fn1() {
  console.log(answer); // Prints "42"
}

function fn2() {
  console.log(answer); // Prints "42"
}
```

If you're importing uncompiled JavaScript in the browser using `<script>` tags, global variables are shared between
different `<script>` tags. In other words, different `<script>` tags share the same global scope.

```html
<script type="text/javascript">
  const answer = 42;
</script>
<script type="text/javascript">
  console.log(answer); // 42
</script>
```

In Node.js
----------

Things are a little different in Node.js. In Node.js, a variable defined outside any function only has [file scope](https://stackabuse.com/using-global-variables-in-node-js/). Each individual `.js` file has its own "global scope" in Node.js.

```javascript
// file1.js
const answer = 42;

// file2.js
typeof answer; // 'undefined'
```

To create a true global variable in Node.js, that is shared between multiple files, you should use the [`global` object](https://nodejs.org/api/globals.html#globals_global).

```javascript
// file1.js
global.answer = 42;

// file2.js
global.answer; // 42
```

With [Webpack](/webpack)
------------------------

Like Node.js, [Webpack supports a `global` object that you should use to declare global variables](https://webpack.js.org/api/module-variables/#global-nodejs). That's because Webpack compiles the below JavaScript:

```javascript
console.log('Hello, World!');
```

Into the below JavaScript, modulo whitespace for some better readability.

```javascript
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([
  function(e,t){console.log("Hello, World!")}
]);
```

The important issue is that Webpack's compiler wraps individual files in their own functions, so Webpack-compiled JavaScript also has file-level scopes, rather than true global scope like if you're loading JavaScript files via `<script>` tags. So here's how you can declare a global variable with Webpack:

```javascript
global.answer = 42;
```

Automatic Global
----------------

If you assign to an variable that you didn't define using `let`, `const`, or `var` outside of [strict mode](/tutorials/fundamentals/strict), that automatically becomes a global variable.

```javascript
function() {
  answer = 42; // `answer` becomes global scoped in the browser, or file scoped in Node.js
}
```

However, in strict mode, assigning to an undefined variable throws an error. This is one of several reasons why you
should use strict mode, unless you have a very good reason not to.

```javascript
'use strict';

(function() {
  answer = 42; // 'ReferenceError: answer is not defined' instead of making `answer` a global
})();
```