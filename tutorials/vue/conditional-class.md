[Vue's `v-bind` syntax](/tutorials/vue/bind) supports dynamically binding classes via an
[object syntax](https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax).

```javascript
[require:Vue.*conditional class object syntax$]
```

You can conditionally bind multiple classes, and use the [`:` shorthand for `v-bind:`](/tutorials/vue/bind#shorthand):

```javascript
[require:Vue.*conditional class multiple$]
```

String Syntax
-------------

The value you bind to class with `v-bind` can be a string, not just an
object. For example, you can store the class name in a `data` string:

```javascript
[require:Vue.*conditional class string$]
```

Another neat approach is to [use the ternary operator](https://vuejs.org/v2/guide/class-and-style.html#Array-Syntax) to decide which class the element will have:

```javascript
[require:Vue.*conditional class ternary$]
```

Array Syntax
------------

You can also bind the `class` to an array. Vue will then combine all
elements in the array to form the final class binding. This lets you
mix and match string and object syntax in one declaration:

```javascript
[require:Vue.*conditional class array$]
```