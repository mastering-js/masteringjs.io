[Template engines](http://expressjs.com/en/guide/using-template-engines.html) allow you to configure Express to work
seamlessly with popular templating engines, like [Pug](https://pugjs.org/api/getting-started.html), [Mustache](https://www.npmjs.com/package/mustache), and others. In this tutorial, you'll learn how to add Pug as a template engine,
as well as how to write your own minimal template engine that enables Express to work with [Vue's server-side rendering](https://masteringjs.io/tutorials/vue/ssr).

Using Pug
---------

[Pug](https://www.npmjs.com/package/pug) (formerly known as Jade) is one of the most popular templating engines for
Express. Pug is a whitespace-sensitive HTML templating language that supports loops and conditionals. For example,
below is some valid Pug code:

```
h1
  | Hello, #{name}!
```

Suppose the above code is in the `views/test.pug` file. Below is how you can use Express to render `test.pug` for
you. Note the `app.set('view engine', 'pug')` call is how you tell Express to use Pug for templating. The string 'pug'
refers to the npm module you want to use as your template engine.

```javascript
[require:Express template engine pug$]
```

Using Vue Server Renderer
-------------------------

Not all templating languages work with Express by default. Thankfully, it is easy to [write your own template engine](http://expressjs.com/en/advanced/developing-template-engines.html) to glue your favorite templating language with Express. For example, suppose you have the below Vue template:

```html
<h1>Hello, {{name}}</h1>
```

If you try to call `app.set('engine', 'vue-server-renderer')`, Express will throw a `Module "vue-server-renderer" does not provide a view engine` error. You need to add some glue code to tell Express how to call Vue server renderer.

To tell Express how to handle Vue templates, you should use the `app.engine()` function. The `app.engine()` function
takes two parameters: a string `name` that tells Vue the name of this template engine, and a `templateEngine` function
that loads and compiles a given template. Below is how you can write a `templateEngine()` function that uses
Vue server renderer:

```javascript
[require:Express template engine vue$]
```