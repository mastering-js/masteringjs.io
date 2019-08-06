In Vue, [`v-bind`](https://vuejs.org/v2/guide/class-and-style.html) lets you bind
an HTML attribute to a JavaScript expression. There are two broad use cases for
this one-way data binding:

- Binding to built-in attributes, like `href` or [`class`](https://vuejs.org/v2/guide/class-and-style.html#Binding-HTML-Classes)
- [Passing props to a child component](https://masteringjs.io/tutorials/vue/components#component-props)

Binding to Built-in Attributes
------------------------------

You can use `v-bind` to bind built-in HTML attributes to JavaScript expressions.
For example, you can make a link whose `href` is bound to a `data` field. When
the `link` field changes, so does the `href`.

```javascript
[require:Vue.*bind.*href$]
```

You can use this syntax for some cool use cases, including [dynamic inline `style` attributes](https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax-1).

```javascript
[require:Vue.*bind.*style$]
```

Props
-----

You can also use `v-bind` to [pass props to child components](/tutorials/vue/components#component-props).

```javascript
[require:Vue.*component.*component props]
```

Shorthand
---------

The `v-bind` part of `v-bind:prop` is optional. You can also use `:prop`.
Most large Vue codebases use `:prop` and avoid typing out `v-bind`.

```javascript
[require:Vue.*bind.*shorthand$]
```