Given two objects `destination` and `source`, [Lodash's `merge()` function](https://lodash.com/docs/4.17.15#merge) copies the 2nd object's [own properties](/tutorials/fundamentals/hasownproperty) and inherited properties into the first object.

```javascript
[require:lodash merge basic example$]
```

Sounds a lot like [`Object.assign()`](https://thecodebarbarian.com/object-assign-vs-object-spread.html), right? While `merge()` is very
similar to `Object.assign()` and `_.assign()`, there are a couple
minor differences.

Differences Between `merge()` and `assign()`
--------------------------------------------

The first detail is that `merge()` copies objects _recursively_,
so `_.merge()` is a [deep copy](/tutorials/fundamentals/shallow-copy)
whereas `_.assign()` is a shallow copy.

```javascript
[require:lodash merge copy$]
```

The second detail is how `merge()` handles `undefined`. If the `source`
has a key whose value is strictly equal to `undefined`, `merge()` will
not overwrite that key in the `destination`.

```javascript
[require:lodash merge undefined$]
```

Another difference comes in when you consider how `merge()` handles [classes](/tutorials/fundamentals/class).

```javascript
[require:lodash merge classes$]
```