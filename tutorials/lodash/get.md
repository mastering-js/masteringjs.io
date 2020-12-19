The [`_.get()` function in Lodash](https://lodash.com/docs/4.17.15#get) lets you
get deeply nested properties in an object without worrying about whether an 
intermediate property is [`null`](/tutorials/fundamentals/null) or `undefined`. For example, suppose you have
the below object:

```javascript
const landmark = {
  name: 'Golden Gate Bridge',
  // GeoJSON feature: https://geojson.org/
  location: {
    type: 'Feature',
    properties: {
      city: 'San Francisco',
      state: 'California'
    },
    geometry: {
      type: 'Point',
      coordinates: [-122.4804438, 37.8199328]
    }
  }
};
```

To get the `location.geometry.type` property, you could use `landmark.location.geometry.type`. But if `landmark.location` is undefined,
you would get the below error.

```
TypeError: Cannot read property 'geometry' of undefined
```

The `_.get()` function lets you safely access the nested `location.geometry.type` property, without having to explicity check whether `landmark`, `landmark.location`, or `landmark.location.geometry` is undefined.

```javascript
[require:lodash.*get.*basic]
```

Default Values
--------------

The third argument to `_.get()` is the default value. If you pass a default value, `_.get()` will return the default value where it would normally return `undefined`.

```javascript
[require:lodash.*get.*default]
```

`null` vs `undefined`
---------------------

Be careful, the `_.get()` function can return `null`, even if you specify a default value.

```javascript
[require:lodash.*get.*with null]
```

If you want to make sure `_.get()` never resolves to a nullish value, you need
to explicitly check the return value using the [conditional operator `?`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

```javascript
[require:lodash.*get.*safe null]
```