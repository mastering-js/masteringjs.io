bcrypt's `hash()` function is how to create a secure hash of a password.
It takes two parameters: the password and the number of _salt rounds_.
Increasing the number of salt rounds makes `bcrypt.hash()` slower, which makes your passwords harder to brute force.

```javascript
const bcryptjs = require('bcryptjs');

const numSaltRounds = 8;

const password = 'password';

bcryptjs.hash(password, numSaltRounds);
```

We generally recommend a higher `numSaltRounds` in production (at least 8).
However, we often use `numSaltRounds = 1` in tests to make tests run faster.

The bcrypt-js library also has a `bcryptjs.hashSync(password, numSaltRounds)` function.
We recomment **not** using `hashSync()`, because `hashSync()` will block your entire Node process while it runs.

## compare()

The `compare()` function is used to essentially decrypt the password.
It takes two parameters: the password and the hash.
If the function returns true, then the password passed was the correct password.

```javascript
const bcryptjs = require('bcryptjs');

const numSaltRounds = process.env.NODE_ENV === 'test' ? 1 : 12;

const password = 'password';

const hash = bcryptjs.hash(password, numSaltRounds);

bcryptjs.compare(password, hash); // true
```

There is no way to get the original password from the bcrypt hash without guessing the password.

Make sure you use the exact same number of salt rounds when generating the hash using `hash()`, and when comparing using `compare()`.
If you `compare()` using a different number of salt rounds than the hash was generated with, `compare()` will always fail.