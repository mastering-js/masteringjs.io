[Strict mode in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) makes JavaScript more strict about handling common mistakes. You should enable strict mode unless you have a good reason not to.

To enable strict mode, put the string `'use strict'` as the first statement in a file or function.

```javascript
// If this is a .js file, you can enable strict mode by putting
// 'use strict' as the first statement in the file. You can put
// comments before 'use strict'
'use strict';
```

```javascript
function foo() {
  'use strict';
  // Even if the code outside of 'foo' isn't using strict mode, the code
  // inside `foo()`'s function body will use strict mode
}
```

```javascript
var x = 1;
// Does **not** enable strict mode, because the assignment above is the
// first statement in the file.
'use strict';
```

Here are some of the major benefits of using strict mode:

ReferenceError for Undeclared Variables
-----------------------------

Outside of strict mode, the below code implicitly creates a global variable `x`.

```javascript
function foo() {
  x = 42;
}

foo();
x; // 42, `x` is now a global variable!
```

With strict mode, setting `x = 42` without first declaring `x` using `let` or
`var` will throw an error:

```javascript
'use strict';

function foo() {
  x = 42; // ReferenceError: x is not defined
}

foo();
```

`this` Defaults to `undefined`
------------------------------

When you call a function that isn't bound to any object outside of strict mode,
`this` will be the global object. Pretty counter-intuitive, right?

```javascript
const foo = function() {
  console.log(this); // Object [global] { ... }
};

foo();
```

With strict mode, `this` will be `undefined`.

```javascript
'use strict';

const foo = function() {
  console.log(this); // undefined
};

foo();
```

Enforcing Read-Only Properties
------------------------------

The [`Object.freeze()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) makes a JavaScript object immutable. You can't add or remove properties, or modify existing properties, on a frozen object.

Unfortunately, `Object.freeze()` has a big gotcha: it **only** works if the code 
attempting to modify the object is in strict mode. Outside of strict mode, if you 
try to modify a frozen object, the JavaScript runtime will
[let it go](https://www.youtube.com/watch?v=aeHJHjkwDuM).

```javascript
const frozen = function() {
  'use strict';
  return Object.freeze({ answer: 42 });
};

const unstrict = function() {
  const obj = frozen();
  // This function is not in strict mode, so you can modify frozen objects
  obj.answer = 43;
  console.log(obj.answer);
};

const strict = function() {
  'use strict';
  const obj = frozen();
  // TypeError: Cannot assign to read only property 'answer' of object '#<Object>'
  obj.answer = 43;
};

unstrict();
strict();
```

No Setting Properties on Primitives
-----------------------------------

Outside of strict mode, setting a property on a number fails silently.

```javascript
let answer = 42;

// Fails silently outside of strict mode
answer.prop = 'test';

// undefined
console.log(answer.prop);
```

In strict mode, setting a property on a number throws a `TypeError`.

```javascript
'use strict';

let answer = 42;

// TypeError: Cannot create property 'prop' on number '42'
answer.prop = 'test';
```

Prevent Deleting `prototype`
----------------------------

Outside of strict mode, deleting an undeletable property fails silently:

```javascript
// Outside of strict mode, this fails silently
delete Object.prototype;

const obj = { answer: 42 };
console.log(obj.constructor.prototype); // {}
```

In strict mode, deleting `prototype` throws a `TypeError`:

```javascript
'use strict';

// TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
delete Object.prototype;
```