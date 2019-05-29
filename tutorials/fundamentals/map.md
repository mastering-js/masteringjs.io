A JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is an object that stores key/value pairs. You can `get()` or `set()` the value associated with a key, or use [`has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) to check whether the map has a given key.

```javascript
[require:Fundamentals.*Map.*get/set keys]
```

Before ES6, JavaScript objects were often used as maps. Maps have several advantages over objects for storing user data. First, objects have special properties that may collide with key names. If you're not careful, you can end up with a [prototype poisoning security vulnerability](https://medium.com/intrinsic/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96). That's why you need to be careful [whether you use `in` or `hasOwnProperty()`](/tutorials/fundamentals/hasownproperty) if you're using objects as maps.

```javascript
[require:Fundamentals.*Map.*special properties]
```

Maps can also store arbitrary keys, whereas objects can only store strings as keys. For example, you can store a [JavaScript date](/tutorials/fundamentals/timestamps) key in a map. If you try to store a date as a key in an object, JavaScript will convert the key to a string first.

```javascript
[require:Fundamentals.*Map.*arbitrary types]
```

The Map Constructor
-------------------

The `Map` constructor takes a single parameter `iterable`. In practice, `iterable` is usually an array of key/value pairs `[[key1, value1], [key2, value2]]`. However, you can also pass a map to the `Map` constructor.

```javascript
[require:Fundamentals.*Map.*map constructor]
```

You **cannot** pass an object to the map constructor. To convert an object to a map, you must use the [`Object.entries()` function to convert the object to an array of key/value pairs](/tutorials/fundamentals/foreach#example-4-object-keys-and-values).

```javascript
[require:Fundamentals.*Map.*from object]
```

Iterating Over a Map
--------------------

You can iterate over a map's keys or key/value pairs using a `for/of` loop. Maps have a [`keys()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) that gives you the map's keys, and an [`entries()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) that gives you the map's key/value pairs.

```javascript
[require:Fundamentals.*Map.*iterate]
```