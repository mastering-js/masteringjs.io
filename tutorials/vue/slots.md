[Slots](https://vuejs.org/v2/guide/components-slots.html) allow you to embed arbitrary content in a Vue component. Slots are the Vue equivalent to [transclusion in Angular](https://docs.angularjs.org/api/ng/directive/ngTransclude) and [child props in React](https://reactjs.org/docs/composition-vs-inheritance.html).

For example, suppose you wanted a component called `green` that added a green background behind child content. Here's an example of such a component using slots.

```javascript
[require:Vue.*slots.*basic]
```

You can also define default inner HTML. If there's no inner HTML underneath `<green></green>`, Vue will use the inner HTML of `<slot></slot>` as shown below.

```javascript
[require:Vue.*slots.*default]
```

Named Slots
-----------

Sometimes you need multiple slots. For example, suppose you're writing a `brand` component that has two slots, 'name' and 'logo'.

```javascript
[require:Vue.*slots.*named]
```

The output HTML looks like this:

```
<div data-server-rendered="true" class="brand">
  <div class="logo">
    <img src="https://masteringjs.io/assets/logo.png">
  </div>
  <div class="name">
    <a href="/">
      Mastering JS
    </a>
  </div>
</div>
```

Here's the rendered HTML:

<div data-server-rendered="true" class="branding"><div class="logo"><img src="https://masteringjs.io/assets/logo.png"></div> <div class="name"><a href="/">
              Mastering JS
</a></div></div>
<div style="clear: both"></div>