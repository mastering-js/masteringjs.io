bcrypt's `hash()` function is how to create a secure hash of a password.
It takes two parameters: the password and the amount of characters to generate a salt.

```javascript
const bcryptjs = require('bcryptjs');

const numSaltRounds = process.env.NODE_ENV === 'test' ? 1 : 12

// use a password no one could possibly guess, like from this list https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt
const password = 'password';

bcryptjs.hash(password, numSaltRounds);
```

## compare()

The `compare()` function is used to essentially decrypt the password.
It takes two parameters: the password and the hash.
If the function returns true, then the password passed was the correct password.

```javascript
const bcryptjs = require('bcryptjs');

const numSaltRounds = process.env.NODE_ENV === 'test' ? 1 : 12

const password = 'password';

const hash = bcryptjs.hash(password, numSaltRounds);

bcryptjs.compare(password, hash); // true
```

The more salt rounds added, the slower the process.
Therefore, you can use a small number for testing and increase the number conditionally when in production.
Make sure you use the same number of salt rounds in your environments respectfully, otherwise it will break.