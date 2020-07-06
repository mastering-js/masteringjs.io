Vue's `v-on` directive is how you [handle events in Vue](https://vuejs.org/v2/guide/events.html). The `v-on:click` directive lets you attach a click event handler
to an element. For example, the below Vue app updates every time you click
the "Add" button.

```javascript
[require:Vue click basic example$]
```

Below is a live example:

<div id="vue-rendered-content"></div>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
  new Vue({
    data: () => ({ message: 'Row' }),
    template: `
    <div style="border: 1px solid #ddd; padding: 8px">
      <h1>{{message}} your boat</h1>
      <button v-on:click="message += ' row'">Add</button>
    </div>
    `
  }).$mount('#vue-rendered-content');
</script>

If `v-on:click` is too verbose for you, Vue also supports `@click`, which is a
convenient shorthand.

```javascript
const app = new Vue({
  data: () => ({ message: 'Row' }),
  // `@click` is the same thing as `v-on:click`
  template: `
    <div>
      <h1>{{message}} your boat</h1>
      <button @click="message += ' row'">Add</button>
    </div>
  `
});
```

Methods and `$event`
-------------------

Vue executes the [expression](/tutorials/fundamentals/expressions) in `v-on:click`
with a couple additional features. First, Vue injects a `$event` variable that your
`v-on:click` code can use. `$event` is a reference to the [vanilla DOM event](https://developer.mozilla.org/en-US/docs/Web/Events).

```javascript
const app = new Vue({
  data: () => ({}),
  methods: {
    myMethod: function myMethod(ev) {
      console.log(ev); // MouseEvent { ... }
    }
  },
  template: `
    <div>
      <button v-on:click="myMethod($event)">Click Me</button>
    </div>
  `
});
```

Second, if your expression evaluates to a function, Vue will execute that function
and automatically pass `$event` as the first parameter. For example, the below
code is equivalent to the above, because, since `myMethod` is a function, Vue
will call it and pass `$event`.

```javascript
const app = new Vue({
  data: () => ({}),
  methods: {
    myMethod: function myMethod(ev) {
      console.log(ev); // MouseEvent { ... }
    }
  },
  template: `
    <div>
      <button v-on:click="myMethod">Click Me</button>
    </div>
  `
});
```

Common Modifiers
----------------

There are several common tasks when working with click handlers. For example, you
may want to call [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) to prevent redirecting the user when they click on an `a` tag,
or ignore click events on child elements. [Vue's event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers) can handle these tasks, and some other common tasks,
for you.

For example, `v-on:click.prevent` automatically calls `$event.preventDefault()`
for you. So the below app will have an `<a>` tag that does **not** redirect the
user when clicked.

```javascript
const app = new Vue({
  data: () => ({}),
  methods: {
    myMethod: function myMethod(ev) {
      console.log(ev); // MouseEvent { ... }
    }
  },
  template: `
    <div>
      <a v-on:click.prevent="myMethod($event)" href="/">Click Me</a>
    </div>
  `
});
```

`.prevent` is a _modifier_ for `v-on:click`. Another handy modifier is
`.self`, which tells Vue to only evaluate `v-on:click` if the element itself
is clicked, as opposed to one of its children.

For example, Vue only calls
the below `v-on:click` handler when you click on the outer `div`, not the inner `div`.

```javascript
const app = new Vue({
  data: () => ({}),
  methods: {
    alert: function() {
      alert('Clicked Outer');
    }
  },
  template: `
    <div>
      <div class="outer" v-on:click.self="alert()">
        Outer
        <div class="inner">Inner</div>
      </div>
    </div>
  `
});
```

Below is a live example.

<style>
  .outer {
    padding: 10px;
    background-color: #ddd;
  }

  .inner {
    margin: 10px;
    padding: 10px;
    background-color: #F0DB4B;
  }
</style>
<div id="vue-rendered-2"></div>

<script>
new Vue({
  data: () => ({}),
  methods: {
    alert: function() {
      alert('Clicked Outer');
    }
  },
  template: `
    <div>
      <div class="outer" v-on:click.self="alert()">
        Outer
        <div class="inner">Inner</div>
      </div>
    </div>
  `
}).$mount('#vue-rendered-2');
</script>