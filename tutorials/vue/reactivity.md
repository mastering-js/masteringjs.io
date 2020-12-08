Vue 3 has a [new reactivity system based on ES6 proxies](https://v3.vuejs.org/guide/reactivity.html#what-is-reactivity). The new reactivity system overlaps with the much-debated [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) because the
Composition API lets you use Vue's reactivity system without using Vue components at all.
Some people have even talked about using [Vue as a backend framework](https://blog.tidelift.com/unconventional-vue-vue-as-a-backend-framework?utm_source=hs_email&utm_medium=email&utm_content=86397558). Here's how it works.

Using `ref()`
-------------

Vue has a global `ref()` function that creates a reactive wrapper around a JavaScript primitive.
For example, here's how you can create a "reactive" counter object.

```javascript
const { ref } = require('vue');

const count = ref(0);

// RefImpl { _rawValue: 0, _shallow: false, __v_isRef: true, _value: 0 }
console.log(count);

++count.value;

// RefImpl { _rawValue: 1, _shallow: false, __v_isRef: true, _value: 1 }
console.log(count);
```

What's interesting about this `ref`? Using [Vue's global `watchEffect()` function](https://v3.vuejs.org/api/computed-watch-api.html#watcheffect), you can watch for updates to `ref`.

```javascript
const { ref, watchEffect } = require('vue');

const count = ref(0);

watchEffect(function handler() { console.log(count.value); });

// Prints "1" because Vue knows to call `handler()` whenever count changes
++count.value;
```

Vue is smart enough to understand `ref()` values returned from `setup()`, so you can
define reactive state **without** defining a `data` property. For example, even though
the `counter` component doesn't have a `data` property, it still reacts to updates to
the value of `count` because `count` is a ref.

```javascript
const { createApp, ref } = require('vue');

const app = createApp({
  template: '<counter></counter>'
});

app.component('counter', {
  // Clicking the button increments the counter, because Vue is smart enough
  // to understand reactive properties returned from `setup()`
  template: `
    <div>
      <h1>{{count}}</h1>
      <button v-on:click="++count">Increment</button>
    </div>
  `,
  setup: function() {
    const count = ref(0);
    return { count };
  }
});
```

Using `reactive()`
------------------

Vue 3 also introduces a `reactive()` function that [behaves like `ref()`, but for objects](https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/). Remember that `ref()` generally should only
be used on primitive values: numbers, strings, booleans, BigInts, and symbols.

The `reactive()` function adds reactivity to an object's properties. Call `reactive()` on an object,
and you get back a proxied object that you can use with `watchEffect()`. For example, because
`character` is reactive in the below example, `watchEffect()` will print out the character's name
every time it changes.

```javascript
const { reactive, watchEffect } = require('vue');

const character = reactive({ name: 'Jean-Luc Picard' });

watchEffect(() => { console.log(character.name); });

// Prints "Locutus of Borg"
character.name = 'Locutus of Borg';
```

The biggest improvement with `reactive()` versus Vue 2's `data` property is that `reactive()` can
listen for when you create new properties, not just access existing ones. In the below example,
`watchEffect()` is smart enough to pick up when you create a new property `age` on `character`.

```javascript
const { reactive, watchEffect } = require('vue');

const character = reactive({ name: 'Jean-Luc Picard' });

watchEffect(() => { console.log(character.age); });

// Prints "59"
character.age = 59;
```

One gotcha with `reactive()`: it debounces changes that happen on the same tick of the event loop.
The below code will print "61" and "62", it will **not** print "59" or "60" because those changes
happen synchronously before "61".

```javascript
const { reactive, watchEffect } = require('vue');

const character = reactive({ name: 'Jean-Luc Picard' });

watchEffect(() => { console.log(character.age); });

// Prints "61"
character.age = 59;
character.age = 60;
character.age = 61;

// Prints "62"
setImmediate(() => { character.age = 62; });
```

If you need to return an object property from `setup()`, you should use `reactive()`. For example,
if instead of having a simple `count`, you have an `article` with a property `pageViews` that you
want to increment, you should wrap the `article` object in `reactive()`.

```javascript
app.component('counter', {
  template: `
    <div>
      <h1>{{article.title}}: {{article.pageViews}} Page Views</h1>
      <button v-on:click="++article.pageViews">Increment Page Views</button>
    </div>
  `,
  setup: function() {
    const article = Vue.reactive({ title: 'Vue 3 Reactivity', pageViews: 100 });
    return { article };
  }
});
```