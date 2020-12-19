Arrays are objects in JavaScript, so the [triple equals operator](/tutorials/fundamentals/equals) `===`
only returns `true` if the arrays are the same reference.

```javascript
const a = [1, 2, 3];
const b = [1, 2, 3];

a === a; // true
a === b; // false
```

How do you compare whether two arrays are equal? Equality is a tricky
subject: the JavaScript spec defines [4 different ways of checking if two values are "equal"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness), and that doesn't take into account deep equality between objects.

In cases like this, it helps to be as explicit as possible about what
you mean by "equal." In software engineering, asking
a question in the right way often makes the answer obvious.

With that in mind, here's 3 definitions of equality for arrays and
how to check them.

Same Length, Each Value Equal
-----------------------------

One approach for comparing `a` and `b` is checking if each value of `a`
is strictly equal to the corresponding value of `b`. This works well
if all the elements of the arrays are primitives as opposed to objects.

```javascript
[require:Fundamentals compare arrays same length strict equality$]
```

Deep Equality With [POJOs](/tutorials/fundamentals/pojo)
-------------------

The previous `arrayEquals()` function works great for primitive values,
but falls short if you want to compare objects by value.

```javascript
const a = [{ answer: 42 }, { powerLevel: 9001 }];
const b = [{ answer: 42 }, { powerLevel: 9001 }];

// false, because { answer: 42 } !== { answer: 42 }, different references
arrayEquals(a, b);
```

One neat way to take into account object values is comparing arrays
by their [`JSON.stringify()`](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html) output.

```javascript
[require:Fundamentals compare arrays json stringify$]
```

This approach is handy because it requires minimal code and no outside
libraries. However, comparing `JSON.stringify()` output has an unfortunate
edge case that may be a problem depending on your use case. Since `undefined`
isn't a valid JSON value, the below arrays have the same `JSON.stringify()` output,
because `JSON.stringify()` converts `undefined` to [`null`](/tutorials/fundamentals/null).

```javascript
const a = [undefined];
const b = [null];
```

Using Lodash's `isEqual()`
--------------------------

In addition to the `null` vs `undefined` quirk, comparing `JSON.stringify()`
output also doesn't take into account object types. As far as `JSON.stringify()`
is concerned, an object with a `toJSON()` function that returns 42 is the same
as the number 42.

```javascript
const a = [{ toJSON: () => 42 }];
const b = [42];

JSON.stringify(a); // '[42]'
JSON.stringify(b); // '[42]'
```

Similarly, a custom object is the same as a POJO:

```javascript
class MyClass {
  constructor(obj) {
    Object.assign(this, obj);
  }
}

const a = [new MyClass({ answer: 42 })];
const b = [{ answer: 42 }];

JSON.stringify(a) === JSON.stringify(b); // true
```

[Lodash's `isEqual()` function](https://lodash.com/docs/4.17.15#isEqual), on the other hand,
takes all this into account.

```javascript
[require:Fundamentals compare arrays lodash isEqual$]
```

Lodash's `isEqual()` function is the way to go if you need all the bells and
whistles of checking that objects have the same class. The `JSON.stringify()`
approach works well for POJOs, just make sure you take into account `null`
and only use it with trusted data - `toJSON()` can be a security vulnerability.