[Lodash's `clone()` function](https://lodash.com/docs/4.17.15#clone) is a powerful utility for [shallow cloning](/tutorials/fundamentals/shallow-copy) generic objects. The [`Object.assign()` function or the spread operator](https://thecodebarbarian.com/object-assign-vs-object-spread.html) are the canonical methods for shallow copying a POJO. But `_.clone()` has some additional functionality built in that may make it a better choice for your use case.

Cloning an Array
----------------

`Object.assign()` and `_.clone()` behave similarly when
copying a plain old JavaScript object (POJO). But what
about cloning an array?

```javascript
[require:lodash.*\.clone.*array$]
```

Cloning an Instance of a Class
------------------------------

Another benefit of `_.clone()` is that the cloned object
will have the same [ES6 class](http://thecodebarbarian.com/an-overview-of-es6-classes) as the original object. The `Object.assign()` function always returns a POJO.

```javascript
[require:lodash.*\.clone.*class instance$]
```

Takeaways
---------

If you need to clone a POJO, you don't need Lodash. Just use
`{...obj}` or `Object.assign({}, obj)`. But `_.clone()` is
handy if you find yourself needing to clone class instances,
or just want to be able to clone an arbitrary object without
checking whether it is an array.