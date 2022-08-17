By default, attributes on the component "fall through" to the rendered element.

```javascript
// MyComponent.js
Vue.component('MyComponent', {
    template: `<div>Hello World</div>`
})
// index.js
<MyComponent class="style-div" />
```

With `inheritAttrs` default behavior, the rendered element would look like:

```javascript
// index.js
<div class="style-div">Hello World</div>
```

Setting `inheritAttrs` to false would remove the `class` attribute on the rendered element like so:

```javascript
// index.js
<div>Hello World</div>
```

```javascript
Vue.component('MyComponent', {
    inheritAttrs: false,
    template: `<div>Hello World</div>`
})
```


`inheritAttrs` is useful in cases where you want to define an internal event handler that fires the user-specified event handler, or add additional handling to an attribute.

```javascript
Vue.component('MyButton', {
    inheritAttrs: false,
    template: `<button v-bind="$attrs" @click="handleClick">Click Me</button>`,
    methods: {
        async handleClick(ev) {
            await this.$attrs.onClick(ev);
        }
    }
});

Vue.createApp({
    template: `
    <div>
      <MyButton @click="parentClick" />
    </div>
    `,
    methods: {
        async parentClick() {
            console.log('Hello World')
        }
    }
})
```