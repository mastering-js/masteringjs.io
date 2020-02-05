At [Mastering JS](/), we do our best to test every example in all of our tutorials.
That way we can be confident that our content is up to date when major
releases happen, or when we decide to rewrite a tutorial. That means we need
to automatically test all our Vue examples as well. In general, there are
two patterns we use for [unit testing](https://martinfowler.com/bliki/UnitTest.html)
our code examples:

With Server-Side Rendering in Node.js
-------------------------------------

When unit testing, you first need to define what you consider a "unit."
There's some debate as to what is a unit when it comes to writing Vue
code: do individual [methods](https://v1.vuejs.org/guide/events.html)
count as units? How about [computed properties](/tutorials/vue/computed)?
We at Mastering JS tend to err on the side of testing code closer to
how the end user will interact with it, so we consider a [Vue component](/tutorials/vue/components)
a unit.

Vue enjoys excellent support for Node.js and [server-side rendering](/tutorials/vue/ssr).
Unlike some other frameworks, instantiating a Vue component in Node.js
doesn't require any outside libraries or special customization.
Just call `new Vue()` and you get a [Vue instance](https://vuejs.org/v2/guide/instance.html).

```javascript
[require:Vue unit test with ssr$]
```

The benefit of using Node.js for unit tests is minimal setup and overhead.
The only outside libraries you need are a testing framework like [Mocha](/tutorials/mocha/intro)
and [vue-server-renderer](http://npmjs.com/package/vue-server-renderer).
You can also do a surprising amount with Vue in Node.js: you can `$emit`
events, change data, call methods, trigger lifecycle hooks, etc.

What you **can't** do with Node.js is interact with actual DOM elements,
unless you use another outside library. In the above example, you can
call the method that `v-on:click` triggers, but you can't actually
trigger a click event.

With Scaffolding in [Puppeteer](https://developers.google.com/web/tools/puppeteer)
-----------------------------

[Testing Vue apps with Puppeteer](https://thecodebarbarian.com/testing-vue-apps-with-puppeteer-and-mocha.html) is another alternative.
The benefit of using [Puppeteer](http://thecodebarbarian.com/control-chrome-from-node-js-with-puppeteer.html) is that you
get a fully fledged browser to work with. You can interact with
your component using vanilla JavaScript APIs like `click()`
and `document.querySelector()`.

The key idea behind how we test Vue with Puppeteer is Puppeteer's
`setContent()` function. If you can bundle everything your component needs,
you can put that JavaScript into a minimal HTML page, and put
it in Puppeteer.

```javascript
[require:Vue unit test with puppeteer$]
```

Testing with [Puppeteer](/tutorials/fundamentals/puppeteer) is great because you're testing in a real browser,
which means this test is as realistic as you can get without pointing
and clicking yourself. Also, if you disable headless mode, you can
actually watch the test run.

The downside of testing with Puppeteer is that you need to handle
bundling on your own. The above example doesn't need to bundle because
it doesn't use `require()`, but you would need to use Webpack
or [Browserify](https://www.npmjs.com/package/browserify) if
your code uses `require()`. Even if you use ES6 imports,
getting scaffolding right can be tricky.

Conclusion
----------

Vue makes it easy to test components in isolation using Node.js or
Puppeteer. Unit testing with Node.js is easier because it requires
less setup, but you can't test real browser interactions. On the
other hand, testing with Puppeteer requires more scaffolding, but
makes your tests more realistic.