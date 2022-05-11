To fix the "elements in iteration expect to have 'v-bind:key' error" in Vue, you need to set a unique `v-bind:key`, or `:key` for short, on the `v-for` element.
The `:key` should be a [JavaScript primitive](/tutorials/fundamentals/primitives), like a string or a number.

```javascript
<div v-for="item in items" v-bind:key="item.id">
  <li>{{item}}</li>
</div>
```

We recommend using a unique identifier, like a [Mongoose ObjectId](/tutorials/mongoose/objectid) or uuid, as the `:key` if you are iterating over an array of objects.

## Using the Array Index as the Key

You can also use the array index as the key if you do not have a good unique identifier.

```javascript
<div v-for="(item, index) in items" v-bind:key="index">
  <li>{{item}}</li>
</div>
```

However, if you use the array index as the key, be careful if you use a component that relies on internal state in `v-for`.
For example, below the second list is incorrect.
The `internalValue` doesn't line up with `value` after you click `addValueToMiddle` because Vue won't re-render existing `item` components when the `items` array changes.

```javascript
Vue.component('item', {
  props: ['value'],
  data() {
    return {
      internalValue: this.value
    };
  },
  template: `<li>Internal: {{internalValue}} Prop: {{value}}</li>`
});

const app = new Vue({
  data: () => ({ items: [1, 2, 3, 4, 5] }),
  template: `
    <div>
      <button @click="addValueToMiddle">Add value to middle</button>
      <ul>
        <item v-for="(i, index) in items" :value="i" :key="index"></item>
      </ul>
    </div>
  `,
  methods: {
    addValueToMiddle() {
      this.items.splice(Math.ceil(this.items.length / 2), 0, this.items.length + 1)
    }
  }
});
```

<div id="content"></div>
<script src="https://unpkg.com/vue@2"></script>
<script>
Vue.component('item', {
  props: ['value'],
  data() {
    return {
      internalValue: this.value
    };
  },
  template: `<li>Internal: {{internalValue}} Prop: {{value}}</li>`
});
const app = new Vue({
  data: () => ({ items: [1, 2, 3, 4, 5] }),
  template: `
    <div>
      <button @click="addValueToMiddle">Add value to middle</button>
      <ul>
        <item v-for="(i, index) in items" :value="i" :key="index"></item>
      </ul>
    </div>
  `,
  methods: {
    addValueToMiddle() {
      this.items.splice(this.items.length / 2, 0, this.items.length + 1)
    }
  }
});
app.$mount('#content');
</script>