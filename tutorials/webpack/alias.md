Aliasing is webpack's handy way to shave time and keystrokes
off importing frequently used modules. You will need the
`path` npm module as it is how you will tell webpack where
to look for those specific files. Using the resolve object
as the parent object and the alias property as the child object,
you define the grandchildren property names to which you will use
for your frequently imported modules. Here is an example below:

```javascript
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            Library: path.resolve(__dirname, 'root/library/'),
            Single: path.resolve(__dirname, 'root/test.js')
        }
    }
}
```

So now when you want to import a file from the library module, you use
`import {file} from 'Library/fileLocation` or if you include the file
with the alias, `import {test} from 'Single'`.

# Using alias as a boolean

if for whatever reason you needed webpack to ignore something,
you could give it the path to the module and set the value as `false`.

```javascript
module.exports = {
    resolve: {
        alias: {
            'path/to/ignored/module': false
        }
    }
}
```

# Using $ for exact matches

You can add a trailing `$` to the alias definition and by doing so
ensure that if the path is not an exact match, force an error.

```javascript
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            Single$: path.resolve(__dirname, 'root/test.js')
        }
    }
}
```

So now when you attempt to import test.js:

```javascript
import Test from 'Single'; // success
import Test2 from 'Single/test.js' // error, root/test.js is invalid
```
